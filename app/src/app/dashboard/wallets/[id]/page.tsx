"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  ArrowLeft,
  RefreshCw,
  FileText,
  Plus,
  GitCompare,
  Brain,
  Eye,
  Star,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// ── data ───────────────────────────────────────────────────────────────────────

const PORTFOLIO_COMPOSITION = [
  { name: "INJ",   value: 58.4, color: "#0066FF", usd: "$26,677.18" },
  { name: "ATOM",  value: 14.2, color: "#7C3AED", usd: "$6,486.60"  },
  { name: "USDT",  value: 12.1, color: "#22C55E", usd: "$5,527.31"  },
  { name: "WBTC",  value: 8.3,  color: "#F5C542", usd: "$3,791.46"  },
  { name: "Others",value: 7.0,  color: "#8B949E", usd: "$3,197.62"  },
];

const RISK_DIMENSIONS = [
  { label: "Concentration Risk",   score: 75, level: "High",    color: "bg-warning" },
  { label: "Volatility Risk",      score: 68, level: "High",    color: "bg-warning" },
  { label: "DeFi Exposure",        score: 55, level: "Medium",  color: "bg-yellow-500" },
  { label: "Liquidity Risk",       score: 42, level: "Medium",  color: "bg-yellow-500" },
  { label: "Activity Risk",        score: 38, level: "Low",     color: "bg-success" },
  { label: "Overall Score",        score: 72, level: "High",    color: "bg-warning" },
];

const RISK_BAR_DATA = RISK_DIMENSIONS.map((d) => ({ name: d.label.split(" ")[0], score: d.score }));

const TABS = ["Summary", "Risk Analysis", "Portfolio", "Transactions", "Activity", "Recommendations"] as const;
type Tab = (typeof TABS)[number];

const AI_REPORT_HISTORY = [
  { date: "May 29, 2025", type: "Full Analysis",       riskScore: 72, status: "badge-warning", statusLabel: "High" },
  { date: "May 22, 2025", type: "Weekly Report",       riskScore: 68, status: "badge-warning", statusLabel: "High" },
  { date: "May 15, 2025", type: "Full Analysis",       riskScore: 74, status: "badge-warning", statusLabel: "High" },
  { date: "May 8, 2025",  type: "Risk Alert Report",   riskScore: 78, status: "badge-danger",  statusLabel: "Critical" },
];

const RECENT_ACTIVITY = [
  { icon: TrendingUp,    color: "text-success",  title: "Received 450 INJ",           sub: "inj1abc → this wallet",  time: "2h ago"  },
  { icon: Activity,      color: "text-accent",   title: "Helix Trade Executed",        sub: "INJ/USDT · $4,320",       time: "5h ago"  },
  { icon: AlertTriangle, color: "text-warning",  title: "Risk Score Threshold Alert",  sub: "Score crossed 70 mark",   time: "1d ago"  },
  { icon: CheckCircle2,  color: "text-success",  title: "Weekly Report Generated",     sub: "Sent to email",           time: "3d ago"  },
];

const riskLevelClass: Record<string, string> = {
  High:    "badge-warning",
  Medium:  "badge bg-yellow-400/10 text-yellow-400",
  Low:     "badge-success",
  Critical:"badge-danger",
};

// ── subviews ───────────────────────────────────────────────────────────────────

function SummaryTab() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Portfolio chart */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Portfolio Composition</h3>
        <div className="relative mx-auto" style={{ width: 150, height: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PORTFOLIO_COMPOSITION} cx="50%" cy="50%" innerRadius={44} outerRadius={68} dataKey="value" paddingAngle={2}>
                {PORTFOLIO_COMPOSITION.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1.5 text-xs">
                      <p className="font-semibold text-text-primary">{payload[0].name}</p>
                      <p className="text-accent">{payload[0].value}%</p>
                    </div>
                  ) : null
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-text-primary">18</span>
            <span className="text-[10px] text-text-muted">assets</span>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {PORTFOLIO_COMPOSITION.map((t) => (
            <div key={t.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                <span className="text-xs text-text-secondary">{t.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-xs text-text-muted">{t.usd}</span>
                <span className="text-xs font-semibold text-text-primary w-10 text-right">{t.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk bars */}
      <div className="glass-card p-5 lg:col-span-2">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Risk Score Breakdown</h3>
        <div className="space-y-3 mb-5">
          {RISK_DIMENSIONS.map(({ label, score, level, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-primary">{score}</span>
                  <span className={riskLevelClass[level]}>{level}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={RISK_BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="glass-card px-2 py-1 text-xs">
                    <p className="text-accent">{payload[0].value}</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="score" fill="#0066FF" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

function WalletDetailView({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link href="/dashboard/wallets" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Wallets
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-secondary">Main Portfolio</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-text-primary">Main Portfolio</h1>
            <span className="badge-primary">Personal</span>
          </div>
          <p className="text-xs font-mono text-text-muted mb-2">
            inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh
          </p>
          <div className="flex items-center gap-2">
            <span className="badge-success flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Active
            </span>
            <span className="badge-primary">Injective Mainnet</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-3.5 w-3.5" /> Analyze Again
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href={`/dashboard/reports/r1`}>
              <FileText className="h-3.5 w-3.5" /> View Latest Report
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Portfolio Value", value: "$45,680.25", sub: "+$2,340 this week",  color: "text-text-primary" },
          { label: "Total Assets",          value: "18",         sub: "across all protocols", color: "text-accent"       },
          { label: "Risk Score",            value: "72/100",     sub: "High risk level",      color: "text-warning"      },
          { label: "Concentration Risk",    value: "75.8%",      sub: "INJ dominates",        color: "text-danger"       },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <p className="text-xs text-text-muted">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content + right panel */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeTab === "Summary" && <SummaryTab />}
          {activeTab !== "Summary" && (
            <div className="glass-card p-10 flex flex-col items-center gap-3 text-center">
              <Wallet className="h-8 w-8 text-text-muted" />
              <p className="text-sm font-semibold text-text-primary">{activeTab} coming soon</p>
              <p className="text-xs text-text-secondary">This section is under active development.</p>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: RefreshCw, label: "Analyze Wallet",    variant: "secondary" as const },
                { icon: FileText,  label: "Generate Report",   variant: "secondary" as const },
                { icon: Star,      label: "Add to Watchlist",  variant: "ghost"     as const },
                { icon: GitCompare,label: "Compare Wallets",   variant: "ghost"     as const },
                { icon: Brain,     label: "View AI Insights",  variant: "ghost"     as const },
              ].map(({ icon: Icon, label, variant }) => (
                <Button key={label} variant={variant} size="sm" className="w-full justify-start gap-2">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map(({ icon: Icon, color, title, sub, time }) => (
                <div key={title} className="flex items-start gap-2.5 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                  <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-xs font-medium text-text-primary">{title}</p>
                    <p className="text-[11px] text-text-muted">{sub}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Report History */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">AI Report History</h3>
          <Button variant="accent" size="sm">
            <Plus className="h-3.5 w-3.5" /> New Analysis
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Date", "Type", "Risk Score", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AI_REPORT_HISTORY.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3 text-xs text-text-muted">{row.date}</td>
                <td className="px-5 py-3 text-xs text-text-primary">{row.type}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-primary">{row.riskScore}</span>
                    <span className={row.status}>{row.statusLabel}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard/reports/r1"><Eye className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function WalletDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <WalletDetailView id={params.id} />
    </DashboardLayout>
  );
}
