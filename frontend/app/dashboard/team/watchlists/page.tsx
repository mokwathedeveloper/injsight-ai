"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { TeamWalletCard } from "@/components/team/TeamWalletCard";
import { SharedWatchlistTable } from "@/components/team/SharedWatchlistTable";
import { SharedAlertRules } from "@/components/team/SharedAlertRules";
import { MOCK_SHARED_WALLETS, MOCK_SHARED_ALERT_RULES } from "@/data/team-mock";
import { ArrowLeft, Monitor } from "lucide-react";
import { useWallets } from "@/hooks/useDashboardData";
import { adaptWatchlistWallet } from "@/lib/api/adapters";

export default function SharedWatchlistsPage() {
  const { data: liveWallets } = useWallets();

  const sharedWallets = React.useMemo(
    () =>
      liveWallets
        ? liveWallets.map(adaptWatchlistWallet).map((w) => ({
            id: w.id, label: w.label, address: w.address,
            addedBy: "You", riskScore: w.riskScore, riskLevel: w.riskLevel as any, valueUsd: w.totalValueUsd,
          }))
        : MOCK_SHARED_WALLETS,
    [liveWallets]
  );

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <Link href="/dashboard/team" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Workspace</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Monitor size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Shared <span className="text-primary">Watchlists</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Wallets and alert rules monitored collaboratively by your team.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-text-disabled uppercase tracking-widest px-1">Quick View</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedWallets.map((w) => (
              <TeamWalletCard key={w.id} wallet={w} />
            ))}
          </div>
        </div>

        <SharedWatchlistTable wallets={sharedWallets} />

        <SharedAlertRules rules={MOCK_SHARED_ALERT_RULES} />
      </div>
    </AppShell>
  );
}
