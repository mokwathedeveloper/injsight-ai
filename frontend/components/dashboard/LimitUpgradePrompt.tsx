"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LimitUpgradePrompt({ className }: { className?: string }) {
  return (
    <Card className={cn("p-0 border-primary/20 bg-primary/5 relative overflow-hidden group", className)}>
      {/* Animated glow background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} className="animate-pulse" />
            <span>Power User Features Available</span>
          </div>
          <h3 className="text-xl font-extrabold text-text-primary tracking-tight">
            Nearing your data limit? <br />
            <span className="text-primary">Unlock deep-chain audits.</span>
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-md">
            Upgrade to Pro for unlimited wallet tracking, priority report generation, 
            and real-time risk drift alerts delivered to your inbox.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
             <div className="flex items-center gap-1.5 text-[9px] font-bold text-text-disabled uppercase">
                <ShieldCheck size={12} className="text-success" />
                <span>Unlimited Log History</span>
             </div>
             <div className="flex items-center gap-1.5 text-[9px] font-bold text-text-disabled uppercase">
                <Zap size={12} className="text-accent fill-accent" />
                <span>Priority Indexer Data</span>
             </div>
          </div>
        </div>

        <div className="shrink-0 space-y-3 w-full md:w-auto">
          <Link href="/pricing" className="block">
            <Button size="lg" className="w-full md:px-10 h-14 font-bold uppercase tracking-widest shadow-xl shadow-primary/20 group/btn transition-all hover:scale-[1.02]">
              <span>Upgrade to Pro</span>
              <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-[10px] text-text-disabled text-center font-medium uppercase tracking-tighter italic">
            Risk-free 7-day trial available for Teams
          </p>
        </div>
      </div>
    </Card>
  );
}
