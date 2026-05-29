"use client";

import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { TokenHolding } from "@/hooks/useAnalysis";
import Link from "next/link";

interface Props { address: string; holdings: TokenHolding[]; }

export function TokenBalanceTable({ address, holdings }: Props) {
  if (!holdings.length) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-sm text-text-secondary">No token balances found for this wallet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Token Balances</h3>
          <p className="text-xs text-text-muted">{holdings.length} tokens · {address.slice(0,16)}...</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-2/30">
              {["Token", "Balance", "Value (USD)", "Price", "% of Portfolio"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holdings.map((token) => (
              <tr key={token.symbol + token.denom} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {token.symbol[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{token.symbol}</p>
                      <p className="text-[10px] text-text-muted">{token.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-text-secondary">{token.amount.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-xs font-semibold text-text-primary">{formatCurrency(token.value_usd)}</td>
                <td className="px-5 py-3.5 text-xs text-text-secondary">${token.price.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.min(token.percent, 100)}%` }} />
                    </div>
                    <span className="text-xs text-text-secondary w-8 text-right">{token.percent}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
