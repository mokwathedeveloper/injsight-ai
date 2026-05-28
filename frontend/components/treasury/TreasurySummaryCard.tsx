import * as React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TreasurySummary } from "@/types/treasury";
import { Landmark, Wallet, TrendingDown, ArrowDownRight } from "lucide-react";

export function TreasurySummaryCard({ summary }: { summary: TreasurySummary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Treasury Value" value={`$${(summary.totalValueUsd / 1_000_000).toFixed(2)}M`} icon={Landmark} subValue="Across all wallets" />
      <StatCard label="Treasury Wallets" value={summary.walletCount} icon={Wallet} subValue="Monitored" />
      <StatCard
        label="7-Day Change"
        value={`${summary.weeklyChangePct > 0 ? "+" : ""}${summary.weeklyChangePct}%`}
        icon={TrendingDown}
        trend={{ value: Math.abs(summary.weeklyChangePct), isPositive: summary.weeklyChangePct >= 0 }}
        subValue="Net movement"
      />
      <StatCard label="Largest Outflow" value={`$${(summary.largestOutflowUsd / 1000).toFixed(0)}k`} icon={ArrowDownRight} subValue="This week" />
    </div>
  );
}
