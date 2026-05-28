"use client";

import * as React from "react";
import { PricingTierData } from "@/types/pricing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PricingCardProps {
  plan: PricingTierData;
  isYearly: boolean;
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const price = isYearly ? plan.priceYearly : plan.priceMonthly;

  return (
    <Card className={cn(
      "relative flex flex-col p-8 transition-all duration-500 group overflow-hidden",
      plan.highlighted 
        ? "border-primary/50 bg-primary/[0.02] shadow-[0_0_50px_rgba(0,102,255,0.1)] scale-105 z-10" 
        : "border-border bg-card hover:border-border-strong"
    )}>
      {/* Popular Badge */}
      {plan.highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-6 py-1.5 rotate-45 translate-x-5 translate-y-2 shadow-lg">
            Popular
          </div>
        </div>
      )}

      {/* Decorative Glow for highlighted */}
      {plan.highlighted && (
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
      )}

      <div className="relative z-10 flex-1 space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors">
            {plan.name}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {plan.description}
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-text-primary tracking-tighter">
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {typeof price === "number" && (
            <span className="text-text-disabled font-bold text-sm uppercase tracking-widest">
              / mo
            </span>
          )}
        </div>

        <div className="space-y-4">
          <Link href="/signup" className="block">
            <Button 
              variant={plan.highlighted ? "primary" : "secondary"} 
              className={cn(
                "w-full h-12 font-bold text-xs uppercase tracking-widest group/btn",
                !plan.highlighted && "border-border-strong"
              )}
            >
              <span>{plan.ctaLabel}</span>
              <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <div className="space-y-3.5 pt-4">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={cn(
                  "mt-0.5 shrink-0 rounded-full p-0.5",
                  feature.included ? "text-success bg-success/10" : "text-text-disabled bg-hover"
                )}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    feature.included ? "text-text-secondary group-hover:text-text-primary" : "text-text-disabled line-through opacity-50"
                  )}>
                    {feature.name}
                  </span>
                  {feature.isNew && (
                    <Badge variant="price" className="px-1.5 py-0 text-[8px] h-4 bg-accent/20 border-accent/30">
                      <Sparkles size={8} className="mr-1" />
                      NEW
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) {
   return (
     <div className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold transition-colors", className)}>
        {children}
     </div>
   );
}
