"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { LoadingState, ErrorState, Button } from "@/components/ui";
import Link from "next/link";
import { formatAddress, formatCurrency } from "@/lib/utils";
import { ArrowLeft, RefreshCw, ExternalLink } from "lucide-react";

interface WalletDetailProps {
  walletId: string;
}

interface WalletDetail {
  id: string;
  address: string;
  label?: string;
  chain?: string;
  latestAnalysis?: {
    riskScore?: { score: number; level: string };
    portfolio?: {
      totalValueUsd: number;
      tokenCount: number;
      holdings: Array<{
        symbol: string;
        name: string;
        amount: number;
        value_usd: number;
        percent: number;
      }>;
    };
    aiReport?: {
      summary?: string;
      riskExplanation?: string;
      suggestedNextSteps?: string[];
      disclaimer?: string;
    };
  };
}

function getRiskColor(level: string): string {
  switch (level?.toLowerCase()) {
    case "very high":
    case "critical": return "text-danger";
    case "high":     return "text-warning";
    case "moderate":
    case "medium":   return "text-yellow-400";
    default:         return "text-success";
  }
}

export function WalletDetailView({ walletId }: WalletDetailProps) {
  const { data: wallet, isLoading, isError, refetch } = useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async (): Promise<WalletDetail> => {
      const res = await apiClient.get(`/wallets/${walletId}`);
      return unwrapData(res) as WalletDetail;
    },
    enabled: !!walletId,
  });

  if (isLoading) return <LoadingState message="Loading wallet details..." size="lg" />;
  if (isError || !wallet) return <ErrorState title="Wallet not found" onRetry={() => refetch()} />;

  const analysis  = wallet.latestAnalysis;
  const risk      = analysis?.riskScore;
  const portfolio = analysis?.portfolio;
  const report    = analysis?.aiReport;
  const riskColor = risk?.level ? getRiskColor(risk.level) : "text-text-secondary";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/wallets">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-text-primary">{wallet.label ?? "Wallet"}</h1>
              {wallet.chain && <span className="badge-primary">{wallet.chain}</span>}
            </div>
            <p className="text-xs font-mono text-text-muted mt-0.5">{wallet.address}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" /> Analyze Again
          </Button>
          {analysis && (
            <Button variant="accent" size="sm" asChild>
              <Link href={`/analyze?address=${wallet.address}`}>
                <ExternalLink className="h-3.5 w-3.5" /> View Full Report
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      {portfolio && risk && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-xs text-text-muted">Portfolio Value</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {formatCurrency(portfolio.totalValueUsd)}
            </p>
          </div>
          <div className="stat-card">
            <p className="text-xs text-text-muted">Total Assets</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{portfolio.tokenCount}</p>
            <p className="text-xs text-text-muted">tokens</p>
          </div>
          <div className="stat-card">
            <p className="text-xs text-text-muted">Risk Score</p>
            <div className="flex items-end gap-2 mt-1">
              <p className={`text-2xl font-bold ${riskColor}`}>{risk.score}</p>
              <p className="text-text-muted mb-0.5">/ 100</p>
            </div>
          </div>
          <div className="stat-card">
            <p className="text-xs text-text-muted">Risk Level</p>
            <p className={`text-lg font-bold mt-1 ${riskColor}`}>{risk.level} Risk</p>
          </div>
        </div>
      )}

      {/* No analysis yet */}
      {!analysis && (
        <div className="glass-card p-8 text-center">
          <p className="text-text-secondary mb-4">This wallet hasn&apos;t been analyzed yet.</p>
          <Button variant="accent" asChild>
            <Link href={`/analyze?address=${wallet.address}`}>Analyze Now</Link>
          </Button>
        </div>
      )}

      {/* Holdings table */}
      {portfolio?.holdings && portfolio.holdings.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Token Holdings</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-2/30">
                {["Token", "Balance", "Value (USD)", "% Portfolio"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map(h => (
                <tr key={h.symbol} className="border-b border-border/40 hover:bg-surface-2/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                        {h.symbol[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">{h.symbol}</p>
                        <p className="text-[10px] text-text-muted">{h.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-secondary">
                    {typeof h.amount === "number" ? h.amount.toLocaleString() : h.amount}
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-text-primary">
                    {formatCurrency(h.value_usd)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-surface-3">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${Math.min(h.percent, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">{h.percent}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Report */}
      {report && (
        <div className="glass-card p-5 border-accent/20">
          <h3 className="text-sm font-semibold text-text-primary mb-3">AI Intelligence Report</h3>
          {report.summary && (
            <p className="text-sm text-text-secondary leading-relaxed mb-3">{report.summary}</p>
          )}
          {report.riskExplanation && (
            <p className="text-xs text-text-muted leading-relaxed mb-3 border-l-2 border-accent/30 pl-3">
              {report.riskExplanation}
            </p>
          )}
          {report.suggestedNextSteps && report.suggestedNextSteps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted mb-2">Next Steps</p>
              <ul className="space-y-1">
                {report.suggestedNextSteps.map((step, i) => (
                  <li key={i} className="text-xs text-text-secondary flex gap-2">
                    <span className="text-accent shrink-0">→</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.disclaimer && (
            <p className="text-[10px] text-text-muted mt-3 italic">{report.disclaimer}</p>
          )}
        </div>
      )}

      {/* Wallet address summary footer */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Full wallet address</p>
          <p className="text-xs font-mono text-text-secondary mt-0.5">{wallet.address}</p>
        </div>
        <p className="text-[10px] font-mono text-text-muted">{formatAddress(wallet.address, 8)}</p>
      </div>
    </div>
  );
}
