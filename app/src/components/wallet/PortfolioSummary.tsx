"use client";

import { Share2, Download, CheckCircle, TrendingUp, Layers, AlertTriangle } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { formatAddress, formatCurrency } from "@/lib/utils";

const MOCK_SUMMARY = {
  totalValueUsd: 248450,
  change30d: 18.5,
  tokenCount: 28,
  oneDayChange: 1.86,
  dominantToken: "INJ",
  dominantPct: 78.4,
  riskScore: 72,
  riskLevel: "high" as const,
  lastAnalyzed: "May 29, 2025 · 10:24 AM",
  address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh",
};

export function PortfolioSummary({ address }: { address: string }) {
  const data = MOCK_SUMMARY;

  return (
    <div className="glass-card p-5">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              {address.slice(3, 5).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-mono text-text-primary">{formatAddress(address, 8)}</p>
              <p className="text-[10px] text-success flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Analysis Complete
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted ml-10">{data.lastAnalyzed}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <div className="divider mb-4" />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatItem
          label="Total Portfolio Value"
          value={formatCurrency(data.totalValueUsd)}
          sub={`+${data.change30d}% (30d)`}
          subColor="text-success"
          icon={TrendingUp}
        />
        <StatItem
          label="Total Assets"
          value={String(data.tokenCount)}
          sub="tokens tracked"
          icon={Layers}
        />
        <StatItem
          label="Dominant Token"
          value={data.dominantToken}
          sub={`${data.dominantPct}% of portfolio`}
          icon={TrendingUp}
        />
        <StatItem
          label="Last Changed"
          value="May 20, 2025"
          sub="13:14 AM"
          icon={AlertTriangle}
        />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  sub,
  subColor = "text-text-muted",
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-surface-2 rounded-lg p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="h-3.5 w-3.5 text-text-muted" />
        <p className="text-xs text-text-muted">{label}</p>
      </div>
      <p className="text-lg font-bold text-text-primary">{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${subColor}`}>{sub}</p>}
    </div>
  );
}
