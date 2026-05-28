"use client";

import * as React from "react";
import { WatchlistWallet } from "@/types/watchlist";
import { WatchlistStatusBadge } from "./WatchlistStatusBadge";
import { RiskLevelBadge } from "@/components/wallet/RiskLevelBadge";
import { Card } from "@/components/ui/Card";
import { 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  MoreHorizontal,
  Trash2,
  Eye,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

interface WatchlistTableProps {
  wallets: WatchlistWallet[];
  onRemove?: (id: string) => void;
}

export function WatchlistTable({ wallets, onRemove }: WatchlistTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredWallets = wallets.filter(w => 
    w.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Monitored Portfolios</h3>
          <p className="text-[10px] text-text-disabled font-bold uppercase tracking-widest">
            {filteredWallets.length} active monitors
          </p>
        </div>

        <div className="relative max-w-sm w-full">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
           <Input 
             placeholder="Filter watchlist..." 
             className="h-10 pl-10 bg-card border-border-strong text-sm"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-hover/10 border-b border-border/50">
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Asset Group</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Market Value</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">24h Change</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Risk Status</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">System State</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredWallets.map((wallet) => (
              <tr key={wallet.id} className="group hover:bg-hover/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors cursor-pointer">
                      {wallet.label}
                    </span>
                    <code className="text-[10px] font-mono text-text-disabled mt-1">
                      {wallet.address}
                    </code>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-bold text-text-primary font-mono">
                    ${wallet.totalValueUsd.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className={cn(
                     "flex items-center gap-1.5 text-xs font-bold",
                     wallet.change24h >= 0 ? "text-success" : "text-error"
                   )}>
                      {wallet.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{Math.abs(wallet.change24h)}%</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-3">
                      <RiskLevelBadge level={wallet.riskLevel} className="scale-90 origin-left" />
                      <span className="text-xs font-bold font-mono text-text-secondary">{wallet.riskScore}</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <WatchlistStatusBadge status={wallet.status} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/wallets/${wallet.id}`}>
                      <button className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => onRemove?.(wallet.id)}
                      className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-error transition-colors" 
                      title="Untrack"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredWallets.length === 0 && (
          <div className="py-32 text-center space-y-4">
             <div className="w-16 h-16 bg-hover rounded-full flex items-center justify-center mx-auto border border-border">
                <Search size={24} className="text-text-disabled" />
             </div>
             <p className="text-text-secondary text-sm">No portfolios found in your watchlist.</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <p className="text-[9px] text-text-disabled font-bold uppercase tracking-widest flex items-center justify-center gap-2">
           <span>Total Tracked Value: </span>
           <span className="text-text-primary">${wallets.reduce((acc, w) => acc + w.totalValueUsd, 0).toLocaleString()}</span>
        </p>
      </div>
    </Card>
  );
}
