"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  ArrowLeft,
  Save,
  Share2,
  FileDown,
  Download,
  ChevronRight,
  AlertTriangle,
  Shield,
  TrendingUp,
  BarChart2,
  Activity,
  FileText,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

// ── data ───────────────────────────────────────────────────────────────────────

const TABS = ["Summary", "Risk Analysis", "Portfolio", "Transactions", "Activity", "Recommendations"] as const;
type Tab = (typeof TABS)[number];

const RISK_DIMENSIONS = [
  { label: "Concentration Risk",  score: 78, level: "Critical" },
  { label: "Volatility Risk",     score: 65, level: "High"     },
  { label: "DeFi Exposure",       score: 55, level: "Medium"   },
  { label: "Liquidity Risk",      score: 44, level: "Medium"   },
  { label: "Activity Risk",       score: 36, level: "Low"      },
];

const RISK_COLORS: Record<string, string> = {
  Critical: "bg-danger",
  High:     "bg-warning",
  Medium:   "bg-yellow-500",
  Low:      "bg-success",
};
const RISK_BADGE: Record<string, string> = {
  Critical: "badge-danger",
  High:     "badge-warning",
  Medium:   "badge bg-yellow-400/10 text-yellow-400",
  Low:      "badge-success",
};

const PROTOCOL_EXPOSURE = [
  { protocol: "Helix Exchange",  type: "DEX",           exposure: "$456,230.00", pct: "18.6%", risk: "Medium" },
  { protocol: "Astroport",       type: "AMM",           exposure: "$312,480.00", pct: "12.7%", risk: "Medium" },
  { protocol: "Mito",            type: "Yield Vault",   exposure: "$198,750.00", pct: "8.1%",  risk: "High"   },
];

const KEY_RISK_FACTORS = [
  { icon: AlertTriangle, color: "text-danger",  text: "INJ concentration at 58% — above safe threshold"    },
  { icon: Shield,        color: "text-warning", text: "DeFi smart contract exposure across 3 protocols"    },
  { icon: TrendingUp,    color: "text-warning", text: "Stablecoin ratio only 12.1% — below 20% minimum"   },
  { icon: BarChart2,     color: "text-accent",  text: "High transaction velocity — 43 txns last 7 days"   },
  { icon: Activity,      color: "text-success",  text: "No suspicious wallet interactions detected"         },
];

const RISK_BAR_DATA = RISK_DIMENSIONS.map((d) => ({
  name: d.label.split(" ")[0],
  score: d.score,
}));

// ── subviews ───────────────────────────────────────────────────────────────────

