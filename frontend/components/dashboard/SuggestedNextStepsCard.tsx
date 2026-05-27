"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { NextStepRow } from "./NextStepRow";
import { SuggestedNextStepsData } from "@/types/next-steps";
import { MOCK_NEXT_STEPS } from "@/data/next-steps-mock";
import { Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestedNextStepsCardProps {
  data?: SuggestedNextStepsData;
  className?: string;
}

export function SuggestedNextStepsCard({ 
  data = MOCK_NEXT_STEPS, 
  className 
}: SuggestedNextStepsCardProps) {
  return (
    <Card className={cn("p-0 border-border bg-card overflow-hidden", className)}>
      <div className="p-8 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Zap size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary tracking-tight">Suggested Next Steps</h3>
            <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-0.5">
              Actionable Intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-4">
        {data.actions.map((action, index) => (
          <NextStepRow key={action.id} action={action} index={index} />
        ))}
      </div>

      <div className="p-6 bg-hover/5 border-t border-border/50">
        <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
          <Info size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-[11px] text-text-secondary leading-relaxed italic">
            <strong>Non-Custodial Notice:</strong> InjSight AI provides intelligence only. 
            All actions are performed on external protocols via your own wallet connection. 
            Always verify transaction details before signing.
          </p>
        </div>
      </div>
    </Card>
  );
}
