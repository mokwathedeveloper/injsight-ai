import * as React from "react";
import { Card } from "@/components/ui/Card";
import { CostBreakdown } from "@/types/admin";
import { DollarSign } from "lucide-react";

export function CostCard({ breakdown }: { breakdown: CostBreakdown[] }) {
  const total = breakdown.reduce((s, b) => s + b.amountUsd, 0);
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-warning" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">AI Cost (Today)</h3>
        </div>
        <span className="text-lg font-bold text-text-primary font-mono">${total.toFixed(2)}</span>
      </div>
      <div className="space-y-3">
        {breakdown.map((b) => {
          const pct = Math.round((b.amountUsd / total) * 100);
          return (
            <div key={b.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">{b.label}</span>
                <span className="font-mono text-text-primary">${b.amountUsd.toFixed(2)}</span>
              </div>
              <div className="w-full h-1.5 bg-hover rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