function SummaryContent() {
  return (
    <div className="space-y-6">
      {/* AI Wallet Intelligence */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <FileText className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary">AI Wallet Intelligence</h3>
        </div>
        <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
          <p>
            This wallet demonstrates a <strong className="text-warning">high-risk profile</strong> driven
            primarily by extreme concentration in INJ (Injective Protocol), which constitutes{" "}
            <strong className="text-text-primary">58.4%</strong> of total portfolio value. While the portfolio
            shows meaningful diversification across 18 assets, the dominant INJ exposure creates significant
            single-asset risk.
          </p>
          <p>
            DeFi protocol participation is notable, with positions across Helix Exchange, Astroport, and Mito
            representing a combined <strong className="text-text-primary">39.4%</strong> of total value. This
            introduces smart-contract and liquidity risk layers that elevate the overall risk assessment.
          </p>
          <p>
            Stablecoin holdings at <strong className="text-text-primary">12.1%</strong> provide insufficient
            buffer against market downturns. The recommended minimum allocation is 20% for wallets of this
            risk profile. Transaction activity over the past 30 days indicates active DeFi participation with
            43 on-chain interactions.
          </p>
          <p>
            <strong className="text-success">Positive indicators</strong>: No suspicious wallet interactions
            detected, consistent staking behavior, and no exposure to flagged protocols. The wallet&apos;s
            age (8 months, 12 days) suggests an experienced participant.
          </p>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Risk Assessment</h3>
        <div className="space-y-3">
          {RISK_DIMENSIONS.map(({ label, score, level }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-text-secondary">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-primary">{score}</span>
                  <span className={RISK_BADGE[level]}>{level}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div className={`h-full rounded-full ${RISK_COLORS[level]} transition-all duration-500`} style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={RISK_BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1 text-xs">
                      <p className="text-accent font-semibold">{payload[0].value}</p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="score" radius={[3, 3, 0, 0]}>
                {RISK_BAR_DATA.map((entry, i) => (
                  <rect key={i} fill={entry.score > 70 ? "#EF4444" : entry.score > 50 ? "#F5C542" : "#22C55E"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Protocol Exposure */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">Protocol Exposure</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Protocol", "Type", "Exposure", "% of Portfolio", "Risk"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROTOCOL_EXPOSURE.map((row) => (
              <tr key={row.protocol} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3 text-xs font-medium text-text-primary">{row.protocol}</td>
                <td className="px-5 py-3 text-xs text-text-muted">{row.type}</td>
                <td className="px-5 py-3 text-xs font-mono text-text-primary">{row.exposure}</td>
                <td className="px-5 py-3 text-xs text-text-secondary">{row.pct}</td>
                <td className="px-5 py-3"><span className={RISK_BADGE[row.risk]}>{row.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────────

function ReportDetailView({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link href="/dashboard/reports" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Reports
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-secondary">Report Detail</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-text-primary mb-1">Main Portfolio</h1>
          <p className="text-xs text-text-muted">Full AI Analysis · Generated May 29, 2025 10:24 AM</p>
          <p className="text-[11px] font-mono text-text-muted mt-1">inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Save className="h-3.5 w-3.5" /> Save Report
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="accent" size="sm">
            <FileDown className="h-3.5 w-3.5" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Risk Score",      value: "72",              sub: "High risk level",       color: "text-warning"      },
          { label: "Portfolio Value", value: "$2,456,780.45",   sub: "As of analysis date",   color: "text-text-primary" },
          { label: "Total Assets",    value: "48",              sub: "distinct tokens",        color: "text-accent"       },
          { label: "Wallet Age",      value: "8 months",        sub: "12 days on-chain",       color: "text-success"       },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <p className="text-xs text-text-muted">{label}</p>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
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

      {/* Content + sidebar */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3">
          {activeTab === "Summary" && <SummaryContent />}
          {activeTab !== "Summary" && (
            <div className="glass-card p-10 flex flex-col items-center gap-3 text-center">
              <Wallet className="h-8 w-8 text-text-muted" />
              <p className="text-sm font-semibold text-text-primary">{activeTab} coming soon</p>
              <p className="text-xs text-text-secondary">This section is under active development.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Risk score circle */}
          <div className="glass-card p-5 flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#30363D" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#F5C542" strokeWidth="2.5"
                  strokeDasharray={`${72} ${100 - 72}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-warning">72</span>
                <span className="text-[10px] text-text-muted">Risk</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-primary">High Risk</p>
              <p className="text-xs text-text-muted">Score out of 100</p>
            </div>
          </div>

          {/* Download options */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Download Options</h3>
            <div className="space-y-2">
              {[
                { icon: FileDown, label: "Download PDF",  variant: "accent"     as const },
                { icon: Download, label: "Export CSV",    variant: "secondary"  as const },
                { icon: Download, label: "Export JSON",   variant: "secondary"  as const },
              ].map(({ icon: Icon, label, variant }) => (
                <Button key={label} variant={variant} size="sm" className="w-full gap-2 justify-start">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Key risk factors */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Key Risk Factors</h3>
            <ul className="space-y-2.5">
              {KEY_RISK_FACTORS.map(({ icon: Icon, color, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                  <p className="text-xs text-text-secondary leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ReportDetailView id={params.id} />
    </DashboardLayout>
  );
}
