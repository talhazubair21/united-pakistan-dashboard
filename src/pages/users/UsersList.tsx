import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, ShieldOff } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, PrimaryButton, Badge, StatusBadge, Pagination } from "@/components/ui";
import { USERS } from "@/data";
import type { Role } from "@/data";

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

function getRoleTone(role: Role): "primary" | "warning" | "neutral" {
  if (role === "Super Admin") return "primary";
  if (role === "Admin") return "warning";
  return "neutral";
}

const PER_PAGE = 6;

export function UsersList() {
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const total = Math.ceil(USERS.length / PER_PAGE);
  const slice = USERS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AppLayout title="Users" breadcrumb={["Home", "Users"]}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Manage super admins, admins, and publishers who can access the console
        </p>
        <PrimaryButton onClick={() => navigate("/users/add")}>
          <Plus className="h-4 w-4" /> Add User
        </PrimaryButton>
      </div>

      <Card padding={false}>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>User</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Phone</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Role</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Created</th>
                <th className="px-6 py-4 font-medium text-right" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0 transition-colors group"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-medium text-white"
                        style={{ backgroundColor: user.avatarColor }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: "var(--text-primary)" }}>{user.name}</div>
                        <div className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{user.phone}</td>
                  <td className="px-6 py-4"><Badge tone={getRoleTone(user.role)}>{user.role}</Badge></td>
                  <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{user.created}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => navigate(`/users/${user.id}/edit`)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary-soft)"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors"
                        style={{ color: "#B91C1C", background: "#FEF2F2" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FEE2E2")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#FEF2F2")}
                      >
                        <ShieldOff className="h-3.5 w-3.5" /> Revoke
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
