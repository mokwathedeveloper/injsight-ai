"use client";

import { FileText, Download, Share2, ExternalLink, Plus } from "lucide-react";
import { Button, LoadingState, EmptyState, ErrorState, CardSkeleton } from "@/components/ui";
import { formatCurrency, formatAddress, getRiskBadgeClass } from "@/lib/utils";
import Link from "next/link";
import { useReports, ReportAPI } from "@/hooks/useReports";

/** Normalise the polymorphic risk_score field to a plain number or null. */
function resolveRiskScore(r: ReportAPI): number | null {
  if (r.risk_score == null) return null;
  if (typeof r.risk_score === "number") return r.risk_score;
  if (typeof r.risk_score === "object" && "score" in r.risk_score) {
    return (r.risk_score as { score: number }).score;
  }
  return null;
}

function resolveRiskLevel(r: ReportAPI): string | null {
  if (r.risk_score == null) return null;
  if (typeof r.risk_score === "object" && "risk_level" in r.risk_score) {
    return (r.risk_score as { risk_level: string }).risk_level;
  }
  return null;
}

export function ReportsView() {
  const { data: reports, isLoading, isError, refetch } = useReports();

  // ── loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">Reports</h1>
            <p className="text-sm text-text-secondary">View, export, and share your AI wallet reports.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // ── error ─────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Reports</h1>
        </div>
        <div className="glass-card p-4">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  const allReports = reports ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Reports</h1>
          <p className="text-sm text-text-secondary">View, export, and share your AI wallet reports.</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Generate Report
        </Button>
      </div>

      {/* Empty state */}
      {allReports.length === 0 ? (
        <div className="glass-card p-4">
          <EmptyState
            title="No reports yet"
            description="Analyze a wallet to generate your first AI-powered risk report."
            action={{
              label: "Analyze a Wallet",
              onClick: () => { window.location.href = "/analyze"; },
            }}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allReports.map(report => {
            const score     = resolveRiskScore(report);
            const riskLevel = resolveRiskLevel(report);
            const address   = report.wallet_address ?? "";

            return (
              <div key={report.id} className="glass-card-hover p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary-muted shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {report.label ?? "Wallet Report"}
                    </p>
                    {address && (
                      <p className="text-[10px] font-mono text-text-muted">{formatAddress(address, 8)}</p>
                    )}
                    {report.created_at && (
                      <p className="text-[10px] text-text-muted mt-0.5">
                        {new Date(report.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    )}
                  </div>
                </div>

                {report.summary && (
                  <p className="text-[11px] text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {report.summary}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-surface-2 rounded-lg p-2">
                    <p className="text-[10px] text-text-muted">Status</p>
                    <p className="text-sm font-bold text-text-primary capitalize">{report.status ?? "—"}</p>
                  </div>
                  <div className="bg-surface-2 rounded-lg p-2">
                    <p className="text-[10px] text-text-muted">Risk Score</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {score != null ? (
                        <>
                          <span className="text-sm font-bold text-text-primary">{score}</span>
                          {riskLevel && (
                            <span className={getRiskBadgeClass(riskLevel)}>{riskLevel}</span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-text-muted">—</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Download className="h-3.5 w-3.5" /> Export PDF
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/reports/${report.id}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
