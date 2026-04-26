import { useMemo, useState } from "react";
import { Users, Eye, FileText, Calendar, ArrowUpRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui";

const STATS = [
  { label: "Total Users", value: "12,847", trend: "+4.2% vs last month", icon: Users, positive: true },
  { label: "Total Visitors", value: "284,193", trend: "+12.8% vs last month", icon: Eye, positive: true },
  { label: "Total Content", value: "1,427", trend: "Books, Columns, Issues", icon: FileText, positive: false },
  { label: "Events Count", value: "38", trend: "Next event in 12 days", icon: Calendar, positive: false },
];

type RangeKey = "Day" | "Week" | "Month" | "Year";

const RANGE_ORDER: RangeKey[] = ["Day", "Week", "Month", "Year"];

const VISITOR_SERIES: Record<RangeKey, { labels: string[]; values: number[]; description: string }> = {
  Day: {
    labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    values: [920, 1040, 1360, 1880, 2300, 2140, 2680, 2410],
    description: "Unique visitors in the last 24 hours",
  },
  Week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [14200, 15640, 14880, 17320, 18110, 16520, 17780],
    description: "Daily visitor totals for this week",
  },
  Month: {
    labels: ["W1", "W2", "W3", "W4"],
    values: [94200, 107400, 115600, 121800],
    description: "Weekly visitor totals for this month",
  },
  Year: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [33200, 34850, 36600, 38120, 39540, 42300, 43880, 45210, 46820, 48240, 49910, 51200],
    description: "Monthly visitor totals this year",
  },
};

export function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<RangeKey>("Month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const series = VISITOR_SERIES[selectedRange];

  const chart = useMemo(() => {
    const width = 1000;
    const height = 220;
    const topPadding = 12;
    const bottomPadding = 20;
    const min = Math.min(...series.values);
    const max = Math.max(...series.values);
    const spread = Math.max(max - min, max * 0.08, 1);
    const chartMin = Math.max(0, min - spread * 0.35);
    const chartMax = max + spread * 0.2;
    const labelCount = series.values.length - 1 || 1;

    const points = series.values.map((value, index) => {
      const x = (index * width) / labelCount;
      const normalized = (value - chartMin) / (chartMax - chartMin || 1);
      const y = height - bottomPadding - normalized * (height - topPadding - bottomPadding);
      return { x, y, value };
    });

    const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x},${point.y}`).join(" ");
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    const yTicks = [0, 1, 2, 3, 4].map((step) => topPadding + ((height - topPadding - bottomPadding) * step) / 4);
    const peakIndex = series.values.indexOf(max);
    const start = series.values[0];
    const end = series.values[series.values.length - 1];
    const trend = start > 0 ? ((end - start) / start) * 100 : 0;

    return { points, linePath, areaPath, yTicks, peakIndex, trend };
  }, [series]);

  const activeIndex = hoveredIndex ?? chart.points.length - 1;
  const activePoint = chart.points[activeIndex];

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
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{series.description}</p>
            </div>
            <div className="flex items-center rounded-md border text-xs font-medium p-1" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
              {RANGE_ORDER.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setSelectedRange(range);
                    setHoveredIndex(null);
                  }}
                  className="px-3 py-1.5 rounded transition-colors"
                  style={{
                    background: range === selectedRange ? "var(--primary)" : "transparent",
                    color: range === selectedRange ? "white" : "var(--text-secondary)",
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
              {chart.yTicks.map((y, i) => (
                <line key={i} x1="0" y1={y} x2="1000" y2={y} stroke="#E7E5E4" strokeDasharray="4 4" strokeWidth="1" />
              ))}
              <path d={chart.areaPath} fill="url(#area-gradient)" />
              <path d={chart.linePath} fill="none" stroke="#C53030" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {chart.points.map((point, index) => (
                <g key={`${series.labels[index]}-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="10"
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onFocus={() => setHoveredIndex(index)}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={index === activeIndex ? 5 : index === chart.peakIndex ? 4 : 3}
                    fill="white"
                    stroke="#C53030"
                    strokeWidth={index === activeIndex ? 2.5 : 2}
                  />
                </g>
              ))}

              {activePoint && (
                <g transform={`translate(${Math.max(120, Math.min(activePoint.x, 880))}, ${Math.max(30, activePoint.y - 18)})`}>
                  <rect x="-90" y="-26" width="180" height="24" rx="4" fill="#1A1A1A" />
                  <text x="0" y="-9" textAnchor="middle" fill="white" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
                    {series.labels[activeIndex]} · {series.values[activeIndex].toLocaleString()} visitors
                  </text>
                </g>
              )}

              {series.labels.map((label, i) => (
                <text
                  key={label}
                  x={(i * 1000) / (series.labels.length - 1 || 1)}
                  y="245"
                  textAnchor="middle"
                  fill="#8A8A8A"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
          <div className="px-6 pb-6 -mt-2 flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span>
              {selectedRange} change:{" "}
              <span style={{ color: chart.trend >= 0 ? "#1F7A3F" : "#B42318" }}>
                {chart.trend >= 0 ? "+" : ""}
                {chart.trend.toFixed(1)}%
              </span>
            </span>
            <span>Peak: {Math.max(...series.values).toLocaleString()} visitors</span>
          </div>
        </Card>

      </div>
    </AppLayout>
  );
}
