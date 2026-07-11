import { ChevronRight, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { MobileMenuButton } from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATIC_ADMIN = {
  fullName: "Tariq Ali",
  role: "Super Admin",
  initials: "TA",
};

interface TopbarProps {
  title: string;
  breadcrumb: string[];
  onMenuClick?: () => void;
}

export function Topbar({ title, breadcrumb, onMenuClick }: TopbarProps) {
  const [, navigate] = useLocation();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-white px-6 py-4"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-3 pl-3 border-l rounded-md py-1 pr-1"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-right leading-tight hidden sm:block">
                <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {STATIC_ADMIN.fullName}
                </div>
                <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {STATIC_ADMIN.role}
                </div>
              </div>
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center font-medium text-sm"
                style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
              >
                {STATIC_ADMIN.initials}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-52 border bg-white shadow-md"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <DropdownMenuLabel>{STATIC_ADMIN.fullName}</DropdownMenuLabel>
            <DropdownMenuLabel className="pt-0 text-xs font-normal" style={{ color: "var(--text-muted)" }}>
              {STATIC_ADMIN.role}
            </DropdownMenuLabel>
            <DropdownMenuSeparator style={{ background: "var(--border)" }} />
            <DropdownMenuItem
              onClick={() => navigate("/login")}
              className="text-red-600 focus:text-red-700 focus:bg-[var(--bg-row-hover)]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
