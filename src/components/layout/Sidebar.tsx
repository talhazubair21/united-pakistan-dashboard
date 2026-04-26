import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, BookOpen, Columns3, Newspaper,
  UserSquare2, CalendarDays, Activity, X, Menu, LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/users", label: "Users", icon: Users },
  { path: "/books", label: "Books", icon: BookOpen },
  { path: "/columns", label: "Columns", icon: Columns3 },
  { path: "/united-times", label: "United Times", icon: Newspaper },
  { path: "/party-members", label: "Party Members", icon: UserSquare2 },
  { path: "/events", label: "Events", icon: CalendarDays },
  { path: "/visitor-logs", label: "Visitor Logs", icon: Activity },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-9 w-9 rounded-md flex items-center justify-center text-white font-bold text-base shrink-0"
        style={{ background: "var(--primary)", fontFamily: "'Playfair Display', serif" }}
      >
        UP
      </div>
      <div className="leading-tight">
        <div className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
          United Pakistan
        </div>
        <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
          Admin Console
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const [location, navigate] = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location === "/dashboard" || location === "/";
    return location.startsWith(path);
  };

  const handleLogout = () => {
    onClose?.();
    navigate("/login");
  };

  const navContent = (
    <>
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer"
              style={{
                background: active ? "var(--primary-soft)" : "transparent",
                color: active ? "var(--primary)" : "var(--text-secondary)",
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Icon
                className="h-4 w-4 shrink-0"
                strokeWidth={active ? 2 : 1.5}
                style={{ color: active ? "var(--primary)" : "var(--text-muted)" }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full mb-3 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer border"
          style={{
            color: "var(--primary)",
            background: "var(--primary-soft)",
            borderColor: "var(--border)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = "var(--bg-subtle)";
            target.style.borderColor = "var(--primary)";
            target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = "var(--primary-soft)";
            target.style.borderColor = "var(--border)";
            target.style.transform = "translateY(0)";
          }}
        >
          <LogOut className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
          Logout
        </button>
        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} United Pakistan
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-60 shrink-0 flex-col border-r bg-white fixed top-0 left-0 h-full z-20"
        style={{ borderColor: "var(--border)" }}
      >
        {navContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 flex flex-col transition-transform duration-300 lg:hidden`}
        style={{
          borderRight: `1px solid var(--border)`,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-1.5 rounded" style={{ color: "var(--text-muted)" }}>
            <X className="h-5 w-5" />
          </button>
        </div>
        {navContent}
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md border"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
