import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SharedWallet } from "@/types/team";
import { Wallet } from "lucide-react";

const riskVariant = (level: SharedWallet["riskLevel"]) =>
  level === "Low" ? "success" : level === "Moderate" ? "warning" : "error";

export function TeamWalletCard({ wallet }: { wallet: SharedWallet }) {
  return (
    <Card className="p-5 space-y-4 hover:border-border-strong transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-hover border border-border flex items-center justify-center text-text-secondary">
            <Wallet size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary leading-none">{wallet.label}</p>
            <p className="text-[11px] font-mono text-text-disabled mt-1">{wallet.address.slice(0, 10)}…{wallet.address.slice(-4)}</p>
          </div>
        </div>
        <Badge variant={riskVariant(wallet.riskLevel)}>{wallet.riskLevel}</Badge>
      </div>
      <div className="flex items-end justify-between pt-2 border-t border-border/50">
        <div>
          <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest">Value</p>
          <p className="text-lg font-bold text-text-primary font-mono">${wallet.valueUsd.toLocaleString()}</p>
        </div>
        <p className="text-[10px] text-text-disabled">Added by {wallet.addedBy}</p>
      </div>
    </Card>
  );
}
