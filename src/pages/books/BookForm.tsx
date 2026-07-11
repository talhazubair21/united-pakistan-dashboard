import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookOpen, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { bookSchema, type BookValues } from "@/lib/schemas";
import { BOOKS } from "@/data";

interface Props { mode: "add" | "edit"; }

export function BookForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? BOOKS.find((book) => book.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookValues>({
    resolver: yupResolver(bookSchema),
    defaultValues: existing
      ? {
          titleEn: existing.titleEn,
          titleUr: existing.titleUr,
          authorEn: existing.authorEn,
          authorUr: existing.authorUr,
          descriptionEn: existing.descriptionEn,
          descriptionUr: existing.descriptionUr,
          year: existing.year,
          pages: existing.pages,
          category: existing.category,
          status: existing.status,
        }
      : { category: "History", status: "Draft" },
  });

  const onSubmit = (data: BookValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} Book form data:`, data);
    navigate("/books");
  };

  const title = mode === "add" ? "Add Book" : "Edit Book";

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
