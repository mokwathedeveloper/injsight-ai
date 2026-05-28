import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskDeltaBadgeProps {
  delta: number;
  className?: string;
}

export function RiskDeltaBadge({ delta, className }: RiskDeltaBadgeProps) {
  if (delta === 0) {
    return (
      <div className={cn("inline-flex items-center gap-1 text-[10px] font-bold text-text-disabled uppercase tracking-widest", className)}>
        <Minus size={12} />
        <span>No Change</span>
      </div>
    );
  }

  const isIncrease = delta > 0;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-widest",
      isIncrease 
        ? "bg-error/10 border-error/20 text-error shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
        : "bg-success/10 border-success/20 text-success shadow-[0_0_10px_rgba(34,197,94,0.1)]",
      className
    )}>
      {isIncrease ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      <span>{isIncrease ? "+" : ""}{delta} Point{Math.abs(delta) !== 1 ? 's' : ''}</span>
    </div>
  );
}
