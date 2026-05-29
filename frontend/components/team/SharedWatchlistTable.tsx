import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SharedWallet } from "@/types/team";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const riskVariant = (level: SharedWallet["riskLevel"]) =>
  level === "Low" ? "success" : level === "Moderate" ? "warning" : "error";

export function SharedWatchlistTable({ wallets }: { wallets: SharedWallet[] }) {
  if (wallets.length === 0) {
    return (
      <Card className="p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-hover border border-border flex items-center justify-center mx-auto text-text-disabled">
          <Eye size={22} />
        </div>
        <p className="text-text-primary font-bold">No shared watchlist yet</p>
        <p className="text-text-secondary text-sm">Add a wallet to monitor it as a team.</p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Shared Watchlist</h3>
        <span className="text-[10px] text-text-disabled uppercase font-bold">{wallets.length} monitored</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Wallet</th>
              <th className="px-6 py-3 font-bold">Added by</th>
              <th className="px-6 py-3 font-bold text-right">Value</th>
              <th className="px-6 py-3 font-bold text-right">Risk</th>
              <th className="px-6 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((w, i) => (
              <tr key={w.id} className={cn("hover:bg-hover/40 transition-colors", i !== wallets.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-text-primary leading-none">{w.label}</p>
                  <p className="text-[11px] font-mono text-text-disabled mt-1">{w.address.slice(0, 12)}…{w.address.slice(-6)}</p>
                </td>
                <td className="px-6 py-4 text-xs text-text-secondary">{w.addedBy}</td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">${w.valueUsd.toLocaleString()}</td>
                <td className="px-6 py-4 text-right"><Badge variant={riskVariant(w.riskLevel)}>{w.riskLevel} · {w.riskScore}</Badge></td>
                <td className="px-6 py-4"><Badge variant="success" className="gap-1"><Eye size={10} /> Monitoring</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
