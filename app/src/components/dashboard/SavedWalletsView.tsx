"use client";

import Link from "next/link";
import { Plus, Search, Star, Trash2, ExternalLink, AlertTriangle } from "lucide-react";
import { Button, Badge, EmptyState } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";

const MOCK_WALLETS = [
  { id: "1", address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "My Wallet",    chain: "injective", riskScore: 72, riskLevel: "high",     totalValueUsd: 104032, lastAnalyzedAt: "May 29, 2025" },
  { id: "2", address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "Research #1", chain: "injective", riskScore: 43, riskLevel: "medium",   totalValueUsd: 87901,  lastAnalyzedAt: "May 28, 2025" },
  { id: "3", address: "inj1xyz4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "Team Fund",   chain: "injective", riskScore: 28, riskLevel: "low",       totalValueUsd: 12480,  lastAnalyzedAt: "May 27, 2025" },
  { id: "4", address: "inj1abc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b", label: "Monitor",     chain: "injective", riskScore: 81, riskLevel: "critical",  totalValueUsd: 321507, lastAnalyzedAt: "May 26, 2025" },
];

const riskClasses: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

export function SavedWalletsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Saved Wallets</h1>
          <p className="text-sm text-text-secondary">Manage and monitor your tracked Injective wallets.</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Add Wallet
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input placeholder="Search wallets..." className="input-field pl-9 py-2 text-sm" />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Wallet", "Chain", "Risk Score", "Portfolio Value", "Last Analyzed", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_WALLETS.map((w) => (
              <tr key={w.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-[10px] font-bold text-white">
                      {w.label[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{w.label}</p>
                      <p className="text-[10px] font-mono text-text-muted">{formatAddress(w.address, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="badge-primary capitalize">{w.chain}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{w.riskScore}</span>
                    <span className={riskClasses[w.riskLevel]}>{w.riskLevel}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-text-primary font-semibold">{formatCurrency(w.totalValueUsd)}</td>
                <td className="px-5 py-3.5 text-xs text-text-muted">{w.lastAnalyzedAt}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/analyze?address=${w.address}`}><ExternalLink className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Star className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-danger hover:text-danger">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
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
