"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  DollarSign,
  TrendingDown,
  Layers,
  ShieldAlert,
  FileText,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ── data ───────────────────────────────────────────────────────────────────────

const TREASURY_VALUE_DATA = [
  { date: "May 15", value: 25_420_000 },
  { date: "May 16", value: 25_810_000 },
  { date: "May 17", value: 25_330_000 },
  { date: "May 18", value: 24_990_000 },
  { date: "May 19", value: 25_640_000 },
  { date: "May 20", value: 26_100_000 },
  { date: "May 21", value: 25_870_000 },
  { date: "May 22", value: 25_450_000 },
  { date: "May 23", value: 24_800_000 },
  { date: "May 24", value: 23_950_000 },
  { date: "May 25", value: 24_320_000 },
  { date: "May 26", value: 24_600_000 },
  { date: "May 27", value: 24_180_000 },
  { date: "May 28", value: 23_960_000 },
  { date: "May 29", value: 24_680_930 },
];

const TOKEN_EXPOSURE = [
  { name: "INJ",  value: 41.8, color: "#0066FF" },
  { name: "USDT", value: 29.3, color: "#22C55E" },
  { name: "ATOM", value: 15.2, color: "#7C3AED" },
  { name: "WBTC", value: 8.4,  color: "#F5C542" },
  { name: "Other",value: 5.3,  color: "#8B949E" },
];

const MOVEMENTS = [
  { date: "May 29", type: "Withdrawal", token: "INJ",  amount: "12,450.00", valueUsd: "$124,500.00", riskImpact: "Medium" },
  { date: "May 28", type: "Deposit",    token: "USDT", amount: "500,000.00", valueUsd: "$500,000.00", riskImpact: "Low"    },
  { date: "May 27", type: "Swap",       token: "INJ→USDT", amount: "8,200.00", valueUsd: "$82,000.00", riskImpact: "Low" },
  { date: "May 26", type: "Withdrawal", token: "ATOM", amount: "9,320.00", valueUsd: "$93,200.00", riskImpact: "Low"    },
  { date: "May 25", type: "Deposit",    token: "WBTC", amount: "4.28",     valueUsd: "$256,800.00", riskImpact: "High"   },
];

const HEALTH_METRICS = [
  { label: "Diversification",     score: 72, color: "bg-warning",  note: "Moderate"  },
  { label: "Liquidity Ratio",     score: 58, color: "bg-warning",  note: "Caution"   },
  { label: "Stablecoin Coverage", score: 29, color: "bg-danger",   note: "Low"       },
  { label: "Protocol Safety",     score: 84, color: "bg-success",  note: "Strong"    },
];

const riskImpactClass: Record<string, string> = {
  Low:    "badge-success",
  Medium: "badge-warning",
  High:   "badge-danger",
};

const typeColor: Record<string, string> = {
  Deposit:    "text-success",
  Withdrawal: "text-danger",
  Swap:       "text-accent",
};

// ── helpers ────────────────────────────────────────────────────────────────────

function fmt(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  return `$${v.toLocaleString()}`;
}

// ── view ───────────────────────────────────────────────────────────────────────

function TreasuryView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Treasury Monitoring</h1>
          <p className="text-sm text-text-secondary">Real-time oversight of treasury positions and movements</p>
        </div>
        <Button variant="accent" size="sm">
          <FileText className="h-3.5 w-3.5" /> Generate Treasury Report
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Total Treasury Value</p>
            <DollarSign className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-text-primary">$24.68M</p>
          <p className="text-xs text-text-muted">As of May 29, 2025</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">7-Day Change</p>
            <TrendingDown className="h-4 w-4 text-danger" />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-2xl font-bold text-danger">-$1.32M</p>
            <ArrowDownRight className="h-4 w-4 text-danger" />
          </div>
          <p className="text-xs text-text-muted">-5.07% vs last week</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Total Tokens</p>
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">18</p>
          <p className="text-xs text-text-muted">distinct assets held</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Overall Risk Score</p>
            <ShieldAlert className="h-4 w-4 text-warning" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-text-primary">72</p>
            <span className="badge-warning">High</span>
          </div>
          <p className="text-xs text-text-muted">Elevated exposure</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Treasury Value Over Time</h3>
            <span className="text-xs text-text-muted">May 15 – 29</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={TREASURY_VALUE_DATA} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0066FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="date" tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`}
                tick={{ fill: "#8B949E", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-3 py-2 text-xs">
                      <p className="text-text-secondary">{payload[0].payload.date}</p>
                      <p className="text-accent font-semibold">{fmt(payload[0].value as number)}</p>
                    </div>
                  ) : null
                }
              />
              <Area type="monotone" dataKey="value" stroke="#0066FF" fill="url(#tvGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Token Exposure</h3>
          <div className="relative mx-auto" style={{ width: 130, height: 130 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKEN_EXPOSURE}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={60}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {TOKEN_EXPOSURE.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-text-primary">5</span>
              <span className="text-[10px] text-text-muted">tokens</span>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {TOKEN_EXPOSURE.map((t) => (
              <div key={t.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: t.color }} />
                  <span className="text-xs text-text-secondary">{t.name}</span>
                </div>
                <span className="text-xs font-semibold text-text-primary">{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movements + Health */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Movements table */}
        <div className="glass-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Recent Treasury Movements</h3>
            <span className="text-xs text-text-muted">Last 5 transactions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Date", "Type", "Token", "Amount", "Value USD", "Risk Impact"].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOVEMENTS.map((m, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                    <td className="px-5 py-3 text-xs text-text-muted whitespace-nowrap">{m.date}</td>
                    <td className={`px-5 py-3 text-xs font-semibold whitespace-nowrap ${typeColor[m.type] ?? "text-text-primary"}`}>
                      {m.type === "Deposit" ? (
                        <span className="flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />{m.type}</span>
                      ) : m.type === "Withdrawal" ? (
                        <span className="flex items-center gap-1"><ArrowDownRight className="h-3 w-3" />{m.type}</span>
                      ) : m.type}
                    </td>
                    <td className="px-5 py-3 text-xs font-mono text-text-primary whitespace-nowrap">{m.token}</td>
                    <td className="px-5 py-3 text-xs text-text-primary whitespace-nowrap">{m.amount}</td>
                    <td className="px-5 py-3 text-xs text-text-primary whitespace-nowrap">{m.valueUsd}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={riskImpactClass[m.riskImpact]}>{m.riskImpact}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Treasury health */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Treasury Health</h3>
          <div className="space-y-4">
            {HEALTH_METRICS.map(({ label, score, color, note }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-secondary">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-text-primary">{score}</span>
                    <span className="text-[10px] text-text-muted">{note}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="divider my-4" />
          <Button variant="accent" size="sm" className="w-full">
            <FileText className="h-3.5 w-3.5" /> Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TreasuryPage() {
  return (
    <DashboardLayout>
      <TreasuryView />
    </DashboardLayout>
  );
}
