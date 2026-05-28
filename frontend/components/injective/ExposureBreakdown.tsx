import * as React from "react";
import { ExposureCategory } from "@/types/injective";

export function ExposureBreakdown({ categories }: { categories: ExposureCategory[] }) {
  return (
    <div className="space-y-4">
      {/* Stacked bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden border border-border/50">
        {categories.map((c) => (
          <div key={c.category} style={{ width: `${c.percent}%`, backgroundColor: c.color }} title={`${c.category} ${c.percent}%`} />
        ))}
      </div>
      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.category} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-text-secondary">{c.category}</span>
              <span className="text-[10px] text-text-disabled">({c.tokenCount} {c.tokenCount === 1 ? "token" : "tokens"})</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-text-primary font-mono">{c.percent}%</span>
              <span className="text-[10px] text-text-disabled ml-2 font-mono">${c.valueUsd.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
