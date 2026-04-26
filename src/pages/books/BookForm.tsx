import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookOpen, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { bookSchema, type BookValues } from "@/lib/schemas";
import {
  useBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/api/book.api";
import { toast } from "@/hooks/use-toast";

interface Props { mode: "add" | "edit"; }

export function BookForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const bookId = params.id ?? "";
  const bookQuery = useBookByIdQuery(bookId, mode === "edit" && Boolean(bookId));
  const createBookMutation = useCreateBookMutation();
  const updateBookMutation = useUpdateBookMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookValues>({
    resolver: yupResolver(bookSchema),
    defaultValues: { category: "History", status: "Draft" },
  });

  useEffect(() => {
    if (mode !== "edit" || !bookQuery.data) return;
    reset({
      titleEn: bookQuery.data.titleEn,
      titleUr: bookQuery.data.titleUr,
      authorEn: bookQuery.data.authorEn,
      authorUr: bookQuery.data.authorUr,
      descriptionEn: bookQuery.data.descriptionEn,
      descriptionUr: bookQuery.data.descriptionUr,
      year: bookQuery.data.year,
      pages: bookQuery.data.pages,
      category: bookQuery.data.category,
      status: bookQuery.data.status,
    });
  }, [mode, bookQuery.data, reset]);

  const onSubmit = async (data: BookValues) => {
    try {
      if (mode === "add") {
        await createBookMutation.mutateAsync(data);
      } else if (bookId) {
        await updateBookMutation.mutateAsync({ id: bookId, values: data });
      }

      toast({
        title: mode === "add" ? "Book added" : "Book updated",
        description: "Changes saved successfully.",
      });
      navigate("/books");
    } catch (error) {
      toast({
        variant: "destructive",
        title: mode === "add" ? "Add failed" : "Update failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const title = mode === "add" ? "Add Book" : "Edit Book";
  const isSubmitting = createBookMutation.isPending || updateBookMutation.isPending;

  if (mode === "edit" && bookQuery.isLoading) {
    return (
      <AppLayout title={title} breadcrumb={["Home", "Books", title]}>
        <Card>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Loading book...
          </p>
        </Card>
      </AppLayout>
    );
  }

  if (mode === "edit" && bookQuery.isError) {
    return (
      <AppLayout title={title} breadcrumb={["Home", "Books", title]}>
        <Card>
          <p className="text-sm text-red-700">
            {(bookQuery.error as Error).message}
          </p>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={title} breadcrumb={["Home", "Books", title]}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <Card padding={false} className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Book Details</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Fill in both English and Urdu fields for bilingual publishing.</p>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Title" ur="عنوان" htmlFor="titleEn" />
                  <TextInput id="titleEn" placeholder="e.g. The Idea of Pakistan" error={errors.titleEn?.message} {...register("titleEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] bg-amber-50 text-amber-700 px-2 py-0.5 rounded">UR</span>
                  </div>
                  <TextInput placeholder="مثلاً: پاکستان کا تصور" dir="rtl" error={errors.titleUr?.message} {...register("titleUr")} />
                </div>
              </div>

              {/* Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Author" ur="مصنف" htmlFor="authorEn" />
                  <TextInput id="authorEn" placeholder="e.g. Ayesha Jalal" error={errors.authorEn?.message} {...register("authorEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] bg-amber-50 text-amber-700 px-2 py-0.5 rounded">UR</span>
                  </div>
                  <TextInput placeholder="مثلاً: عائشہ جلال" dir="rtl" error={errors.authorUr?.message} {...register("authorUr")} />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Description" ur="تفصیل" htmlFor="descriptionEn" />
                  <TextArea id="descriptionEn" placeholder="Brief description of the book..." error={errors.descriptionEn?.message} {...register("descriptionEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] bg-amber-50 text-amber-700 px-2 py-0.5 rounded">UR</span>
                  </div>
                  <TextArea placeholder="کتاب کا مختصر تفصیل..." dir="rtl" error={errors.descriptionUr?.message} {...register("descriptionUr")} />
                </div>
              </div>

              {/* Year / Pages / Category / Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <FieldLabel htmlFor="year">Year / سال</FieldLabel>
                  <TextInput id="year" placeholder="e.g. 2024" error={errors.year?.message} {...register("year")} />
                </div>
                <div>
                  <FieldLabel htmlFor="pages">Pages / صفحات</FieldLabel>
                  <TextInput id="pages" placeholder="e.g. 320" error={errors.pages?.message} {...register("pages")} />
                </div>
                <div>
                  <FieldLabel htmlFor="category">Category / زمرہ</FieldLabel>
                  <SelectInput id="category" error={errors.category?.message} {...register("category")}>
                    <option value="History">History — تاریخ</option>
                    <option value="Politics">Politics — سیاست</option>
                    <option value="Economy">Economy — معیشت</option>
                    <option value="Society">Society — معاشرہ</option>
                    <option value="Culture">Culture — ثقافت</option>
                  </SelectInput>
                </div>
                <div>
                  <FieldLabel htmlFor="status">Status / حیثیت</FieldLabel>
                  <SelectInput id="status" error={errors.status?.message} {...register("status")}>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Published">Published</option>
                  </SelectInput>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t flex flex-wrap justify-end gap-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <SecondaryButton type="button" onClick={() => navigate("/books")}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {mode === "add" ? <><BookOpen className="w-4 h-4" /> Add Book</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </AppLayout>
  );
}
