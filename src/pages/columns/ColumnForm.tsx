import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Columns3, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { columnSchema, type ColumnValues } from "@/lib/schemas";
import { COLUMNS } from "@/data";

interface Props { mode: "add" | "edit"; }

export function ColumnForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? COLUMNS.find(c => c.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ColumnValues>({
    resolver: yupResolver(columnSchema),
    defaultValues: existing ? {
      titleEn: existing.titleEn, titleUr: existing.titleUr,
      excerptEn: existing.excerptEn, excerptUr: existing.excerptUr,
      bodyEn: existing.bodyEn, bodyUr: existing.bodyUr,
      status: existing.status,
    } : { status: "Draft" },
  });

  const onSubmit = (data: ColumnValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} Column form data:`, data);
    navigate("/columns");
  };

  const title = mode === "add" ? "Add Column" : "Edit Column";

  return (
    <AppLayout title={title} breadcrumb={["Home", "Columns", title]}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <Card padding={false} className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Column Details</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Columns are published without author attribution — party voice only.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Title" ur="عنوان" htmlFor="titleEn" />
                  <TextInput id="titleEn" placeholder="e.g. The Quiet Cost of Coalition Politics" error={errors.titleEn?.message} {...register("titleEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">اردو عنوان</span>
                  </div>
                  <TextInput placeholder="مثلاً: اتحادی سیاست کی خاموش قیمت" dir="rtl" error={errors.titleUr?.message} {...register("titleUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Excerpt" ur="اقتباس" htmlFor="excerptEn" />
                  <TextArea id="excerptEn" rows={3} placeholder="Short introductory excerpt..." error={errors.excerptEn?.message} {...register("excerptEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">اردو اقتباس</span>
                  </div>
                  <TextArea rows={3} placeholder="مختصر تعارفی اقتباس..." dir="rtl" error={errors.excerptUr?.message} {...register("excerptUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Body (English)" ur="مضمون (انگریزی)" htmlFor="bodyEn" />
                  <TextArea id="bodyEn" rows={6} placeholder="Full column text in English..." error={errors.bodyEn?.message} {...register("bodyEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">مضمون (اردو)</span>
                  </div>
                  <TextArea rows={6} placeholder="مکمل مضمون اردو میں..." dir="rtl" error={errors.bodyUr?.message} {...register("bodyUr")} />
                </div>
              </div>

              <div className="max-w-xs">
                <FieldLabel htmlFor="status">Status / حیثیت</FieldLabel>
                <SelectInput id="status" error={errors.status?.message} {...register("status")}>
                  <option value="Draft">Draft — مسودہ</option>
                  <option value="In Review">In Review — جائزے میں</option>
                  <option value="Published">Published — شائع</option>
                </SelectInput>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t flex flex-wrap justify-end gap-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <SecondaryButton type="button" onClick={() => navigate("/columns")}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {mode === "add" ? <><Columns3 className="w-4 h-4" /> Add Column</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </AppLayout>
  );
}
