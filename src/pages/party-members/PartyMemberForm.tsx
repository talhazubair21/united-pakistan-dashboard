import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSquare2, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { partyMemberSchema, type PartyMemberValues } from "@/lib/schemas";
import { PARTY_MEMBERS } from "@/data";

interface Props { mode: "add" | "edit"; }

export function PartyMemberForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? PARTY_MEMBERS.find(m => m.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PartyMemberValues>({
    resolver: yupResolver(partyMemberSchema),
    defaultValues: existing ? { ...existing } : { status: "Draft" },
  });

  const onSubmit = (data: PartyMemberValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} Party Member form data:`, data);
    navigate("/party-members");
  };

  const title = mode === "add" ? "Add Party Member" : "Edit Party Member";

  return (
    <AppLayout title={title} breadcrumb={["Home", "Party Members", title]}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <Card padding={false} className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Member Profile</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>All profiles are bilingual — complete both English and Urdu fields.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Full Name" ur="پورا نام" htmlFor="fullNameEn" />
                  <TextInput id="fullNameEn" placeholder="e.g. Ayesha Malik" error={errors.fullNameEn?.message} {...register("fullNameEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">پورا نام (اردو)</span>
                  </div>
                  <TextInput placeholder="مثلاً: عائشہ ملک" dir="rtl" error={errors.fullNameUr?.message} {...register("fullNameUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Position" ur="عہدہ" htmlFor="positionEn" />
                  <TextInput id="positionEn" placeholder="e.g. Regional Coordinator – Punjab" error={errors.positionEn?.message} {...register("positionEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">عہدہ (اردو)</span>
                  </div>
                  <TextInput placeholder="مثلاً: علاقائی کوآرڈینیٹر" dir="rtl" error={errors.positionUr?.message} {...register("positionUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Biography" ur="سوانح" htmlFor="bioEn" />
                  <TextArea id="bioEn" rows={4} placeholder="Short biography in English..." error={errors.bioEn?.message} {...register("bioEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">سوانح (اردو)</span>
                  </div>
                  <TextArea rows={4} placeholder="اردو میں مختصر سوانح..." dir="rtl" error={errors.bioUr?.message} {...register("bioUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <FieldLabel htmlFor="location">Location / شہر</FieldLabel>
                  <TextInput id="location" placeholder="e.g. Lahore" error={errors.location?.message} {...register("location")} />
                </div>
                <div>
                  <FieldLabel htmlFor="memberSince">Member Since / رکنیت</FieldLabel>
                  <TextInput id="memberSince" placeholder="e.g. 2009" error={errors.memberSince?.message} {...register("memberSince")} />
                </div>
                <div>
                  <FieldLabel htmlFor="phone">Phone / فون</FieldLabel>
                  <TextInput id="phone" placeholder="+92 300 0000000" error={errors.phone?.message} {...register("phone")} />
                </div>
                <div>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <SelectInput id="status" error={errors.status?.message} {...register("status")}>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Published">Published</option>
                  </SelectInput>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="email">Email / ای میل</FieldLabel>
                <TextInput id="email" type="email" placeholder="member@unitedparty.pk" error={errors.email?.message} {...register("email")} />
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t flex flex-wrap justify-end gap-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <SecondaryButton type="button" onClick={() => navigate("/party-members")}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {mode === "add" ? <><UserSquare2 className="w-4 h-4" /> Add Member</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </AppLayout>
  );
}
