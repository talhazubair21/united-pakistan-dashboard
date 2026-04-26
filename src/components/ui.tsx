import * as React from "react";

export function PrimaryButton({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ background: "var(--primary)", ...props.style }}
      onMouseEnter={(e) => { if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-hover)"; }}
      onMouseLeave={(e) => { if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)"; }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${className}`}
      style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", background: "white", ...props.style }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-subtle)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "white")}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${className}`}
      style={{ background: "#FEF2F2", color: "#B91C1C", ...props.style }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#FEE2E2")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2")}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border bg-white ${padding ? "p-6" : ""} ${className}`}
      style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "muted";
}) {
  const styles: Record<string, React.CSSProperties> = {
    neutral: { background: "#F1EFEE", color: "#52525B" },
    primary: { background: "var(--primary-soft)", color: "var(--primary)" },
    success: { background: "#E8F5EE", color: "#1F7A3F" },
    warning: { background: "#FEF3E2", color: "#9A5B11" },
    muted: { background: "#F5F5F4", color: "#6B6B6B" },
  };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider"
      style={styles[tone]}
    >
      {children}
    </span>
  );
}

export function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium uppercase tracking-[0.1em] mb-2"
      style={{ color: "var(--text-secondary)" }}
    >
      {children}
    </label>
  );
}

export function BiLabel({ en, ur, htmlFor }: { en: string; ur: string; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: "var(--text-secondary)" }}>
        {en}
      </span>
      <span className="text-xs font-medium" style={{ color: "var(--text-muted)", fontFamily: "'Noto Nastaliq Urdu', serif", direction: "rtl" }}>
        {ur}
      </span>
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, ...rest } = props;
  return (
    <div>
      <input
        {...rest}
        className={`block w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--text-muted)] ${rest.className ?? ""} ${error ? "border-red-400" : ""}`}
        style={{
          borderColor: error ? "#F87171" : "var(--border-strong)",
          background: "white",
          color: "var(--text-primary)",
          ...rest.style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error ? "#F87171" : "var(--primary)";
          e.currentTarget.style.boxShadow = error ? "0 0 0 3px rgba(248,113,113,0.18)" : "0 0 0 3px var(--primary-ring)";
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#F87171" : "var(--border-strong)";
          e.currentTarget.style.boxShadow = "none";
          rest.onBlur?.(e);
        }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  const { error, ...rest } = props;
  return (
    <div>
      <textarea
        {...rest}
        rows={rest.rows ?? 4}
        className={`block w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors resize-none placeholder:text-[var(--text-muted)] ${rest.className ?? ""}`}
        style={{
          borderColor: error ? "#F87171" : "var(--border-strong)",
          background: "white",
          color: "var(--text-primary)",
          ...rest.style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error ? "#F87171" : "var(--primary)";
          e.currentTarget.style.boxShadow = error ? "0 0 0 3px rgba(248,113,113,0.18)" : "0 0 0 3px var(--primary-ring)";
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#F87171" : "var(--border-strong)";
          e.currentTarget.style.boxShadow = "none";
          rest.onBlur?.(e);
        }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  const { error, ...rest } = props;
  return (
    <div>
      <select
        {...rest}
        className={`block w-full rounded-md border px-3.5 py-2.5 text-sm outline-none appearance-none bg-white ${rest.className ?? ""}`}
        style={{
          borderColor: error ? "#F87171" : "var(--border-strong)",
          color: "var(--text-primary)",
          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238A8A8A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'m6 9 6 6 6-6\'/%3e%3c/svg%3e")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
          ...rest.style,
        }}
      >
        {rest.children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Pagination({
  page = 1,
  total = 1,
  onPage,
}: {
  page?: number;
  total?: number;
  onPage?: (p: number) => void;
}) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between">
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
        Page <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{page}</span> of{" "}
        <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{total}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="h-8 px-2.5 rounded-md border text-xs disabled:opacity-40"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "white" }}
          disabled={page <= 1}
          onClick={() => onPage?.(page - 1)}
        >
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className="h-8 w-8 rounded-md text-xs font-medium"
            style={
              p === page
                ? { background: "var(--primary)", color: "white" }
                : { color: "var(--text-secondary)", background: "transparent" }
            }
            onClick={() => onPage?.(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="h-8 px-2.5 rounded-md border text-xs disabled:opacity-40"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "white" }}
          disabled={page >= total}
          onClick={() => onPage?.(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: "Draft" | "In Review" | "Published" }) {
  const tones: Record<string, "neutral" | "warning" | "success"> = {
    Draft: "neutral",
    "In Review": "warning",
    Published: "success",
  };
  return <Badge tone={tones[status] ?? "neutral"}>{status}</Badge>;
}

export function EmptyState({ message = "No records found." }: { message?: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{message}</p>
    </div>
  );
}
