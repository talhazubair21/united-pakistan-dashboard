import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type AppRole = "super_admin" | "admin" | "publisher";

export interface UserProfile {
  id: string;
  fullName: string | null;
  role: AppRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

const authQueryKeys = {
  session: ["auth", "session"] as const,
  profile: ["auth", "profile"] as const,
};

const ACCESS_TOKEN_KEY = "up_access_token";
const REFRESH_TOKEN_KEY = "up_refresh_token";

function persistTokens(accessToken: string | null | undefined, refreshToken: string | null | undefined) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);

  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function clearPersistedTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function toRoleLabel(role: AppRole) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return "Publisher";
}

export function getRoleLabel(role: AppRole) {
  return toRoleLabel(role);
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return {
    id: data.id,
    fullName: data.full_name,
    role: data.role as AppRole,
  };
}

export async function loginWithPassword({ email, password }: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) throw error;
  persistTokens(data.session?.access_token, data.session?.refresh_token);

  const profile = await getCurrentUserProfile();
  if (!profile) {
    await supabase.auth.signOut();
    clearPersistedTokens();
    throw new Error("No role profile found for this account.");
  }

  return profile;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  clearPersistedTokens();
}

export function useCurrentSessionQuery() {
  return useQuery({
    queryKey: authQueryKeys.session,
    queryFn: getCurrentSession,
  });
}

export function useCurrentProfileQuery() {
  return useQuery({
    queryKey: authQueryKeys.profile,
    queryFn: getCurrentUserProfile,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginWithPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
    },
  });
}

export function useAuthSessionSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;

    // Hydrate token cache from any existing session.
    getCurrentSession()
      .then((session) => {
        if (!isMounted) return;
        persistTokens(session?.access_token, session?.refresh_token);
      })
      .catch(() => {
        if (!isMounted) return;
        clearPersistedTokens();
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      persistTokens(session?.access_token, session?.refresh_token);
      queryClient.setQueryData(authQueryKeys.session, session);

      if (!session) {
        queryClient.setQueryData(authQueryKeys.profile, null);
        return;
      }

      try {
        const profile = await getCurrentUserProfile();
        queryClient.setQueryData(authQueryKeys.profile, profile);
      } catch {
        queryClient.setQueryData(authQueryKeys.profile, null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [queryClient]);
}
