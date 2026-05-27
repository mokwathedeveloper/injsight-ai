import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioSummaryCardProps {
  data: WalletAnalysisResult;
}

export function PortfolioSummaryCard({ data }: PortfolioSummaryCardProps) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.totalValueUsd);

  return (
    <Card className="p-6 bg-card border-border flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-text-secondary">
          <DollarSign size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">Total Portfolio Value</span>
        </div>
        <div className={cn(
          "flex items-center space-x-1 text-sm font-bold",
          data.change24h >= 0 ? "text-success" : "text-error"
        )}>
          {data.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{data.change24h}% (7d)</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold text-text-primary tracking-tight">{formattedValue}</h2>
        <p className="text-xs text-text-disabled font-medium uppercase tracking-widest">
          {data.holdings.length} Assets on Injective
        </p>
      </div>

      <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
        <div className="space-y-1">
           <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Staked Assets</div>
           <div className="text-lg font-bold text-text-primary">64.2%</div>
        </div>
        <div className="space-y-1">
           <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Liquid Assets</div>
           <div className="text-lg font-bold text-text-primary">35.8%</div>
        </div>
      </div>
    </Card>
  );
}
