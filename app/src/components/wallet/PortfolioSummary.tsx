"use client";

import { Share2, Download, CheckCircle, TrendingUp, Layers, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui";
import { formatAddress, formatCurrency } from "@/lib/utils";

interface PortfolioSummaryProps {
  address: string;
  totalValueUsd: number;
  tokenCount: number;
  riskScore: number;
  riskLevel: string;
  dataSource?: string;
  completedAt?: string;
}

const riskBadge: Record<string, string> = {
  Low:       "badge-success",
  Moderate:  "badge bg-yellow-400/10 text-yellow-400",
  High:      "badge-warning",
  "Very High": "badge-danger",
};

export function PortfolioSummary({ address, totalValueUsd, tokenCount, riskScore, riskLevel, dataSource, completedAt }: PortfolioSummaryProps) {
  const isDemo = dataSource === "injective-demo";
  const formattedDate = completedAt ? new Date(completedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "";

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              {address.slice(4, 6).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-mono text-text-primary">{formatAddress(address, 8)}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-[10px] text-success">Analysis Complete</span>
                {isDemo && <span className="badge-accent text-[10px]">Demo Data</span>}
              </div>
            </div>
          </div>
          {formattedDate && <p className="text-xs text-text-muted ml-10 flex items-center gap-1"><Clock className="h-3 w-3" />{formattedDate}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm"><Share2 className="h-3.5 w-3.5" /> Share</Button>
          <Button variant="secondary" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
        </div>
      </div>
      <div className="divider mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-2 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1"><TrendingUp className="h-3.5 w-3.5 text-text-muted" /><p className="text-xs text-text-muted">Portfolio Value</p></div>
          <p className="text-lg font-bold text-text-primary">{formatCurrency(totalValueUsd)}</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1"><Layers className="h-3.5 w-3.5 text-text-muted" /><p className="text-xs text-text-muted">Total Assets</p></div>
          <p className="text-lg font-bold text-text-primary">{tokenCount}</p>
          <p className="text-xs text-text-muted">tokens tracked</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1"><AlertTriangle className="h-3.5 w-3.5 text-text-muted" /><p className="text-xs text-text-muted">Risk Score</p></div>
          <p className="text-lg font-bold text-text-primary">{riskScore}</p>
          <span className={riskBadge[riskLevel] ?? "badge-primary"}>{riskLevel}</span>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1"><CheckCircle className="h-3.5 w-3.5 text-text-muted" /><p className="text-xs text-text-muted">Data Source</p></div>
          <p className="text-lg font-bold text-text-primary">{isDemo ? "Demo" : "Live"}</p>
          <p className="text-xs text-text-muted truncate">{dataSource}</p>
        </div>
      </div>
    </div>
  );
}
