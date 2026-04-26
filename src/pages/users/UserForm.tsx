import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, SelectInput, BiLabel } from "@/components/ui";
import { userSchema, type UserValues } from "@/lib/schemas";
import { USERS } from "@/data";

interface Props { mode: "add" | "edit"; }

export function UserForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? USERS.find(u => u.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserValues>({
    resolver: yupResolver(userSchema),
    defaultValues: existing ? {
      fullName: existing.name,
      email: existing.email,
      phone: existing.phone,
      password: "••••••••",
      role: existing.role,
      status: existing.status,
    } : { role: "Publisher", status: "Draft" },
  });

  const onSubmit = (data: UserValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} User form data:`, data);
    navigate("/users");
  };

  const title = mode === "add" ? "Add User" : "Edit User";
  const breadcrumb = ["Home", "Users", title];

  return (
    <AppLayout title={title} breadcrumb={breadcrumb}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start max-w-5xl">
        {/* Info panel */}
        <div className="lg:sticky lg:top-28 space-y-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
              {mode === "add" ? "New User" : "Edit User"}
            </div>
            <h2 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
              {mode === "add" ? "Add a new user" : "Update user details"}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Grant console access by assigning a role. Roles can be revoked at any time from the Users list.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>Role Definitions</h3>
            {[
              { role: "Super Admin", ur: "سپر ایڈمن", desc: "Full unrestricted access to all systems, settings, and user management." },
              { role: "Admin", ur: "ایڈمن", desc: "Can manage content, members, and events. Cannot manage other users." },
              { role: "Publisher", ur: "ناشر", desc: "Can draft, review, and publish content across all sections." },
            ].map(item => (
              <div key={item.role} className="flex gap-3 text-sm">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--primary)" }} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.role}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.ur}</span>
                  </div>
                  <span className="text-xs block mt-0.5" style={{ color: "var(--text-muted)" }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card padding={false} className="overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b" style={{ color: "var(--text-primary)", borderColor: "var(--border)", fontFamily: "'Playfair Display', serif" }}>
                  User Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <BiLabel en="Full Name" ur="پورا نام" htmlFor="fullName" />
                    <TextInput id="fullName" placeholder="e.g. Tariq Ali" error={errors.fullName?.message} {...register("fullName")} />
                  </div>
                  <div>
                    <BiLabel en="Email Address" ur="ای میل پتہ" htmlFor="email" />
                    <TextInput id="email" type="email" placeholder="user@unitedtimes.pk" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div>
                    <BiLabel en="Phone Number" ur="فون نمبر" htmlFor="phone" />
                    <TextInput id="phone" type="tel" placeholder="+92 300 0000000" error={errors.phone?.message} {...register("phone")} />
                  </div>
                  <div>
                    <BiLabel en="Password" ur="پاس ورڈ" htmlFor="password" />
                    <TextInput id="password" type="text" placeholder="Enter password" error={errors.password?.message} {...register("password")} />
                  </div>
                  <div>
                    <BiLabel en="Role" ur="کردار" htmlFor="role" />
                    <SelectInput id="role" error={errors.role?.message} {...register("role")}>
                      <option value="Super Admin">Super Admin — سپر ایڈمن</option>
                      <option value="Admin">Admin — ایڈمن</option>
                      <option value="Publisher">Publisher — ناشر</option>
                    </SelectInput>
                  </div>
                  <div>
                    <BiLabel en="Status" ur="حیثیت" htmlFor="status" />
                    <SelectInput id="status" error={errors.status?.message} {...register("status")}>
                      <option value="Draft">Draft — مسودہ</option>
                      <option value="In Review">In Review — جائزے میں</option>
                      <option value="Published">Published — شائع</option>
                    </SelectInput>
                  </div>
                </div>
              </div>
              <div className="px-8 py-5 border-t flex flex-wrap justify-end gap-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                <SecondaryButton type="button" onClick={() => navigate("/users")}>Cancel</SecondaryButton>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {mode === "add" ? <><UserPlus className="w-4 h-4" /> Create User</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </PrimaryButton>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
