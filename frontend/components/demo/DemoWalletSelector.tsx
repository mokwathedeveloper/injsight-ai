"use client";

import * as React from "react";
import { DEMO_WALLETS } from "@/data/demo-wallets";
import { DemoWallet } from "@/types/demo-wallets";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoWalletSelectorProps {
  onSelect: (wallet: DemoWallet) => void;
  selectedWalletId?: string;
  isLoading?: boolean;
}

export function DemoWalletSelector({ onSelect, selectedWalletId, isLoading }: DemoWalletSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEMO_WALLETS.map((wallet) => (
          <Card
            key={wallet.id}
            className={cn(
              "relative cursor-pointer transition-all hover:border-primary/50 group bg-card border-border-strong",
              selectedWalletId === wallet.id ? "border-primary ring-1 ring-primary" : "border-border-strong"
            )}
            onClick={() => !isLoading && onSelect(wallet)}
          >
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                  {wallet.name}
                </h3>
                {selectedWalletId === wallet.id && (
                  <div className="bg-primary rounded-full p-1">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {wallet.description}
              </p>
              <div className="pt-2">
                <code className="text-[10px] bg-bg-page px-2 py-1 rounded text-text-disabled font-mono">
                  {wallet.address}
                </code>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg max-w-2xl mx-auto">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-normal">
          Demo Wallet Mode uses pre-loaded sample data to demonstrate InjSight AI capabilities. 
          No connection to a real wallet is required.
        </p>
      </div>
    </div>
  );
}
