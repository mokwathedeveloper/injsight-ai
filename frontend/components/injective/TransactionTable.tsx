import * as React from "react";
import { Card } from "@/components/ui/Card";
import { MovementBadge } from "./MovementBadge";
import { InjectiveTransaction } from "@/types/injective";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<InjectiveTransaction["type"], string> = {
  send: "Sent", receive: "Received", swap: "Swapped", stake: "Staked", unstake: "Unstaked", claim: "Claimed",
};

export function TransactionTable({ transactions }: { transactions: InjectiveTransaction[] }) {
  if (transactions.length === 0) {
    return <Card className="p-12 text-center text-text-secondary text-sm">No transactions found for this wallet.</Card>;
  }
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Transaction Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Type</th>
              <th className="px-6 py-3 font-bold">Asset</th>
              <th className="px-6 py-3 font-bold">Counterparty</th>
              <th className="px-6 py-3 font-bold text-right">Value</th>
              <th className="px-6 py-3 font-bold">Movement</th>
              <th className="px-6 py-3 font-bold text-right">Tx</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={tx.id} className={cn("hover:bg-hover/40 transition-colors", i !== transactions.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4 text-sm font-bold text-text-primary">{TYPE_LABEL[tx.type]}</td>
                <td className="px-6 py-4 text-sm text-text-secondary font-mono">{tx.amount.toLocaleString()} {tx.asset}</td>
                <td className="px-6 py-4 text-xs text-text-secondary">{tx.counterparty}</td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">${tx.valueUsd.toLocaleString()}</td>
                <td className="px-6 py-4"><MovementBadge isLarge={tx.isLarge} /></td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://explorer.injective.network/transaction/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-text-disabled hover:text-primary transition-colors"
                  >
                    {tx.hash} <ExternalLink size={11} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
