import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, Pagination } from "@/components/ui";
import { VISITOR_LOGS } from "@/data";
import { Download } from "lucide-react";

const PER_PAGE = 8;

const COUNTRY_FLAGS: Record<string, string> = {
  Pakistan: "🇵🇰", "Saudi Arabia": "🇸🇦", "United Kingdom": "🇬🇧", UAE: "🇦🇪",
  USA: "🇺🇸", Canada: "🇨🇦",
};

export function VisitorLogs() {
  const [page, setPage] = useState(1);
  const total = Math.ceil(VISITOR_LOGS.length / PER_PAGE);
  const slice = VISITOR_LOGS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const SUMMARY = [
    { label: "Total Unique IPs", value: "12,847", sub: "Last 30 days" },
    { label: "Avg Session Duration", value: "5m 14s", sub: "All visitors" },
    { label: "Top Country", value: "Pakistan", sub: "68% of traffic" },
    { label: "Top Page", value: "/home", sub: "42% of page views" },
  ];

  return (
    <AppLayout title="Visitor Logs" breadcrumb={["Home", "Visitor Logs"]}>
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {SUMMARY.map((s) => (
            <Card key={s.label} className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        <Card padding={false}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Recent Visits</h2>
            <button
              className="flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs font-medium transition-colors"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", background: "white" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "white")}
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>IP Address</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Country</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Page Visited</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Referrer</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Browser</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Date</th>
                  <th className="px-6 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 transition-colors"
                    style={{ borderColor: "var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-row-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="px-6 py-4 font-mono text-[13px]" style={{ color: "var(--text-primary)" }}>{log.ip}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{COUNTRY_FLAGS[log.country] ?? "🌐"}</span>
                        <span style={{ color: "var(--text-secondary)" }}>{log.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[13px]" style={{ color: "var(--primary)" }}>{log.page}</td>
                    <td className="px-6 py-4" style={{ color: "var(--text-secondary)" }}>{log.referrer}</td>
                    <td className="px-6 py-4 text-[13px]" style={{ color: "var(--text-secondary)" }}>{log.browser}</td>
                    <td className="px-6 py-4 text-[13px]" style={{ color: "var(--text-secondary)" }}>{log.date}</td>
                    <td className="px-6 py-4 text-[13px]" style={{ color: "var(--text-muted)" }}>{log.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Pagination page={page} total={total} onPage={setPage} />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
