"use client";

import Link from "next/link";
import {
  TrendingUp, Wallet, Bell, ArrowRight, AlertTriangle,
  Info, ExternalLink, Search, CheckCircle, FileText,
} from "lucide-react";
import { Button } from "@/components/ui";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell,
} from "recharts";
import { formatCurrency, formatAddress } from "@/lib/utils";

/* ── static mock data ──────────────────────────────────────────────────── */

const STATS = [
  { label: "Total Analyses",   value: "28",       sub: "+3 this week",       icon: TrendingUp, color: "text-primary",  trend: "+12%"  },
  { label: "Portfolio Value",  value: "$245,680",  sub: "+$3,490 this week",  icon: Wallet,     color: "text-accent",   trend: "+1.4%" },
  { label: "Saved Wallets",    value: "54",        sub: "50 plan limit",      icon: Wallet,     color: "text-warning",  trend: null    },
  { label: "Active Alerts",    value: "3",         sub: "2 unread",           icon: Bell,       color: "text-danger",   trend: null    },
];

const RISK_DIST = [
  { name: "Low Risk",      value: 12, color: "#22C55E" },
  { name: "Medium Risk",   value: 18, color: "#F5C542" },
  { name: "High Risk",     value: 16, color: "#EF4444" },
  { name: "Critical Risk", value: 4,  color: "#DC2626" },
];

const TREND_DATA = [
  { day: "May 15", score: 62 }, { day: "May 16", score: 67 }, { day: "May 17", score: 64 },
  { day: "May 18", score: 71 }, { day: "May 19", score: 68 }, { day: "May 20", score: 74 },
  { day: "May 21", score: 70 }, { day: "May 22", score: 72 }, { day: "May 23", score: 69 },
  { day: "May 24", score: 75 }, { day: "May 25", score: 71 }, { day: "May 26", score: 78 },
  { day: "May 27", score: 74 }, { day: "May 28", score: 72 },
];

