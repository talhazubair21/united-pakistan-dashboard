import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Newspaper, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { unitedTimesSchema, type UnitedTimesValues } from "@/lib/schemas";
import { UNITED_TIMES_ISSUES } from "@/data";

interface Props { mode: "add" | "edit"; }

export function UnitedTimesForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? UNITED_TIMES_ISSUES.find(i => i.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UnitedTimesValues>({
    resolver: yupResolver(unitedTimesSchema),
    defaultValues: existing ? { ...existing } : { status: "Draft" },
  });

  const onSubmit = (data: UnitedTimesValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} United Times Issue form data:`, data);
    navigate("/united-times");
  };

  const title = mode === "add" ? "Add Issue" : "Edit Issue";

  return (
    <AppLayout title={title} breadcrumb={["Home", "United Times", title]}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <Card padding={false} className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Issue Details</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Each issue of United Times is a bilingual political magazine edition.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="issueNumber">Issue No. / شمارہ نمبر</FieldLabel>
                  <TextInput id="issueNumber" placeholder="e.g. 88" error={errors.issueNumber?.message} {...register("issueNumber")} />
                </div>
                <div>
                  <FieldLabel htmlFor="issueDate">Issue Date / تاریخ</FieldLabel>
                  <TextInput id="issueDate" type="date" error={errors.issueDate?.message} {...register("issueDate")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Cover Title" ur="سرورق عنوان" htmlFor="coverTitleEn" />
                  <TextInput id="coverTitleEn" placeholder="e.g. Year in Review: 2024" error={errors.coverTitleEn?.message} {...register("coverTitleEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">اردو عنوان</span>
                  </div>
                  <TextInput placeholder="مثلاً: سال کا جائزہ: 2024" dir="rtl" error={errors.coverTitleUr?.message} {...register("coverTitleUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Summary" ur="خلاصہ" htmlFor="summaryEn" />
                  <TextArea id="summaryEn" rows={4} placeholder="Brief summary of this issue..." error={errors.summaryEn?.message} {...register("summaryEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">اردو خلاصہ</span>
                  </div>
                  <TextArea rows={4} placeholder="اس شمارے کا مختصر خلاصہ..." dir="rtl" error={errors.summaryUr?.message} {...register("summaryUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FieldLabel htmlFor="pages">Pages / صفحات</FieldLabel>
                  <TextInput id="pages" placeholder="e.g. 44" error={errors.pages?.message} {...register("pages")} />
                </div>
                <div className="md:col-span-1">
                  <FieldLabel htmlFor="topics">Topics / موضوعات</FieldLabel>
                  <TextInput id="topics" placeholder="e.g. Politics, Economy, Society" error={errors.topics?.message} {...register("topics")} />
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
            <SecondaryButton type="button" onClick={() => navigate("/united-times")}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {mode === "add" ? <><Newspaper className="w-4 h-4" /> Add Issue</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </AppLayout>
  );
}
