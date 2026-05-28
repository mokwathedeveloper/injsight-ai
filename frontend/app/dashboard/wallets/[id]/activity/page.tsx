"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { FetchStatusCard } from "@/components/injective/FetchStatusCard";
import { TransactionTable } from "@/components/injective/TransactionTable";
import { MarketContextCard } from "@/components/injective/MarketContextCard";
import { EcosystemExposureCard } from "@/components/injective/EcosystemExposureCard";
import { WalletActivityTimeline } from "@/components/wallet/WalletActivityTimeline";
import { MOCK_TRANSACTIONS, MOCK_MARKET_ASSETS, MOCK_ECOSYSTEM_EXPOSURE } from "@/data/injective-mock";
import { WalletActivity } from "@/types/wallet-detail";
import { ArrowLeft, Activity } from "lucide-react";

const TIMELINE: WalletActivity[] = MOCK_TRANSACTIONS.map((tx) => ({
  id: tx.id,
  type: tx.type,
  hash: tx.hash,
  amount: tx.amount,
  asset: tx.asset,
  timestamp: tx.timestamp,
  status: "success",
  protocol: tx.counterparty.includes("Helix") ? "Helix" : undefined,
}));

export default function WalletActivityPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <Link href={`/dashboard/wallets/${params.id}`} className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Wallet</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Activity size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Transaction <span className="text-primary">Activity</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Transfers, DeFi activity, and large movements — enriched with market context.</p>
        </div>

        <FetchStatusCard status="success" lastSync="2 minutes ago" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TransactionTable transactions={MOCK_TRANSACTIONS} />
            <MarketContextCard assets={MOCK_MARKET_ASSETS} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <EcosystemExposureCard categories={MOCK_ECOSYSTEM_EXPOSURE} />
            <div className="h-[480px]">
              <WalletActivityTimeline activity={TIMELINE} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
