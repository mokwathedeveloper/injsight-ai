import * as React from "react";
import { WatchlistSummary } from "@/types/watchlist";
import { StatCard } from "@/components/dashboard/StatCard";
import { Wallet, Shield, Bell, BarChart3 } from "lucide-react";

interface WatchlistStatsProps {
  summary: WatchlistSummary;
}

export function WatchlistStats({ summary }: WatchlistStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Tracked Wallets"
        value={summary.totalWallets}
        icon={Wallet}
        subValue="Saved for monitoring"
      />
      <StatCard 
        label="Aggregate Value"
        value={`$${(summary.totalValueUsd / 1000000).toFixed(2)}M`}
        icon={BarChart3}
        subValue="Aggregated balance"
      />
      <StatCard 
        label="Avg Risk Score"
        value={summary.avgRiskScore}
        icon={Shield}
        subValue="Ecosystem percentile: 78%"
      />
      <StatCard 
        label="Critical Alerts"
        value={summary.activeAlerts}
        icon={Bell}
        trend={{ value: 2.1, isPositive: false }}
        subValue="Action required"
      />
    </div>
  );
}