const RECENT_ANALYSES = [
  { address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "Main Portfolio",    risk: 72, riskLevel: "high"     as const, value: 104032, date: "May 29, 2025 10:33 AM" },
  { address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "Trading Wallet",   risk: 43, riskLevel: "medium"   as const, value: 87901,  date: "May 28, 2025  9:12 AM" },
  { address: "inj1xyz4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "DeFi Investments", risk: 65, riskLevel: "high"     as const, value: 87500,  date: "May 27, 2025 14:22 PM" },
  { address: "inj1abc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b", label: "Long-Term Fund",   risk: 28, riskLevel: "low"      as const, value: 12480,  date: "May 26, 2025 11:45 AM" },
  { address: "inj1def4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "NFT Collection",   risk: 81, riskLevel: "critical" as const, value: 321507, date: "May 25, 2025  8:30 AM" },
];

const RECENT_ALERTS = [
  { title: "High Concentration Detected",  message: "INJ exceeds 80% in wallet inj1qg5...kkxh",      severity: "high"    as const, time: "2h ago" },
  { title: "Risk Score Increase",          message: "Wallet inj1abc moved from Medium → High risk",   severity: "warning" as const, time: "5h ago" },
  { title: "New Wallet Added",             message: "inj1xyz added to Watchlist A",                    severity: "info"    as const, time: "1d ago" },
];

const riskBadge: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

const alertIcon = {
  high:    { Icon: AlertTriangle, color: "text-danger"  },
  warning: { Icon: AlertTriangle, color: "text-warning" },
  info:    { Icon: Info,          color: "text-accent"  },
  success: { Icon: CheckCircle,   color: "text-success" },
};

const USAGE = [
  { label: "Analyses", used: 28,  total: 500, bar: "bg-primary" },
  { label: "Wallets",  used: 54,  total: 50,  bar: "bg-warning" },
  { label: "Reports",  used: 12,  total: 100, bar: "bg-accent"  },
];

/* ── component ─────────────────────────────────────────────────────────── */

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Good morning, John! 👋</h1>
          <p className="text-sm text-text-secondary mt-0.5">Here&apos;s your wallet intelligence summary.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/dashboard/reports"><FileText className="h-3.5 w-3.5" /> Export</Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/analyze"><ExternalLink className="h-3.5 w-3.5" /> New Analysis</Link>
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, color, trend }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-text-muted">{sub}</p>
              {trend && <span className="text-xs text-success font-semibold">{trend}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Risk distribution */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Portfolio Risk Distribution</h3>
              <p className="text-xs text-text-muted">Across all saved wallets</p>
            </div>
            <Link href="/analyze/risk" className="text-xs text-accent hover:underline">View Analysis</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie data={RISK_DIST} cx="50%" cy="50%" innerRadius={32} outerRadius={50} dataKey="value" paddingAngle={2}>
                    {RISK_DIST.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="glass-card px-2 py-1 text-xs">
                          <p className="text-text-primary font-semibold">{payload[0].payload.name}</p>
                          <p className="text-accent">{payload[0].value} wallets</p>
                        </div>
                      ) : null
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-text-primary">50</span>
                <span className="text-[9px] text-text-muted">wallets</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {RISK_DIST.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-text-muted">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk score trend */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Risk Score Trend</h3>
              <p className="text-xs text-text-muted">14-day average across portfolio</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge-warning">72 · High</span>
              <span className="text-xs text-text-muted">+2 this week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0066FF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#484F58" }} tickLine={false} axisLine={false} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 9, fill: "#484F58" }} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1 text-xs">
                      <p className="text-text-muted">{payload[0].payload.day}</p>
                      <p className="text-accent font-bold">{payload[0].value}</p>
                    </div>
                  ) : null
                }
              />
              <Area type="monotone" dataKey="score" stroke="#0066FF" fill="url(#scoreGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            {[["Low","#22C55E"],["Medium","#F5C542"],["High","#EF4444"],["Critical","#DC2626"]].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-[10px] text-text-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom grid: analyses table + right panels */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent analyses table */}
        <div className="glass-card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Recent Analyses</h3>
            <Link href="/dashboard/history" className="text-xs text-accent hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-2/30">
                {["Wallet", "Risk Score", "Portfolio Value", "Analyzed At", "Action"].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ANALYSES.map(row => (
                <tr key={row.address} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                        {row.label[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">{row.label}</p>
                        <p className="text-[10px] font-mono text-text-muted">{formatAddress(row.address, 7)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">{row.risk}</span>
                      <span className={riskBadge[row.riskLevel]}>{row.riskLevel}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-text-primary">{formatCurrency(row.value)}</td>
                  <td className="px-5 py-3 text-[11px] text-text-muted">{row.date}</td>
                  <td className="px-5 py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/analyze?address=${row.address}`}>View →</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick Analyze */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Analyze</h3>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input
                placeholder="Paste wallet address..."
                className="input-field pl-9 text-xs py-2"
              />
            </div>
            <Button variant="accent" size="sm" className="w-full text-xs" asChild>
              <Link href="/analyze">Analyze Wallet →</Link>
            </Button>
            <Link href="/analyze?demo=true" className="block text-center text-[11px] text-accent hover:underline mt-2">
              Try demo wallet
            </Link>
          </div>

          {/* Recent alerts */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary">Recent Alerts</h3>
              <Link href="/dashboard/alerts" className="text-xs text-accent hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {RECENT_ALERTS.map(alert => {
                const { Icon, color } = alertIcon[alert.severity];
                return (
                  <div key={alert.title} className="flex items-start gap-2.5 pb-2.5 border-b border-border/40 last:border-0 last:pb-0">
                    <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-text-primary">{alert.title}</p>
                      <p className="text-[11px] text-text-muted leading-relaxed truncate">{alert.message}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plan usage */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary">Your Plan Usage</h3>
              <span className="badge-primary">Pro</span>
            </div>
            {USAGE.map(({ label, used, total, bar }) => (
              <div key={label} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-text-muted">{label}</span>
                  <span className="text-xs font-semibold text-text-primary">{used}/{total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${bar}`}
                    style={{ width: `${Math.min((used / total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs" asChild>
              <Link href="/pricing">Learn more about paid plans →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
