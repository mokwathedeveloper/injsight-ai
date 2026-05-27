"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function QuickAnalyzeCard() {
  const [address, setAddress] = React.useState("");

  return (
    <Card className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden group h-full flex flex-col justify-center">
      {/* Animated glow background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Zap size={18} className="fill-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Priority Engine</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary tracking-tight">Analyze Any Wallet</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Get instant AI intelligence, risk scores, and portfolio breakdowns for any Injective address.
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
            <Input 
              placeholder="Paste inj1... address" 
              className="h-12 pl-10 bg-card border-border-strong text-sm font-mono"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Link href="/analyze" className="block">
            <Button className="w-full h-12 font-bold text-sm" variant="primary" disabled={!address}>
              Run AI Analysis
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
           <div className="flex items-center gap-1 text-[9px] font-bold text-text-disabled uppercase">
             <ShieldCheck size={12} className="text-success" />
             <span>Read-Only</span>
           </div>
           <div className="flex items-center gap-1 text-[9px] font-bold text-text-disabled uppercase">
             <ShieldCheck size={12} className="text-success" />
             <span>No Secrets</span>
           </div>
        </div>
      </div>
    </Card>
  );
}
