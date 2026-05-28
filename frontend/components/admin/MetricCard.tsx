import * as React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}

export function MetricCard({ label, value, delta, hint }: MetricCardProps) {
  return (
    <Card className="p-5 space-y-2">
      <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-text-primary tracking-tight">{value}</span>
        {delta !== undefined && (
          <span className={cn("text-xs font-bold", delta >= 0 ? "text-success" : "text-error")}>
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
        )}
      </div>
      {hint && <p className="text-[10px] text-text-disabled uppercase tracking-tight">{hint}</p>}
    </Card>
  );
}
