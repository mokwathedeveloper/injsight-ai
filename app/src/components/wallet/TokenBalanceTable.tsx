"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

const MOCK_TOKENS = [
  { symbol: "INJ",   name: "Injective",       balance: 2340.5,  valueUsd: 104534.2, priceUsd: 44.67, change24h:  3.2,  pct: 42.1 },
  { symbol: "USDT",  name: "Tether USD",      balance: 70280,   valueUsd: 70280.0,  priceUsd: 1.00,  change24h:  0.01, pct: 28.3 },
  { symbol: "ATOM",  name: "Cosmos Hub",      balance: 2920,    valueUsd: 38762.4,  priceUsd: 13.27, change24h: -1.4,  pct: 15.6 },
  { symbol: "WBTC",  name: "Wrapped Bitcoin", balance: 0.12,    valueUsd: 8290.5,   priceUsd: 69087, change24h:  1.1,  pct: 3.3  },
  { symbol: "ETH",   name: "Ethereum",        balance: 1.9,     valueUsd: 7218.0,   priceUsd: 3799,  change24h:  0.8,  pct: 2.9  },
  { symbol: "TIA",   name: "Celestia",        balance: 2100,    valueUsd: 5880.0,   priceUsd: 2.80,  change24h: -2.3,  pct: 2.4  },
  { symbol: "STINJ", name: "Staked INJ",      balance: 310,     valueUsd: 13485.7,  priceUsd: 43.50, change24h:  3.1,  pct: 5.4  },
];

export function TokenBalanceTable({ address }: { address: string }) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Top Token Balances</h3>
          <p className="text-xs text-text-muted">Live on-chain balances for {address.slice(0, 14)}...</p>
        </div>
        <Link href="#" className="text-xs text-accent hover:underline flex items-center gap-1">
          View All Tokens <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted">Token</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted">Balance</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted">Value (USD)</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted">Price</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted">24h</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-text-muted">% of Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TOKENS.map((token) => (
              <tr key={token.symbol} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
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
                <td className="px-5 py-3.5 text-right text-xs text-text-secondary">
                  {token.balance.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-right text-xs font-semibold text-text-primary">
                  {formatCurrency(token.valueUsd)}
                </td>
                <td className="px-5 py-3.5 text-right text-xs text-text-secondary">
                  ${token.priceUsd.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className={`flex items-center justify-end gap-0.5 text-xs font-semibold ${
                    token.change24h >= 0 ? "text-success" : "text-danger"
                  }`}>
                    {token.change24h >= 0
                      ? <ArrowUpRight className="h-3 w-3" />
                      : <ArrowDownRight className="h-3 w-3" />
                    }
                    {Math.abs(token.change24h).toFixed(1)}%
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-14 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${Math.min(token.pct, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary w-8 text-right">{token.pct}%</span>
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
