import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SharedWallet } from "@/types/team";
import { cn } from "@/lib/utils";

const riskVariant = (level: SharedWallet["riskLevel"]) =>
  level === "Low" ? "success" : level === "Moderate" ? "warning" : "error";

export function SharedWalletsTable({ wallets }: { wallets: SharedWallet[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Shared Wallets</h3>
        <span className="text-[10px] text-text-disabled uppercase font-bold">{wallets.length} wallets</span>
      </div>

      {wallets.length === 0 ? (
        <div className="p-12 text-center text-text-secondary text-sm">No wallets shared with this workspace yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
                <th className="px-6 py-3 font-bold">Label</th>
                <th className="px-6 py-3 font-bold">Address</th>
                <th className="px-6 py-3 font-bold">Added by</th>
                <th className="px-6 py-3 font-bold text-right">Value</th>
                <th className="px-6 py-3 font-bold text-right">Risk</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((w, i) => (
                <tr key={w.id} className={cn("hover:bg-hover/40 transition-colors", i !== wallets.length - 1 && "border-b border-border/50")}>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">{w.label}</td>
                  <td className="px-6 py-4 text-xs font-mono text-text-secondary">{w.address.slice(0, 12)}…{w.address.slice(-6)}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{w.addedBy}</td>
                  <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">${w.valueUsd.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={riskVariant(w.riskLevel)}>{w.riskLevel} · {w.riskScore}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
