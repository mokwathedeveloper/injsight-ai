"use client";

import { Star, Plus, TrendingUp, TrendingDown, Bell } from "lucide-react";
import { Button } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";

const MOCK_WATCHLIST = [
  { address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "Whale #1",     riskScore: 72, riskLevel: "high",   value: 1240000, change7d:  5.2 },
  { address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "DeFi Trader", riskScore: 45, riskLevel: "medium", value: 87500,   change7d: -2.1 },
  { address: "inj1xyz4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "Ecosystem VC", riskScore: 22, riskLevel: "low",   value: 8900000, change7d:  12.8 },
];

const riskClasses: Record<string, string> = {
  low:    "badge-success",
  medium: "badge bg-yellow-400/10 text-yellow-400",
  high:   "badge-warning",
};

export function WatchlistView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Watchlist</h1>
          <p className="text-sm text-text-secondary">Monitor wallets of interest without saving them.</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Add to Watchlist
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_WATCHLIST.map((w) => (
          <div key={w.address} className="glass-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                  {w.label[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{w.label}</p>
                  <p className="text-[10px] font-mono text-text-muted">{formatAddress(w.address, 6)}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Bell className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-surface-2 rounded-lg p-2.5">
                <p className="text-[10px] text-text-muted">Portfolio Value</p>
                <p className="text-sm font-bold text-text-primary mt-0.5">{formatCurrency(w.value)}</p>
              </div>
              <div className="bg-surface-2 rounded-lg p-2.5">
                <p className="text-[10px] text-text-muted">7-Day Change</p>
                <p className={`text-sm font-bold mt-0.5 flex items-center gap-1 ${w.change7d >= 0 ? "text-success" : "text-danger"}`}>
                  {w.change7d >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {w.change7d > 0 ? "+" : ""}{w.change7d}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-text-primary">{w.riskScore}</span>
                <span className={riskClasses[w.riskLevel]}>{w.riskLevel}</span>
              </div>
              <Button variant="ghost" size="sm">View Analysis →</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
