"use client";

import * as React from "react";
import { PricingCard } from "./PricingCard";
import { PRICING_PLANS } from "@/data/pricing-data";
import { cn } from "@/lib/utils";

export function PricingTiers() {
  const [isYearly, setIsYearly] = React.useState(true);

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* Toggle */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 bg-hover/20 p-1.5 rounded-2xl border border-border">
          <button 
            onClick={() => setIsYearly(false)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              !isYearly ? "bg-card text-text-primary shadow-lg border border-border-strong" : "text-text-disabled hover:text-text-secondary"
            )}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={cn(
              "relative px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              isYearly ? "bg-card text-text-primary shadow-lg border border-border-strong" : "text-text-disabled hover:text-text-secondary"
            )}
          >
            Yearly
            <span className="absolute -top-3 -right-6 bg-success/20 text-success text-[8px] px-2 py-0.5 rounded-full border border-success/30 animate-bounce">
               SAVE 20%
            </span>
          </button>
        </div>
        <p className="text-[10px] text-text-disabled uppercase font-bold tracking-[0.2em]">
           Simple, transparent pricing for every scale
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {PRICING_PLANS.map((plan) => (
          <PricingCard 
            key={plan.id} 
            plan={plan} 
            isYearly={isYearly} 
          />
        ))}
      </div>
    </div>
  );
}
