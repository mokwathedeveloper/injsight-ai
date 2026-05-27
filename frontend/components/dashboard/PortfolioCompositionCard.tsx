"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { CompositionDonutChart } from "./CompositionDonutChart";
import { PortfolioComposition } from "@/types/composition";
import { MOCK_COMPOSITION_DATA } from "@/data/composition-mock";
import { PieChart as PieIcon, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCompositionCardProps {
  data?: PortfolioComposition;
  title?: string;
  className?: string;
}

export function PortfolioCompositionCard({ 
  data = MOCK_COMPOSITION_DATA, 
  title = "Portfolio Composition",
  className 
}: PortfolioCompositionCardProps) {
  const [activeTab, setActiveTab] = React.useState<"categories" | "risk">("categories");

  const chartData = activeTab === "categories" ? data.categories : data.riskDistribution;

  return (
    <Card className={cn("p-6 bg-card border-border flex flex-col h-full overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2 text-text-secondary">
          <PieIcon size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">{title}</span>
        </div>
        
        <div className="flex bg-hover rounded-lg p-1 border border-border">
          <button 
            onClick={() => setActiveTab("categories")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold transition-all rounded-md",
              activeTab === "categories" ? "text-primary bg-card shadow-sm" : "text-text-disabled hover:text-text-secondary"
            )}
          >
            Sectors
          </button>
          <button 
            onClick={() => setActiveTab("risk")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold transition-all rounded-md",
              activeTab === "risk" ? "text-primary bg-card shadow-sm" : "text-text-disabled hover:text-text-secondary"
            )}
          >
            Risk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
        {/* Chart Side */}
        <div className="relative aspect-square max-w-[220px] mx-auto w-full">
          <CompositionDonutChart data={chartData} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Total</span>
            <span className="text-xl font-extrabold text-text-primary">100%</span>
          </div>
        </div>

        {/* Legend Side */}
        <div className="space-y-4">
          <div className="space-y-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-text-primary font-mono">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg">
              <ShieldCheck size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-text-secondary leading-normal italic">
                {activeTab === "categories" 
                  ? "Asset distribution based on Injective ecosystem tags and token standards."
                  : "Risk weights calculated from asset volatility, liquidity depth, and protocol status."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
