"use client";

import * as React from "react";
import { PaymentMethod } from "@/types/billing";
import { Card } from "@/components/ui/Card";
import { CreditCard, Wallet, Edit3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  method: PaymentMethod;
}

export function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col group">
      <div className="p-6 md:p-8 border-b border-border bg-hover/10">
        <h3 className="text-sm font-bold text-text-disabled uppercase tracking-widest px-0.5">Payment Method</h3>
        <p className="text-xs text-text-secondary mt-1">Manage your billing information and sources.</p>
      </div>

      <div className="p-8 flex-1 space-y-8">
        <div className="flex items-center justify-between gap-6 p-5 bg-hover/30 rounded-2xl border border-border/50 group-hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-card border border-border rounded-xl text-text-primary">
                {method.type === "card" ? <CreditCard size={24} /> : <Wallet size={24} />}
             </div>
             <div>
                <p className="text-sm font-bold text-text-primary">
                  {method.type === "card" ? `${method.brand} •••• ${method.last4}` : "Injective Wallet"}
                </p>
                <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-1">
                  {method.type === "card" ? `Expires ${method.expiry}` : "Active Pay-with-Wallet"}
                </p>
             </div>
          </div>
          <button className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors border border-transparent hover:border-border">
             <Edit3 size={18} />
          </button>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
           <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
           <p className="text-[10px] text-text-secondary leading-relaxed italic">
             Billing is handled through our secure, PCI-compliant partner. 
             InjSight AI does not store raw credit card details on our servers.
           </p>
        </div>
      </div>

      <div className="p-6 bg-hover/5 border-t border-border/50 flex gap-3">
         <Button variant="secondary" className="flex-1 h-11 font-bold text-xs uppercase tracking-widest border-border-strong">
            Update Method
         </Button>
         <Button variant="secondary" className="flex-1 h-11 font-bold text-xs uppercase tracking-widest border-border-strong">
            Remove
         </Button>
      </div>
    </Card>
  );
}
