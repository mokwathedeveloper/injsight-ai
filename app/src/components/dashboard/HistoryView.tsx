"use client";

import Link from "next/link";
import { History, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";

const MOCK_HISTORY = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  address: `inj1${"abcdef0123456789".repeat(3).slice(i * 2, i * 2 + 39)}`,
  label: ["My Wallet", "Research #1", "Team Fund", "Monitor", "Watchlist A"][i % 5],
  riskScore: Math.round(20 + Math.random() * 75),
  riskLevel: (["low","medium","high","critical"] as const)[Math.floor(Math.random() * 4)],
  value: Math.round(10000 + Math.random() * 300000),
  analyzedAt: `May ${29 - i}, 2025`,
}));

const riskClasses: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

export function HistoryView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Analysis History</h1>
          <p className="text-sm text-text-secondary">All your previous wallet analyses.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input placeholder="Search history..." className="input-field pl-9 py-2 text-sm w-64" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Wallet", "Risk Score", "Portfolio Value", "Analyzed At", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_HISTORY.map((item) => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{item.label}</p>
                    <p className="text-[10px] font-mono text-text-muted">{formatAddress(item.address, 10)}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{item.riskScore}</span>
                    <span className={riskClasses[item.riskLevel]}>{item.riskLevel}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs font-semibold text-text-primary">{formatCurrency(item.value)}</td>
                <td className="px-5 py-3.5 text-xs text-text-muted">{item.analyzedAt}</td>
                <td className="px-5 py-3.5">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/analyze?address=${item.address}`}>
                      <ExternalLink className="h-3.5 w-3.5" /> View
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
