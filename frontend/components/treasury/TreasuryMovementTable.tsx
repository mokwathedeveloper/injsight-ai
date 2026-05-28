import * as React from "react";
import { Card } from "@/components/ui/Card";
import { TreasuryMovement } from "@/types/treasury";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TreasuryMovementTable({ movements }: { movements: TreasuryMovement[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Movements</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Direction</th>
              <th className="px-6 py-3 font-bold">Token</th>
              <th className="px-6 py-3 font-bold">Counterparty</th>
              <th className="px-6 py-3 font-bold">Date</th>
              <th className="px-6 py-3 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m, i) => {
              const isOut = m.type === "outflow";
              return (
                <tr key={m.id} className={cn("hover:bg-hover/40 transition-colors", i !== movements.length - 1 && "border-b border-border/50")}>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold", isOut ? "text-error" : "text-success")}>
                      {isOut ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                      {isOut ? "Outflow" : "Inflow"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">{m.token}</td>
                  <td className="px-6 py-4 text-xs font-mono text-text-secondary">{m.counterparty}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{m.date}</td>
                  <td className={cn("px-6 py-4 text-sm font-mono text-right font-bold", isOut ? "text-error" : "text-success")}>
                    {isOut ? "-" : "+"}${m.amountUsd.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
