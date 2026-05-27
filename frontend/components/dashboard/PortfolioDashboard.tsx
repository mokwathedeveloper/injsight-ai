"use client";

import * as React from "react";
import { PortfolioChart } from "./PortfolioChart";
import { StatCard } from "./StatCard";
import { DataSourceBadge } from "./DataSourceBadge";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { MOCK_PORTFOLIO_HISTORY } from "@/data/portfolio-mock";
import { 
  ShieldCheck, 
  Layers, 
  Zap, 
  ArrowUpRight 
} from "lucide-react";

interface PortfolioDashboardProps {
  data: WalletAnalysisResult;
}

export function PortfolioDashboard({ data }: PortfolioDashboardProps) {
  // Use mock historical data if this is the whale wallet, otherwise generate a simple one
  const chartData = data.address.includes("whale") 
    ? MOCK_PORTFOLIO_HISTORY["7d"] 
    : MOCK_PORTFOLIO_HISTORY["7d"].map(p => ({
        ...p,
        value: (data.totalValueUsd * (0.9 + Math.random() * 0.2))
      }));

  return (
    <div className="space-y-6">
      {/* Provance & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <DataSourceBadge 
          source={data.address.includes("whale") || data.address.includes("degen") || data.address.includes("farm") ? "Demo Cache" : "Injective Indexer"} 
          lastAnalyzed="2 minutes ago" 
        />
        
        <div className="flex items-center space-x-2 text-[10px] font-bold text-success uppercase tracking-widest bg-success/10 px-3 py-1 rounded-full border border-success/20">
          <ShieldCheck size={12} />
          <span>Security Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-8">
          <PortfolioChart data={chartData} totalValue={data.totalValueUsd} />
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          <StatCard 
            label="Liquid Assets"
            value="35.8%"
            subValue={`${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", compactDisplay: "short", notation: "compact" }).format(data.totalValueUsd * 0.358)} Available`}
            icon={Zap}
            trend={{ value: 2.4, isPositive: true }}
          />
          <StatCard 
            label="Staked Position"
            value="64.2%"
            subValue={`${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", compactDisplay: "short", notation: "compact" }).format(data.totalValueUsd * 0.642)} Earning APR`}
            icon={Layers}
            trend={{ value: 0.8, isPositive: true }}
          />
          <StatCard 
            label="Protocol Exposure"
            value={data.recentTransactionsCount > 100 ? "12" : "3"}
            subValue="Active Contracts"
            icon={ArrowUpRight}
            className="lg:hidden" // Show only on mobile/tablet in the 2-column grid
          />
        </div>
      </div>
      
      {/* Desktop Protocol Counter - Hidden on Mobile */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        <StatCard 
          label="Total Assets"
          value={data.holdings.length}
          subValue="Unique Tokens"
        />
        <StatCard 
          label="Active Protocols"
          value={data.recentTransactionsCount > 100 ? "12" : "3"}
          subValue="Ecosystem Exposure"
        />
        <StatCard 
          label="24h Volume"
          value="$42.5k"
          subValue="Injective Activity"
        />
        <StatCard 
          label="Network"
          value="Mainnet"
          subValue="Injective L1"
        />
      </div>
    </div>
  );
}
