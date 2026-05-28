import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerBoxProps {
  variant?: "default" | "compact";
  className?: string;
}

export function DisclaimerBox({ variant = "default", className }: DisclaimerBoxProps) {
  if (variant === "compact") {
    return (
      <p className={cn("text-[10px] text-text-disabled italic leading-relaxed", className)}>
        Informational only — not financial, investment, or legal advice. Always do your own research.
      </p>
    );
  }
  return (
    <div className={cn("flex items-start gap-3 p-4 bg-hover/30 border border-border/50 rounded-xl", className)}>
      <Info size={16} className="text-text-disabled shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Financial Disclaimer</p>
        <p className="text-[10px] text-text-disabled leading-relaxed italic">
          InjSight AI is an informational analytics tool. Nothing here constitutes financial, investment, trading, or
          legal advice. AI-generated insights are based on public on-chain data, may contain errors, and should never be
          your sole basis for a decision. Always do your own research (DYOR).
        </p>
      </div>
    </div>
  );
}
