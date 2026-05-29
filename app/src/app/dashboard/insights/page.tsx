"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, EmptyState, ErrorState, CardSkeleton, Skeleton } from "@/components/ui";
import {
  Brain, AlertTriangle, TrendingUp, Shield,
  Sparkles, Info, RefreshCw, ExternalLink, Clock,
} from "lucide-react";
import { useInsights, useGenerateInsights, type InsightItem } from "@/hooks/useInsights";

const SEV_CONFIG: Record<string, { badge: string; icon: React.ElementType; iconBg: string; iconColor: string }> = {
  critical: { badge: "badge-danger",                            icon: AlertTriangle, iconBg: "bg-danger-muted",  iconColor: "text-danger"     },
  high:     { badge: "badge-warning",                           icon: AlertTriangle, iconBg: "bg-warning-muted", iconColor: "text-warning"    },
  medium:   { badge: "badge bg-yellow-400/10 text-yellow-400", icon: TrendingUp,    iconBg: "bg-yellow-400/10", iconColor: "text-yellow-400" },
  low:      { badge: "badge-success",                           icon: Shield,        iconBg: "bg-success-muted", iconColor: "text-success"    },
  info:     { badge: "badge-accent",                            icon: Sparkles,      iconBg: "bg-accent-muted",  iconColor: "text-accent"     },
};

function InsightCard({ insight }: { insight: InsightItem }) {
  const cfg  = SEV_CONFIG[insight.severity] ?? SEV_CONFIG.info;
  const Icon = cfg.icon;

  return (
    <div className="glass-card-hover p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-lg shrink-0 ${cfg.iconBg}`}>
          <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-text-primary">{insight.title}</h3>
            <span className={cfg.badge}>{insight.severityLabel}</span>
            {insight.isNew && (
              <span className="badge bg-primary/15 text-accent text-[10px]">New</span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-text-secondary mt-0.5 truncate">
            {insight.walletLabel}
          </p>
          <p className="text-[10px] font-mono text-text-muted">{insight.wallet}</p>
        </div>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>

      {insight.riskScore > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted shrink-0">Risk</span>
          <div className="flex-1 h-1.5 rounded-full bg-surface-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                insight.riskScore >= 80 ? "bg-danger"     :
                insight.riskScore >= 60 ? "bg-warning"    :
                insight.riskScore >= 35 ? "bg-yellow-400" : "bg-success"
              }`}
              style={{ width: `${insight.riskScore}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-text-primary shrink-0 w-6 text-right">
            {insight.riskScore}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <Clock className="h-3 w-3" />
          {insight.analyzedAt
            ? new Date(insight.analyzedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : "—"}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/wallets/${insight.walletId}`}>
            View Wallet <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function InsightsView() {
  const { data, isLoading, isError, refetch } = useInsights();
  const generateMutation = useGenerateInsights();

  const stats    = data?.stats;
  const insights = data?.insights ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Insights</h1>
          <p className="text-sm text-text-secondary">
            AI-generated intelligence across your saved wallets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => generateMutation.mutate()}
            loading={generateMutation.isPending}
          >
            <Brain className="h-3.5 w-3.5" />
            {generateMutation.isPending ? "Generating…" : "Generate Insights"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0,1,2,3].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Insights",  value: stats?.total ?? 0,        color: "text-accent",   sub: "across all wallets"  },
            { label: "High Priority",   value: stats?.highPriority ?? 0, color: "text-danger",   sub: "require attention"   },
            { label: "Analyses (Week)", value: stats?.thisWeek ?? 0,     color: "text-primary",  sub: "run this week"       },
            { label: "Avg Risk Score",  value: stats?.avgRiskScore ?? 0, color: "text-warning",  sub: "across saved wallets"},
          ].map(({ label, value, color, sub }) => (
            <div key={label} className="stat-card">
              <p className="text-xs text-text-muted">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-text-muted">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <ErrorState
          title="Failed to load insights"
          message="Could not generate insights from your wallets. Make sure you have saved wallets with analyses."
          onRetry={() => refetch()}
        />
      )}

      {/* Skeleton grid */}
      {isLoading && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className="glass-card p-5 space-y-3">
              <div className="flex gap-3">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && insights.length === 0 && (
        <div className="space-y-4">
          <EmptyState
            icon={<Brain className="h-10 w-10 text-text-muted" />}
            title="No insights yet"
            description='Save wallets, run analyses, then click "Generate Insights" to scan your portfolio for AI-powered intelligence.'
            action={{ label: "Generate Insights Now", onClick: () => generateMutation.mutate() }}
          />
          <div className="glass-card p-5 flex gap-3 items-start border-accent/20">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-text-secondary leading-relaxed">
              <strong className="text-text-primary">How it works:</strong> InjSight AI analyses each of your saved wallets —
              checking concentration risk, stablecoin buffers, risk scores, and token diversification.
              Each wallet generates actionable insights automatically.{" "}
              <Link href="/dashboard/wallets" className="text-accent hover:underline">Add wallets →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Insight cards */}
      {!isLoading && insights.length > 0 && (
        <>
          {generateMutation.isSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-success-muted border border-success/20 animate-fade-in">
              <Brain className="h-4 w-4 text-success shrink-0" />
              <p className="text-xs text-success font-semibold">
                {insights.length} insight{insights.length !== 1 ? "s" : ""} generated from your saved wallets.
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </>
      )}

      {/* Footer */}
      {!isLoading && !isError && (
        <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-text-primary">Want deeper insights?</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Add more wallets and run fresh analyses. Insights are re-generated from real on-chain data every time.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="secondary" size="sm" asChild><Link href="/dashboard/wallets">Saved Wallets</Link></Button>
            <Button variant="ghost" size="sm" asChild><Link href="/analyze">Analyze Wallet</Link></Button>
          </div>
        </div>
      )}
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
