"use client";

import Link from "next/link";
import { Star, Plus, TrendingUp, TrendingDown, Bell, RefreshCw } from "lucide-react";
import { Button, EmptyState, ErrorState, CardSkeleton } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";
import { useSavedWallets, useSaveWallet, useDeleteWallet } from "@/hooks/useWallets";
import { useState } from "react";

const riskClasses: Record<string, string> = {
  Low:       "badge-success",
  Moderate:  "badge bg-yellow-400/10 text-yellow-400",
  High:      "badge-warning",
  "Very High": "badge-danger",
};

export function WatchlistView() {
  const { data: wallets, isLoading, isError, refetch } = useSavedWallets();
  const saveMutation   = useSaveWallet();
  const deleteMutation = useDeleteWallet();

  const [showAdd,  setShowAdd]  = useState(false);
  const [newAddr,  setNewAddr]  = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleAdd = () => {
    if (!newAddr.trim()) return;
    saveMutation.mutate(
      { walletAddress: newAddr.trim(), label: newLabel.trim() || undefined },
      {
        onSuccess: () => { setShowAdd(false); setNewAddr(""); setNewLabel(""); },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-text-primary">Watchlist</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load watchlist"
        message="Could not fetch your saved wallets. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Watchlist</h1>
          <p className="text-sm text-text-secondary">
            Monitor wallets of interest — {wallets?.length ?? 0} wallet{wallets?.length !== 1 ? "s" : ""} tracked.
          </p>
        </div>
        <Button variant="accent" size="sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="h-3.5 w-3.5" /> Add Wallet
        </Button>
      </div>

      {/* Add wallet form */}
      {showAdd && (
        <div className="glass-card p-5 border-accent/20 animate-slide-down">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Add to Watchlist</h3>
          <div className="flex gap-3">
            <input
              value={newAddr}
              onChange={(e) => setNewAddr(e.target.value)}
              placeholder="inj1... wallet address"
              className="input-field text-xs font-mono flex-1"
            />
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label (optional)"
              className="input-field text-xs w-40"
            />
            <Button
              variant="accent"
              size="sm"
              onClick={handleAdd}
              loading={saveMutation.isPending}
            >
              Add
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {(!wallets || wallets.length === 0) && (
        <EmptyState
          icon={<Star className="h-8 w-8 text-text-muted" />}
          title="Your watchlist is empty"
          description="Add wallets to monitor their risk levels and get notified about changes."
          action={{ label: "Add Your First Wallet", onClick: () => setShowAdd(true) }}
        />
      )}

      {/* Wallet cards grid */}
      {wallets && wallets.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((w) => {
            const riskLevel = w.riskLevel ?? "Unknown";
            const riskScore = w.riskScore ?? 0;
            const value     = w.totalValueUsd ?? 0;

            return (
              <div key={w.id} className="glass-card-hover p-5">
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                      {(w.label ?? w.address)[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {w.label ?? "Wallet"}
                      </p>
                      <p className="text-[10px] font-mono text-text-muted">
                        {formatAddress(w.address, 6)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/alerts`}>
                        <Bell className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Star className="h-3.5 w-3.5 text-warning" fill="currentColor" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-surface-2 rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted">Portfolio Value</p>
                    <p className="text-sm font-bold text-text-primary mt-0.5">
                      {value > 0 ? formatCurrency(value) : "—"}
                    </p>
                  </div>
                  <div className="bg-surface-2 rounded-lg p-2.5">
                    <p className="text-[10px] text-text-muted">Risk Score</p>
                    <p className={`text-sm font-bold mt-0.5 ${riskLevel === "High" || riskLevel === "Very High" ? "text-warning" : riskLevel === "Low" ? "text-success" : "text-yellow-400"}`}>
                      {riskScore > 0 ? riskScore : "—"}
                    </p>
                  </div>
                </div>

                {/* Risk badge + actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {riskScore > 0 && (
                      <span className={riskClasses[riskLevel] ?? "badge bg-surface-2 text-text-secondary border border-border"}>
                        {riskLevel}
                      </span>
                    )}
                    {!w.lastAnalyzedAt && (
                      <span className="text-[10px] text-text-muted italic">not yet analyzed</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/analyze?address=${w.address}`}>
                        <RefreshCw className="h-3 w-3" /> Analyze
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-danger hover:text-danger"
                      onClick={() => deleteMutation.mutate(w.id)}
                      loading={deleteMutation.isPending}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
