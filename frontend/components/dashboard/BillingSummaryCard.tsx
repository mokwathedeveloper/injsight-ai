"use client";

import * as React from "react";
import { BillingSummary } from "@/types/billing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BillingSummaryCardProps {
  summary: BillingSummary;
}

export function BillingSummaryCard({ summary }: BillingSummaryCardProps) {
  const nextBilling = new Date(summary.nextBillingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col group">
      <div className="p-6 md:p-8 border-b border-border bg-hover/10 flex items-center justify-between relative overflow-hidden">
        {/* Success Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="space-y-1 relative z-10">
          <h3 className="text-sm font-bold text-text-disabled uppercase tracking-widest px-0.5">Current Subscription</h3>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">{summary.planName}</h2>
             <Badge variant="success" className="bg-success/10 text-success border-success/20 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                {summary.status.replace('_', ' ')}
             </Badge>
          </div>
        </div>
      </div>

      <div className="p-8 flex-1 space-y-8 relative z-10">
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-1">
              <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-0.5">Price</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-extrabold text-text-primary tracking-tight">${summary.amount.toFixed(2)}</span>
                 <span className="text-[10px] text-text-disabled font-bold uppercase tracking-widest">/ {summary.cycle.replace('ly', '')}</span>
              </div>
           </div>
           <div className="space-y-1 text-right">
              <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-0.5">Cycle</p>
              <div className="text-sm font-bold text-text-primary uppercase tracking-widest pt-1.5">
                 {summary.cycle}
              </div>
           </div>
        </div>

        <div className="p-4 bg-hover/20 rounded-2xl border border-border/50 flex items-center gap-4">
           <div className="p-2 bg-card border border-border rounded-lg text-text-secondary">
              <Calendar size={18} />
           </div>
           <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Next Billing Date</p>
              <p className="text-sm font-bold text-text-primary">{nextBilling}</p>
           </div>
        </div>
      </div>

      <div className="p-6 bg-hover/5 border-t border-border/50">
         <Link href="/pricing" className="block">
            <Button variant="secondary" className="w-full h-11 font-bold text-xs uppercase tracking-widest border-border-strong group/btn">
               <span>Change Plan</span>
               <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
         </Link>
      </div>
    </Card>
  );
}
