import * as React from "react";
import { HelpCircle } from "lucide-react";

export function RiskMethodology() {
  return (
    <div className="flex items-start gap-3 p-4 bg-hover/20 border border-border/50 rounded-xl">
      <HelpCircle size={16} className="text-text-disabled shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">
          Risk Methodology
        </p>
        <p className="text-[10px] text-text-secondary leading-relaxed">
          The InjSight Risk Score is a composite metric (0-100) where lower is safer. 
          It evaluates asset concentration, smart contract maturity, historical 
          volatility, and on-chain liquidity depth. Our AI engine weights these 
          dimensions against current Injective market conditions to provide a 
          real-time safety assessment.
        </p>
      </div>
    </div>
  );
}
