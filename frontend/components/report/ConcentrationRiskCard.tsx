import * as React from "react";
import { cn } from "@/lib/utils";

export interface ConcentrationHolding {
  symbol: string;
  percent: number;
}

export function ConcentrationRiskCard({ holdings, topNPercent }: { holdings: ConcentrationHolding[]; topNPercent: number }) {
  const level = topNPercent >= 80 ? "high" : topNPercent >= 50 ? "medium" : "low";
  const levelColor = level === "high" ? "text-error" : level === "medium" ? "text-warning" : "text-success";

  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-hover/20">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Top-3 Concentration</span>
        <span className={cn("text-sm font-bold font-mono", levelColor)}>{topNPercent}%</span>
      </div>
      <div className="space-y-2">
        {holdings.map((h) => (
          <div key={h.symbol} className="flex items-center gap-3">
            <span className="text-xs font-bold text-text-primary w-14 shrink-0">{h.symbol}</span>
            <div className="flex-1 h-1.5 bg-hover rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${h.percent}%` }} />
            </div>
            <span className="text-[10px] font-mono text-text-secondary w-10 text-right">{h.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
