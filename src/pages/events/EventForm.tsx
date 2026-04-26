import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarDays, Save } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, SecondaryButton, TextInput, TextArea, SelectInput, BiLabel, FieldLabel } from "@/components/ui";
import { eventSchema, type EventValues } from "@/lib/schemas";
import { EVENTS } from "@/data";

interface Props { mode: "add" | "edit"; }

export function EventForm({ mode }: Props) {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const existing = mode === "edit" ? EVENTS.find(e => e.id === params.id) : undefined;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventValues>({
    resolver: yupResolver(eventSchema),
    defaultValues: existing ? { ...existing } : { eventType: "Public", status: "Draft" },
  });

  const onSubmit = (data: EventValues) => {
    console.log(`${mode === "add" ? "Add" : "Edit"} Event form data:`, data);
    navigate("/events");
  };

  const title = mode === "add" ? "Add Event" : "Edit Event";

  return (
    <AppLayout title={title} breadcrumb={["Home", "Events", title]}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <Card padding={false} className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Event Details</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Covers party events, press briefings, and public engagements.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Event Title" ur="تقریب کا عنوان" htmlFor="titleEn" />
                  <TextInput id="titleEn" placeholder="e.g. Annual General Assembly" error={errors.titleEn?.message} {...register("titleEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">عنوان (اردو)</span>
                  </div>
                  <TextInput placeholder="مثلاً: سالانہ عام اجلاس" dir="rtl" error={errors.titleUr?.message} {...register("titleUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Description" ur="تفصیل" htmlFor="descriptionEn" />
                  <TextArea id="descriptionEn" rows={3} placeholder="Event overview..." error={errors.descriptionEn?.message} {...register("descriptionEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">تفصیل (اردو)</span>
                  </div>
                  <TextArea rows={3} placeholder="تقریب کی تفصیل..." dir="rtl" error={errors.descriptionUr?.message} {...register("descriptionUr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <BiLabel en="Location" ur="مقام" htmlFor="locationEn" />
                  <TextInput id="locationEn" placeholder="e.g. Islamabad Marriott Hotel" error={errors.locationEn?.message} {...register("locationEn")} />
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">مقام (اردو)</span>
                  </div>
                  <TextInput placeholder="مثلاً: اسلام آباد میریٹ ہوٹل" dir="rtl" error={errors.locationUr?.message} {...register("locationUr")} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <FieldLabel htmlFor="date">Date / تاریخ</FieldLabel>
                  <TextInput id="date" type="date" error={errors.date?.message} {...register("date")} />
                </div>
                <div>
                  <FieldLabel htmlFor="time">Time / وقت</FieldLabel>
                  <TextInput id="time" type="time" error={errors.time?.message} {...register("time")} />
                </div>
                <div>
                  <FieldLabel htmlFor="eventType">Type / قسم</FieldLabel>
                  <SelectInput id="eventType" error={errors.eventType?.message} {...register("eventType")}>
                    <option value="Public">Public — عوامی</option>
                    <option value="Internal">Internal — داخلی</option>
                    <option value="Press">Press — پریس</option>
                  </SelectInput>
                </div>
                <div>
                  <FieldLabel htmlFor="capacity">Capacity / گنجائش</FieldLabel>
                  <TextInput id="capacity" placeholder="e.g. 500" error={errors.capacity?.message} {...register("capacity")} />
                </div>
              </div>

              <div className="max-w-xs">
                <FieldLabel htmlFor="status">Status / حیثیت</FieldLabel>
                <SelectInput id="status" error={errors.status?.message} {...register("status")}>
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Published">Published</option>
                </SelectInput>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t flex flex-wrap justify-end gap-3" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <SecondaryButton type="button" onClick={() => navigate("/events")}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {mode === "add" ? <><CalendarDays className="w-4 h-4" /> Add Event</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </AppLayout>
  );
}
