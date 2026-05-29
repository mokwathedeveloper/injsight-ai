"use client";

import Link from "next/link";
import {
  TrendingUp, Wallet, Bell, ArrowRight, AlertTriangle,
  Info, ExternalLink, Search, CheckCircle, FileText,
} from "lucide-react";
import { Button, Skeleton, CardSkeleton, EmptyState, ErrorState } from "@/components/ui";
import { formatCurrency, formatAddress, getRiskBadgeClass } from "@/lib/utils";
import { useDashboardSummary, type DashboardRecentAnalysis } from "@/hooks/useDashboard";
import { useAlerts, type AlertAPI } from "@/hooks/useAlerts";

const alertIcon = {
  high:    { Icon: AlertTriangle, color: "text-danger"  },
  warning: { Icon: AlertTriangle, color: "text-warning" },
  info:    { Icon: Info,          color: "text-accent"  },
  success: { Icon: CheckCircle,   color: "text-success" },
};

function getRiskScore(item: DashboardRecentAnalysis): number {
  const rs = item.risk_score;
  if (!rs) return 0;
  if (typeof rs === "number") return rs;
  return rs.score;
}

function getRiskLevel(item: DashboardRecentAnalysis): string {
  const rs = item.risk_score;
  if (!rs) return "unknown";
  if (typeof rs === "number") {
    if (rs >= 80) return "critical";
    if (rs >= 60) return "high";
    if (rs >= 30) return "medium";
    return "low";
  }
  return rs.risk_level.toLowerCase();
}

function getAlertSeverity(alert: AlertAPI): keyof typeof alertIcon {
  const s = alert.severity?.toLowerCase();
  if (s === "high" || s === "critical") return "high";
  if (s === "medium") return "warning";
  if (s === "low" || s === "success") return "success";
  return "info";
}

export function DashboardOverview() {
  const summaryQuery = useDashboardSummary();
    const alertsQuery  = useAlerts();

  const summary = summaryQuery.data;
  const recentAnalyses: (DashboardRecentAnalysis )[] =
    summary?.recent_analyses?.length
      ? summary.recent_analyses
      : [];
  const alerts = (alertsQuery.data ?? []).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-0.5">Your wallet intelligence summary.</p>
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
      {summaryQuery.isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : summaryQuery.isError ? (
        <ErrorState
          title="Failed to load summary"
          onRetry={() => summaryQuery.refetch()}
          className="py-8"
        />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">Total Analyses</p>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{summary?.total_analyses ?? 0}</p>
            <p className="text-xs text-text-muted mt-1">all time</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">Avg Risk Score</p>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{summary?.avg_risk_score ?? 0}</p>
            <p className="text-xs text-text-muted mt-1">/ 100 portfolio avg</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">Saved Wallets</p>
              <Wallet className="h-4 w-4 text-accent" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{summary?.saved_wallets ?? 0}</p>
            <p className="text-xs text-text-muted mt-1">tracked</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">Active Alerts</p>
              <Bell className="h-4 w-4 text-danger" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{summary?.active_alerts ?? 0}</p>
            <p className="text-xs text-text-muted mt-1">unread</p>
          </div>
        </div>
      )}

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

          {summaryQuery.isLoading ? (
            <div className="p-5 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          ) : recentAnalyses.length === 0 ? (
            <EmptyState
              title="No analyses yet"
              description="Analyze your first wallet to get started"
              action={{ label: "Analyze a wallet", onClick: () => { window.location.href = "/analyze"; } }}
            />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-2/30">
                  {["Wallet", "Risk Score", "Portfolio Value", "Date", "Action"].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentAnalyses.map((row) => {
                  const score    = getRiskScore(row);
                  const level    = getRiskLevel(row);
                  const label    = row.label ?? formatAddress(row.wallet_address, 5);
                  const value    = row.total_value_usd ?? 0;
                  const dateStr  = row.analyzed_at ?? (row as DashboardRecentAnalysis).created_at ?? "";
                  const dateDisp = dateStr ? new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
                  return (
                    <tr key={row.id} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                            {label[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-text-primary">{label}</p>
                            <p className="text-[10px] font-mono text-text-muted">{formatAddress(row.wallet_address, 7)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-text-primary">{score}</span>
                          <span className={getRiskBadgeClass(level)}>{level}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs font-semibold text-text-primary">
                        {value > 0 ? formatCurrency(value) : "—"}
                      </td>
                      <td className="px-5 py-3 text-[11px] text-text-muted">{dateDisp}</td>
                      <td className="px-5 py-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/analyze?address=${row.wallet_address}`}>View →</Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) window.location.href = `/analyze?address=${val}`;
                  }
                }}
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
            {alertsQuery.isLoading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : alerts.length === 0 ? (
              <p className="text-xs text-text-muted text-center py-4">No alerts yet.</p>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => {
                  const sev = getAlertSeverity(alert);
                  const { Icon, color } = alertIcon[sev];
                  const timeStr = alert.created_at
                    ? new Date(alert.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                    : alert.time ?? "";
                  return (
                    <div key={alert.id} className="flex items-start gap-2.5 pb-2.5 border-b border-border/40 last:border-0 last:pb-0">
                      <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-text-primary">{alert.title}</p>
                        <p className="text-[11px] text-text-muted leading-relaxed truncate">{alert.message}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{timeStr}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
