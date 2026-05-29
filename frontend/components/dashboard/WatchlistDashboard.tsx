"use client";

import * as React from "react";
import { WatchlistStats } from "./WatchlistStats";
import { WatchlistTable } from "./WatchlistTable";
import { AddToWatchlistButton } from "./AddToWatchlistButton";
import { MOCK_WATCHLIST_WALLETS, MOCK_WATCHLIST_SUMMARY } from "@/data/watchlist-mock";
import { LayoutGrid, List, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallets, useDeleteWallet, useAlerts } from "@/hooks/useDashboardData";
import { useAuthStore } from "@/store/auth";
import { adaptWatchlistWallet } from "@/lib/api/adapters";

export function WatchlistDashboard() {
  const [wallets, setWallets] = React.useState(MOCK_WATCHLIST_WALLETS);

  const authed = useAuthStore((s) => !!s.accessToken);
  const { data: liveWallets } = useWallets();
  const { data: liveAlerts } = useAlerts();
  const deleteWallet = useDeleteWallet();

  React.useEffect(() => {
    if (liveWallets) setWallets(liveWallets.map(adaptWatchlistWallet));
  }, [liveWallets]);

  const summary = React.useMemo(() => {
    if (!liveWallets) return MOCK_WATCHLIST_SUMMARY;
    const analyzed = wallets.filter((w) => w.riskScore > 0);
    return {
      totalValueUsd: wallets.reduce((s, w) => s + (w.totalValueUsd || 0), 0),
      avgRiskScore: analyzed.length
        ? Math.round(analyzed.reduce((s, w) => s + w.riskScore, 0) / analyzed.length)
        : 0,
      activeAlerts: (liveAlerts ?? []).filter((a) => !a.isRead).length,
      totalWallets: wallets.length,
    };
  }, [liveWallets, liveAlerts, wallets]);

  const handleRemoveWallet = (id: string) => {
    setWallets(wallets.filter(w => w.id !== id));
    if (authed) deleteWallet.mutate(id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Monitor size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Wallet <span className="text-primary">Watchlist</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            Aggregate portfolio monitoring and real-time risk surveillance.
          </p>
        </div>
        
        <AddToWatchlistButton />
      </div>

      {/* Aggregate Stats */}
      <WatchlistStats summary={summary} />

      {/* Main Watchlist Table */}
      <div className="space-y-4">
        <WatchlistTable 
          wallets={wallets} 
          onRemove={handleRemoveWallet} 
        />
        
        <div className="p-6 bg-hover/10 border border-border/50 rounded-2xl">
           <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                 <Monitor size={18} />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Surveillance Engine Active</p>
                 <p className="text-[10px] text-text-secondary leading-relaxed">
                   Your watchlist is currently being monitored for abnormal on-chain activity, 
                   large liquidity outflows, and AI-detected risk events. Notifications will 
                   appear in your <span className="text-primary font-bold cursor-pointer">Alert Center</span>.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
