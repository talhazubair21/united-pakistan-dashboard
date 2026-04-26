import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, StatusBadge, Pagination } from "@/components/ui";
import { PARTY_MEMBERS } from "@/data";

const PER_PAGE = 6;

export function PartyMembersList() {
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const total = Math.ceil(PARTY_MEMBERS.length / PER_PAGE);
  const slice = PARTY_MEMBERS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AppLayout title="Party Members" breadcrumb={["Home", "Party Members"]}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Manage profiles for the party's official members and leaders
        </p>
        <PrimaryButton onClick={() => navigate("/party-members/add")}>
          <Plus className="h-4 w-4" /> Add Member
        </PrimaryButton>
      </div>

      <Card padding={false}>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Name</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Position</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Location</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Since</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="px-6 py-4 font-medium text-right" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((member) => (
                <tr
                  key={member.id}
                  className="border-b last:border-0 transition-colors group"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                      >
                        {member.fullNameEn.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: "var(--text-primary)" }}>{member.fullNameEn}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{member.fullNameUr}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="truncate" style={{ color: "var(--text-secondary)" }}>{member.positionEn}</div>
                    <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{member.positionUr}</div>
                  </td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{member.location}</td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{member.memberSince}</td>
                  <td className="px-6 py-4"><StatusBadge status={member.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => navigate(`/party-members/${member.id}/edit`)}
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
