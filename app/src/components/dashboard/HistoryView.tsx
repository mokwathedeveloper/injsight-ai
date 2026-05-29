"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Filter, Download, RefreshCw, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Gauge } from "lucide-react";
import { Button, EmptyState, ErrorState, Skeleton } from "@/components/ui";
import { formatCurrency, formatAddress, getRiskBadgeClass } from "@/lib/utils";
import { useAnalysisHistory } from "@/hooks/useAnalysis";

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  completed:   { label: "Completed",   icon: CheckCircle, color: "text-success", bg: "bg-success-muted"  },
  in_progress: { label: "In Progress", icon: Clock,       color: "text-accent",  bg: "bg-accent-muted"   },
  failed:      { label: "Failed",      icon: XCircle,     color: "text-danger",  bg: "bg-danger-muted"   },
};

function riskBarColor(level: string): string {
  switch (level?.toLowerCase()) {
    case "critical": return "bg-danger";
    case "high":     return "bg-warning";
    case "medium":   return "bg-yellow-400";
    default:         return "bg-success";
  }
}

export function HistoryView() {
  const [search, setSearch]           = useState("");
  const [riskFilter, setRiskFilter]   = useState("All Risk Levels");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage]               = useState(1);

  const { data: analyses, isLoading, isError, refetch } = useAnalysisHistory();

  // ── loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">Analysis History</h1>
            <p className="text-sm text-text-secondary">View and manage all your wallet analysis reports.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="stat-card space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
        <div className="glass-card overflow-hidden">
          <div className="p-4 space-y-3">
            {[0, 1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── error ─────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Analysis History</h1>
        </div>
        <div className="glass-card p-4">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  const allAnalyses = analyses ?? [];

  // ── computed stats ────────────────────────────────────────────────────────
  const completed  = allAnalyses.filter(h => h.status === "completed").length;
  const inProgress = allAnalyses.filter(h => h.status === "in_progress").length;
  const avgRisk = allAnalyses.length
    ? Math.round(allAnalyses.reduce((s, h) => s + (h.riskScore?.score ?? 0), 0) / allAnalyses.length)
    : 0;

  // ── filtering ─────────────────────────────────────────────────────────────
  const filtered = allAnalyses.filter(h => {
    const addr  = h.walletAddress ?? "";
    const level = (h.riskScore?.level ?? "").toLowerCase();
    const status = h.status ?? "";

    if (search &&
        !addr.toLowerCase().includes(search.toLowerCase())) return false;

    if (riskFilter !== "All Risk Levels") {
      const filterLvl = riskFilter.toLowerCase().split(" ")[0];
      if (level !== filterLvl) return false;
    }

    if (statusFilter !== "All Status") {
      const filterSt = statusFilter.toLowerCase().replace(" ", "_");
      if (status !== filterSt) return false;
    }

    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Analysis History</h1>
          <p className="text-sm text-text-secondary">View and manage all your wallet analysis reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Total Analyses</p>
            <RefreshCw className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{allAnalyses.length}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="h-1 flex-1 rounded-full bg-surface-3 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: allAnalyses.length ? `${(completed / allAnalyses.length) * 100}%` : "0%" }} />
            </div>
            <span className="text-[10px] text-text-muted">
              {allAnalyses.length ? Math.round((completed / allAnalyses.length) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Completed</p>
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-success">{completed}</p>
          <p className="text-xs text-text-muted">
            {allAnalyses.length ? Math.round((completed / allAnalyses.length) * 100) : 0}% success rate
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">In Progress</p>
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-accent">{inProgress}</p>
          <p className="text-xs text-text-muted">currently running</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Avg. Risk Score</p>
            <Gauge className="h-4 w-4 text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{avgRisk}</p>
          <p className="text-xs text-text-muted">across all analyses</p>
        </div>
      </div>

      {/* Empty state */}
      {allAnalyses.length === 0 ? (
        <div className="glass-card p-4">
          <EmptyState
            title="No analyses yet"
            description="Analyze your first Injective wallet to start building your history."
            action={{
              label: "Analyze a Wallet",
              onClick: () => { window.location.href = "/analyze"; },
            }}
          />
        </div>
      ) : (
        <>
          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by wallet address..."
                className="input-field pl-9 py-2 text-xs h-9"
              />
            </div>
            <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="input-field h-9 text-xs w-36">
              {["All Risk Levels","Low Risk","Medium Risk","High Risk","Critical Risk"].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field h-9 text-xs w-32">
              {["All Status","Completed","In Progress","Failed"].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <Button variant="secondary" size="sm">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
            <div className="ml-auto">
              <span className="text-xs text-text-muted">{filtered.length} of {allAnalyses.length} analyses</span>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-2/40">
                  {["Date & Time", "Wallet", "Risk Score", "Risk Level", "Portfolio Value", "Status", "Report", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const statusKey = (item.status ?? "completed") as keyof typeof statusConfig;
                  const sc = statusConfig[statusKey] ?? statusConfig.completed;
                  const StatusIcon = sc.icon;
                  const level = item.riskScore?.level ?? "";
                  const score = item.riskScore?.score ?? 0;
                  const hasReport = !!item.aiReport?.summary;

                  return (
                    <tr key={item.id} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors group">
                      <td className="px-4 py-3">
                        {item.completedAt ? (
                          <>
                            <p className="text-xs text-text-primary font-medium">
                              {new Date(item.completedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              {new Date(item.completedAt).toLocaleTimeString(undefined, { timeStyle: "short" })}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-text-muted">—</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[11px] font-mono text-text-muted">{formatAddress(item.walletAddress, 8)}</p>
                        {item.chain && <span className="badge-primary text-[10px]">{item.chain}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-text-primary">{score}</span>
                          <div className="w-12 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${riskBarColor(level)}`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {level ? (
                          <span className={getRiskBadgeClass(level)}>{level} Risk</span>
                        ) : (
                          <span className="text-xs text-text-muted">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-text-primary">
                        {item.portfolio?.totalValueUsd != null
                          ? formatCurrency(item.portfolio.totalValueUsd)
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {sc.label}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {hasReport ? (
                          <span className="badge-success text-[10px]">Available</span>
                        ) : (
                          <span className="badge bg-surface-2 text-text-muted border border-border text-[10px]">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/analyze?address=${item.walletAddress}`}><RefreshCw className="h-3.5 w-3.5" /></Link>
                          </Button>
                          {hasReport && (
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/reports/${item.id}`}><ExternalLink className="h-3.5 w-3.5" /></Link>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-2/20">
              <p className="text-xs text-text-muted">Showing 1–{filtered.length} of {filtered.length} analyses</p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 rounded text-xs font-medium ${page === n ? "bg-primary text-white" : "text-text-muted hover:bg-surface-2"}`}
                  >
                    {n}
                  </button>
                ))}
                <Button variant="ghost" size="icon" onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
