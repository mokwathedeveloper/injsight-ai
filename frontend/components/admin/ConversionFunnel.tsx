import * as React from "react";
import { Card } from "@/components/ui/Card";
import { FunnelStage } from "@/types/admin";

export function ConversionFunnel({ stages }: { stages: FunnelStage[] }) {
  const top = stages[0]?.value ?? 1;
  return (
    <Card className="p-6 space-y-5">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Conversion Funnel</h3>
      <div className="space-y-3">
        {stages.map((s, i) => {
          const pct = Math.round((s.value / top) * 100);
          const prev = i === 0 ? null : stages[i - 1].value;
          const step = prev ? Math.round((s.value / prev) * 100) : 100;
          return (
            <div key={s.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{s.label}</span>
                <span className="font-mono text-text-primary">
                  {s.value.toLocaleString()} <span className="text-text-disabled">({step}%)</span>
                </span>
              </div>
              <div className="w-full h-6 bg-hover rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-end pr-2" style={{ width: `${Math.max(pct, 6)}%` }}>
                  <span className="text-[9px] font-bold text-white/90">{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
