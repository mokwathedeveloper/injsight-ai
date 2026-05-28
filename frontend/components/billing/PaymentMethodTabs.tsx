"use client";

import * as React from "react";
import { CreditCard, Coins } from "lucide-react";
import { PaymentMethodType } from "@/types/payments";
import { cn } from "@/lib/utils";

interface PaymentMethodTabsProps {
  value: PaymentMethodType;
  onChange: (value: PaymentMethodType) => void;
}

const TABS: { id: PaymentMethodType; label: string; icon: React.ElementType }[] = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "crypto", label: "Crypto (INJ)", icon: Coins },
];

export function PaymentMethodTabs({ value, onChange }: PaymentMethodTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-hover/40 border border-border rounded-xl" role="tablist">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = value === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center justify-center gap-2 h-11 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
              active
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-secondary hover:text-text-primary hover:bg-hover"
            )}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
