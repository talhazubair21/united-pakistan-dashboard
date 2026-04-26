import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, StatusBadge, Pagination } from "@/components/ui";
import { UNITED_TIMES_ISSUES } from "@/data";

const PER_PAGE = 6;

export function UnitedTimesList() {
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const total = Math.ceil(UNITED_TIMES_ISSUES.length / PER_PAGE);
  const slice = UNITED_TIMES_ISSUES.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AppLayout title="United Times" breadcrumb={["Home", "United Times"]}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Manage the party's flagship political magazine issues
        </p>
        <PrimaryButton onClick={() => navigate("/united-times/add")}>
          <Plus className="h-4 w-4" /> Add Issue
        </PrimaryButton>
      </div>

      <Card padding={false}>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Issue</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Cover Title</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Pages</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Topics</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="px-6 py-4 font-medium text-right" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-b last:border-0 transition-colors group"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold" style={{ color: "var(--primary)" }}>#{issue.issueNumber}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{issue.issueDate}</div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="font-medium truncate" style={{ color: "var(--text-primary)" }}>{issue.coverTitleEn}</div>
                    <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)", direction: "rtl", textAlign: "left" }}>{issue.coverTitleUr}</div>
                  </td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{issue.pages}</td>
                  <td className="px-6 py-4 max-w-[160px]">
                    <div className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>{issue.topics}</div>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={issue.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => navigate(`/united-times/${issue.id}/edit`)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary-soft)"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLElement).style.color = "#B91C1C"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <Pagination page={page} total={total} onPage={setPage} />
        </div>
      </Card>
    </AppLayout>
  );
}
