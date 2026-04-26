import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookValues } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

interface BookRow {
  id: string;
  title_en: string;
  title_ur: string;
  author_en: string;
  author_ur: string;
  description_en: string;
  description_ur: string;
  year: string;
  pages: string;
  category: string;
  status: "Draft" | "In Review" | "Published";
  created_at: string;
}

export interface BookEntity {
  id: string;
  titleEn: string;
  titleUr: string;
  authorEn: string;
  authorUr: string;
  descriptionEn: string;
  descriptionUr: string;
  year: string;
  pages: string;
  category: string;
  status: "Draft" | "In Review" | "Published";
  created: string;
}

const booksQueryKeys = {
  all: ["books"] as const,
  byId: (id: string) => ["books", id] as const,
};

function mapBookRowToEntity(row: BookRow): BookEntity {
  return {
    id: row.id,
    titleEn: row.title_en,
    titleUr: row.title_ur,
    authorEn: row.author_en,
    authorUr: row.author_ur,
    descriptionEn: row.description_en,
    descriptionUr: row.description_ur,
    year: row.year,
    pages: row.pages,
    category: row.category,
    status: row.status,
    created: row.created_at,
  };
}

function mapBookValuesToInsert(values: BookValues) {
  return {
    title_en: values.titleEn,
    title_ur: values.titleUr,
    author_en: values.authorEn,
    author_ur: values.authorUr,
    description_en: values.descriptionEn,
    description_ur: values.descriptionUr,
    year: values.year,
    pages: values.pages,
    category: values.category,
    status: values.status,
  };
}

export async function listBooks() {
  const { data, error } = await supabase
    .from("books")
    .select(
      "id,title_en,title_ur,author_en,author_ur,description_en,description_ur,year,pages,category,status,created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as BookRow[]).map(mapBookRowToEntity);
}

export async function getBookById(id: string) {
  const { data, error } = await supabase
    .from("books")
    .select(
      "id,title_en,title_ur,author_en,author_ur,description_en,description_ur,year,pages,category,status,created_at",
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return mapBookRowToEntity(data as BookRow);
}

export async function createBook(values: BookValues) {
  const payload = mapBookValuesToInsert(values);
  const { data, error } = await supabase.from("books").insert(payload).select("id").single();
  if (error) throw error;
  return data;
}

export async function updateBook({ id, values }: { id: string; values: BookValues }) {
  const payload = mapBookValuesToInsert(values);
  const { data, error } = await supabase.from("books").update(payload).eq("id", id).select("id").single();
  if (error) throw error;
  return data;
}

export async function deleteBook(id: string) {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw error;
}

export function useBooksQuery() {
  return useQuery({
    queryKey: booksQueryKeys.all,
    queryFn: listBooks,
  });
}

export function useBookByIdQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: booksQueryKeys.byId(id),
    queryFn: () => getBookById(id),
    enabled,
  });
}

export function useCreateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.all });
    },
  });
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.byId(variables.id) });
    },
  });
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.all });
    },
  });
}
