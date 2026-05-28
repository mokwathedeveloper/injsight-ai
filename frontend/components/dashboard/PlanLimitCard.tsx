"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { UsageMeter } from "./UsageMeter";
import { PlanUsageData } from "@/types/plan-limits";
import { MOCK_PLAN_USAGE } from "@/data/plan-limits-mock";
import { ShieldCheck, Info, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanLimitCardProps {
  data?: PlanUsageData;
  className?: string;
}

export function PlanLimitCard({ data = MOCK_PLAN_USAGE, className }: PlanLimitCardProps) {
  const formattedDate = new Date(data.resetDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className={cn("p-0 border-border bg-card overflow-hidden", className)}>
      <div className="p-6 md:p-8 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">Plan Usage & Limits</h3>
            <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[9px] font-bold text-primary uppercase">
               {data.planName}
            </div>
          </div>
          <p className="text-xs text-text-secondary">
             Monitor your intelligence consumption and data boundaries.
          </p>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {data.metrics.map((metric) => (
          <UsageMeter 
            key={metric.id}
            label={metric.label}
            current={metric.current}
            limit={metric.limit}
            unit={metric.unit}
          />
        ))}
      </div>

      <div className="p-6 bg-hover/5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-text-disabled">
          <Calendar size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Limits Reset on {formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-medium text-text-secondary italic">
          <Info size={12} className="text-primary" />
          <span>Usage data is cached and synchronized every 15 minutes.</span>
        </div>
      </div>
    </Card>
  );
}
