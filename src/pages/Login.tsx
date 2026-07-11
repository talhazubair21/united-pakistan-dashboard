import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginValues } from "@/lib/schemas";
import { Card, PrimaryButton, TextInput } from "@/components/ui";
import { toast } from "@/hooks/use-toast";

export function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (_data: LoginValues) => {
    toast({
      title: "Welcome",
      description: "Signed in to the admin console.",
    });
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
      style={{ background: "var(--bg-app)" }}
    >
      <div className="w-full max-w-[440px]">
        <Card padding={false} className="w-full">
          <div className="p-8 pb-6 flex flex-col items-center text-center">
            <div className="flex flex-col items-center mb-6">
              <div
                className="h-10 w-10 mb-3 rounded-md flex items-center justify-center text-white text-xl font-bold shadow-sm"
                style={{ background: "var(--primary)", fontFamily: "'Playfair Display', serif" }}
              >
                UP
              </div>
              <div className="leading-tight">
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}
                >
                  United Pakistan
                </div>
                <div
                  className="text-[11px] uppercase tracking-[0.15em] mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Admin Console
                </div>
              </div>
            </div>
            <h1
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}
            >
              Sign in to continue
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 flex flex-col gap-5">
            <div>
              <label
                className="block text-xs font-medium uppercase tracking-[0.1em] mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Email Address
              </label>
              <TextInput
                type="email"
                placeholder="name@unitedpakistan.pk"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium uppercase tracking-[0.1em] mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Password
              </label>
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  style={{ paddingRight: "40px" }}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-[42px] px-3 flex items-center justify-center"
                  style={{ color: "var(--text-muted)" }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              className="w-full h-11 text-[15px] mt-1"
              disabled={isSubmitting}
            >
              Sign in
            </PrimaryButton>
          </form>

          <div
            className="border-t px-8 py-4 rounded-b-lg flex items-center justify-center"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            <span className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
              Local demo · Static data only
            </span>
          </div>
        </Card>

        <div className="mt-6 text-center text-[11.5px]" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} United Pakistan. All rights reserved.
        </div>
      </div>
    </div>
  );
}
