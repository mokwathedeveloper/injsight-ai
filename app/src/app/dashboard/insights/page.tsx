"use client";

import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Shield,
  Sparkles,
  Info,
} from "lucide-react";

// ── static data ────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Insights",  value: "47",  sub: "across all wallets",        color: "text-accent"   },
  { label: "High Priority",   value: "8",   sub: "require attention",          color: "text-danger"   },
  { label: "This Week",       value: "12",  sub: "new insights generated",     color: "text-primary"  },
  { label: "Avg Risk Score",  value: "58",  sub: "across saved wallets",       color: "text-warning"  },
];

type Severity = "danger" | "warning" | "success" | "accent" | "info";

interface Insight {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  wallet: string;
  time: string;
  severity: Severity;
  severityLabel: string;
}

const INSIGHTS: Insight[] = [
  {
    id: "i1",
    icon: AlertTriangle,
    iconBg: "bg-red-500/10",
    iconColor: "text-danger",
    title: "High Concentration Risk",
    description: "INJ exceeds 80% of total portfolio value. Consider rebalancing to reduce single-asset exposure and lower overall risk score.",
    wallet: "inj1qg5...kkxh",
    time: "2h ago",
    severity: "danger",
    severityLabel: "Critical",
  },
  {
    id: "i2",
    icon: AlertTriangle,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-warning",
    title: "Stablecoin Buffer Low",
    description: "Only 8% stablecoin allocation detected. A minimum 20% buffer is recommended for downside protection during market volatility.",
    wallet: "inj1hcm8...mzh",
    time: "5h ago",
    severity: "warning",
    severityLabel: "Warning",
  },
  {
    id: "i3",
    icon: Shield,
    iconBg: "bg-green-500/10",
    iconColor: "text-success",
    title: "Portfolio Diversified",
    description: "Well-balanced allocation across 12 tokens. No single asset exceeds 35% of portfolio value. Risk profile is within healthy range.",
    wallet: "inj1xyz...abc1",
    time: "1d ago",
    severity: "success",
    severityLabel: "Healthy",
  },
  {
    id: "i4",
    icon: TrendingUp,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-warning",
    title: "DeFi Exposure High",
    description: "45% exposure to DeFi protocols detected. Monitor liquidity risk and smart contract exposure, especially during high-volatility periods.",
    wallet: "inj1abc...def2",
    time: "2d ago",
    severity: "warning",
    severityLabel: "Warning",
  },
  {
    id: "i5",
    icon: Sparkles,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-accent",
    title: "New Token Detected",
    description: "KIRA token has been added to this wallet's portfolio. This token has limited on-chain history. Risk impact is being monitored.",
    wallet: "inj1xyz...pqr3",
    time: "3d ago",
    severity: "accent",
    severityLabel: "Info",
  },
  {
    id: "i6",
    icon: Brain,
    iconBg: "bg-green-500/10",
    iconColor: "text-success",
    title: "Risk Score Improved",
    description: "Risk score dropped from 78 to 65 following portfolio rebalancing. INJ concentration reduced from 82% to 58%, improving overall health.",
    wallet: "inj1def...ghi3",
    time: "1w ago",
    severity: "success",
    severityLabel: "Improved",
  },
];

const SEVERITY_BADGE: Record<Severity, string> = {
  danger:  "badge-danger",
  warning: "badge-warning",
  success: "badge-success",
  accent:  "badge-accent",
  info:    "badge-primary",
};

// ── component ──────────────────────────────────────────────────────────────────

function InsightsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Insights</h1>
          <p className="text-sm text-text-secondary">
            AI-generated intelligence across your saved wallets
          </p>
        </div>
        <Button variant="accent" size="sm">
          <Brain className="h-3.5 w-3.5" /> Generate Insights
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <p className="text-xs text-text-muted">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Insight cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {INSIGHTS.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="glass-card-hover p-5 flex flex-col gap-3">
              {/* Icon + title row */}
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg shrink-0 ${insight.iconBg}`}>
                  <Icon className={`h-5 w-5 ${insight.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-text-primary">{insight.title}</h3>
                    <span className={SEVERITY_BADGE[insight.severity]}>{insight.severityLabel}</span>
                  </div>
                  <p className="text-[11px] font-mono text-text-muted mt-0.5">{insight.wallet}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                <span className="badge bg-surface-3 text-text-muted">{insight.time}</span>
                <Button variant="ghost" size="sm">
                  View Details →
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty-state prompt */}
      <div className="glass-card p-6 flex flex-col items-center gap-3 text-center">
        <div className="p-3 rounded-full bg-primary/10">
          <Info className="h-6 w-6 text-accent" />
        </div>
        <p className="text-sm font-semibold text-text-primary">Want deeper insights?</p>
        <p className="text-xs text-text-secondary max-w-md">
          Add more wallets to your watchlist and run a fresh analysis to surface new AI-generated intelligence about your portfolio.
        </p>
        <Button variant="secondary" size="sm">Browse Saved Wallets</Button>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <InsightsView />
    </DashboardLayout>
  );
}
