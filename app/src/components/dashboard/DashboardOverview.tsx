"use client";

import Link from "next/link";
import { TrendingUp, Wallet, FileText, Bell, ArrowRight, AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { CHART_COLORS } from "@/config";
import { formatCurrency, formatAddress } from "@/lib/utils";

const STATS = [
  { label: "Total Analyses",    value: "28",        sub: "+3 this week",      icon: TrendingUp, color: "text-primary" },
  { label: "Portfolio Value",   value: "$245,680",  sub: "+$3,490 this week", icon: Wallet,     color: "text-accent" },
  { label: "Saved Wallets",     value: "54/50",     sub: "At plan limit",     icon: Wallet,     color: "text-warning" },
  { label: "Active Alerts",     value: "3",         sub: "2 unread",          icon: Bell,       color: "text-danger" },
];

const RISK_DIST = [
  { name: "Low Risk",      value: 12, color: "#22C55E" },
  { name: "Medium Risk",   value: 18, color: "#F5C542" },
  { name: "High Risk",     value: 16, color: "#EF4444" },
  { name: "Critical Risk", value: 4,  color: "#DC2626" },
];

const TREND_DATA = Array.from({ length: 14 }, (_, i) => ({
  day: `May ${i + 15}`,
  score: 55 + Math.round(Math.random() * 25),
}));

const RECENT_ANALYSES = [
  { address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "My Wallet",    risk: 72, riskLevel: "high",   value: 104032, date: "May 29, 2025" },
  { address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "Research #1", risk: 43, riskLevel: "medium", value: 87901,  date: "May 28, 2025" },
  { address: "inj1xyz...abc1",                             label: "Team Fund",   risk: 28, riskLevel: "low",    value: 12480,  date: "May 27, 2025" },
  { address: "inj1abc...def2",                             label: "Monitor",     risk: 81, riskLevel: "critical", value: 321507, date: "May 26, 2025" },
  { address: "inj1def...ghi3",                             label: "Watchlist A", risk: 55, riskLevel: "medium", value: 37200,  date: "May 25, 2025" },
];

const RECENT_ALERTS = [
  { title: "High Concentration Detected",    message: "INJ exceeds 80% in wallet inj1qg5...",   severity: "high",   time: "2h ago" },
  { title: "Risk Score Increase",            message: "Wallet inj1abc moved from Medium → High", severity: "warning", time: "5h ago" },
  { title: "New Wallet Added",               message: "inj1xyz added to Watchlist A",             severity: "info",   time: "1d ago" },
];

const riskLevelBg: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">
            Good morning, John! 👋
          </h1>
          <p className="text-sm text-text-secondary">Here&apos;s your wallet intelligence summary.</p>
        </div>
        <Button variant="accent" size="sm" asChild>
          <Link href="/analyze">
            <ExternalLink className="h-3.5 w-3.5" /> New Analysis
          </Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk distribution donut */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Portfolio Risk Distribution</h3>
            <Link href="/analyze/risk" className="text-xs text-accent hover:underline">View Risk Analysis</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie data={RISK_DIST} cx="50%" cy="50%" innerRadius={32} outerRadius={50} dataKey="value" paddingAngle={2}>
                    {RISK_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-text-primary">12</span>
                <span className="text-[9px] text-text-muted">wallets</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {RISK_DIST.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-xs text-text-muted">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-primary">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk score trend */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Risk Score Trend</h3>
            <span className="badge-warning">72 · High</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1 text-xs">
                      <p className="text-text-primary font-semibold">{payload[0].payload.day}</p>
                      <p className="text-accent">Score: {payload[0].value}</p>
                    </div>
                  ) : null
                }
              />
              <Area type="monotone" dataKey="score" stroke="#0066FF" fill="url(#scoreGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {["Low", "Medium", "High", "Critical"].map((l, i) => (
              <div key={l} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${["bg-success","bg-yellow-400","bg-warning","bg-danger"][i]}`} />
                <span className="text-[10px] text-text-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent analyses */}
        <div className="glass-card lg:col-span-2">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Recent Analyses</h3>
            <Link href="/dashboard/history" className="text-xs text-accent hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Wallet", "Risk Score", "Portfolio Value", "Analyzed At", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ANALYSES.map((row) => (
                <tr key={row.address} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{row.label}</p>
                      <p className="text-[10px] font-mono text-text-muted">{formatAddress(row.address, 8)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">{row.risk}</span>
                      <span className={riskLevelBg[row.riskLevel]}>{row.riskLevel}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-primary">{formatCurrency(row.value)}</td>
                  <td className="px-5 py-3 text-xs text-text-muted">{row.date}</td>
                  <td className="px-5 py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/analyze?address=${row.address}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Quick Analyze */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Analyze</h3>
            <div className="flex gap-2">
              <input
                placeholder="Paste wallet address..."
                className="input-field text-xs py-2 flex-1"
              />
            </div>
            <Button variant="accent" size="sm" className="w-full mt-2" asChild>
              <Link href="/analyze">Analyze Wallet →</Link>
            </Button>
          </div>

          {/* Recent alerts */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary">Recent Alerts</h3>
              <Link href="/dashboard/alerts" className="text-xs text-accent hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {RECENT_ALERTS.map((alert) => {
                const Icon = alert.severity === "high" ? AlertTriangle : alert.severity === "warning" ? AlertTriangle : Info;
                const color = alert.severity === "high" ? "text-danger" : alert.severity === "warning" ? "text-warning" : "text-accent";
                return (
                  <div key={alert.title} className="flex items-start gap-2 pb-2 border-b border-border/50 last:border-0">
                    <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{alert.title}</p>
                      <p className="text-[11px] text-text-muted">{alert.message}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plan usage */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Your Plan Usage</h3>
            {[
              { label: "Analyses", used: 28, total: 500, color: "bg-primary" },
              { label: "Wallets",  used: 54, total: 50,  color: "bg-warning" },
              { label: "Reports",  used: 12, total: 100, color: "bg-accent" },
            ].map(({ label, used, total, color }) => (
              <div key={label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">{label}</span>
                  <span className="text-text-secondary">{used}/{total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color}`}
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
