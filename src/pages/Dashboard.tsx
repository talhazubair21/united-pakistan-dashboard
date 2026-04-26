import { useLocation } from "wouter";
import { Users, Eye, FileText, Calendar, ArrowUpRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui";

const STATS = [
  { label: "Total Users", value: "12,847", trend: "+4.2% vs last month", icon: Users, positive: true },
  { label: "Total Visitors", value: "284,193", trend: "+12.8% vs last month", icon: Eye, positive: true },
  { label: "Total Content", value: "1,427", trend: "Books, Columns, Issues", icon: FileText, positive: false },
  { label: "Events Count", value: "38", trend: "Next event in 12 days", icon: Calendar, positive: false },
];

const RECENT_ACTIVITY = [
  { id: 1, actor: "Adeel Rauf", initials: "AR", action: "published a column", target: '"The Future of Regional Politics"', time: "2 hours ago" },
  { id: 2, actor: "Hina Malik", initials: "HM", action: "edited Issue", target: "#84", time: "4 hours ago" },
  { id: 3, actor: "Faisal Khan", initials: "FK", action: "added a member", target: "Sana Tariq", time: "Yesterday, 14:30" },
  { id: 4, actor: "Sana Tariq", initials: "ST", action: "updated event", target: "Annual General Assembly", time: "Yesterday, 09:15" },
  { id: 5, actor: "Adeel Rauf", initials: "AR", action: "archived book", target: '"Historical Perspectives 1990"', time: "Oct 12, 2024" },
];

const UPCOMING_EVENTS = [
  { id: 1, date: "14", month: "NOV", title: "Annual General Assembly", location: "Islamabad Marriott Hotel" },
  { id: 2, date: "22", month: "NOV", title: "Press Briefing: Regional Security", location: "UT Headquarters, Media Room" },
  { id: 3, date: "05", month: "DEC", title: "Book Launch: Decade in Review", location: "National Library Auditorium" },
];

export function Dashboard() {
  const [, navigate] = useLocation();

  return (
    <AppLayout title="Dashboard" breadcrumb={["Home", "Dashboard"]}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.1em] mb-3" style={{ color: "var(--text-muted)" }}>
                      {stat.label}
                    </div>
                    <div className="text-3xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs flex items-center gap-1">
                      {stat.positive && <ArrowUpRight className="h-3 w-3" style={{ color: "#1F7A3F" }} />}
                      <span style={{ color: stat.positive ? "#1F7A3F" : "var(--text-secondary)" }}>{stat.trend}</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded flex items-center justify-center shrink-0" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Chart */}
        <Card padding={false}>
          <div className="flex items-center justify-between p-6 border-b flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Visitor Trends</h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Unique visitors across the platform</p>
            </div>
            <div className="flex items-center rounded-md border text-xs font-medium p-1" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              {["Day", "Week", "Month", "Year"].map((range) => (
                <button
                  key={range}
                  className="px-3 py-1.5 rounded transition-colors"
                  style={{
                    background: range === "Month" ? "var(--primary)" : "transparent",
                    color: range === "Month" ? "white" : "var(--text-secondary)",
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 h-[280px]">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C53030" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#C53030" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 55, 110, 165, 220].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="1000" y2={y} stroke="#E7E5E4" strokeDasharray="4 4" strokeWidth="1" />
              ))}
              <path
                d="M 0,180 C 80,170 120,120 180,140 C 240,160 280,190 360,150 C 420,120 480,90 540,130 C 600,170 660,110 720,60 C 780,10 840,40 900,80 C 960,120 1000,150 1000,150"
                fill="none" stroke="#C53030" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M 0,180 C 80,170 120,120 180,140 C 240,160 280,190 360,150 C 420,120 480,90 540,130 C 600,170 660,110 720,60 C 780,10 840,40 900,80 C 960,120 1000,150 1000,150 L 1000,220 L 0,220 Z"
                fill="url(#area-gradient)"
              />
              <circle cx="720" cy="60" r="5" fill="white" stroke="#C53030" strokeWidth="2.5" />
              <g transform="translate(720, 30)">
                <rect x="-65" y="-26" width="130" height="24" rx="4" fill="#1A1A1A" />
                <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
                  Sep · 38,420 visitors
                </text>
              </g>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                <text key={m} x={(i * 1000) / 11} y="245" textAnchor="middle" fill="#8A8A8A" fontSize="11" fontFamily="Inter, sans-serif">{m}</text>
              ))}
            </svg>
          </div>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card padding={false} className="lg:col-span-2">
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Recent Activity</h2>
            </div>
            <div className="px-6 py-2">
              {RECENT_ACTIVITY.map((item, i) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center justify-between"
                  style={{ borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                      {item.initials}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.actor}</span>{" "}
                      <span style={{ color: "var(--text-secondary)" }}>{item.action}</span>{" "}
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.target}</span>
                    </div>
                  </div>
                  <div className="text-xs shrink-0 ml-4" style={{ color: "var(--text-muted)" }}>{item.time}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t rounded-b-lg text-center" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              <button className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>View all activity</button>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card padding={false}>
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Upcoming Events</h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0 w-12 pt-1">
                    <div className="text-2xl font-bold leading-none" style={{ color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>{event.date}</div>
                    <div className="text-[10px] uppercase tracking-widest font-medium mt-1" style={{ color: "var(--text-muted)" }}>{event.month}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium leading-snug mb-1" style={{ color: "var(--text-primary)" }}>{event.title}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{event.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t rounded-b-lg text-center" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              <button className="text-sm font-medium" style={{ color: "var(--text-secondary)" }} onClick={() => navigate("/events")}>
                Manage events
              </button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
