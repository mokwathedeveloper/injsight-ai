import * as React from "react";
import { cn } from "@/lib/utils";

export interface RiskFactor {
  label: string;
  weight: number;
  level: "low" | "medium" | "high";
}

const LEVEL_COLOR: Record<RiskFactor["level"], string> = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-error",
};

export function RiskBreakdownList({ factors }: { factors: RiskFactor[] }) {
  return (
    <div className="space-y-4">
      {factors.map((f) => (
        <div key={f.label} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">{f.label}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-disabled">{f.level} · {f.weight}%</span>
          </div>
          <div className="w-full h-1.5 bg-hover rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", LEVEL_COLOR[f.level])} style={{ width: `${f.weight}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
