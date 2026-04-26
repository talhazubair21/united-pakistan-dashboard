import { ChevronRight, Bell } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";

interface TopbarProps {
  title: string;
  breadcrumb: string[];
  onMenuClick?: () => void;
}

export function Topbar({ title, breadcrumb, onMenuClick }: TopbarProps) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-white px-6 py-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {onMenuClick && <MobileMenuButton onClick={onMenuClick} />}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            {breadcrumb.map((part, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3" strokeWidth={1.5} />}
                <span
                  className={i === breadcrumb.length - 1 ? "font-medium" : ""}
                  style={{ color: i === breadcrumb.length - 1 ? "var(--text-secondary)" : "var(--text-muted)" }}
                >
                  {part}
                </span>
              </span>
            ))}
          </div>
          <h1
            className="font-bold text-xl tracking-tight mt-0.5 truncate"
            style={{ color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          className="relative rounded-md border p-2"
          style={{ borderColor: "var(--border)", background: "white", color: "var(--text-secondary)" }}
        >
          <Bell className="h-4 w-4" strokeWidth={1.8} />
          <span
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: "var(--border)" }}>
          <div className="text-right leading-tight hidden sm:block">
            <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Adeel Rauf</div>
            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>Super Admin</div>
          </div>
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center font-medium text-sm"
            style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
          >
            AR
          </div>
        </div>
      </div>
    </header>
  );
}
