"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { WalletDetailHeader } from "@/components/wallet/WalletDetailHeader";
import { PortfolioDashboard } from "@/components/dashboard/PortfolioDashboard";
import { RiskScoreCard } from "@/components/analyzer/RiskScoreCard";
import { WalletActivityTimeline } from "@/components/wallet/WalletActivityTimeline";
import { AIReportHistory } from "@/components/wallet/AIReportHistory";
import { MOCK_WALLET_DETAIL } from "@/data/wallet-detail-mock";
import { DEMO_WALLETS } from "@/data/demo-wallets";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";

export default function WalletDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch by id. For now, use mock whale data.
  const wallet = MOCK_WALLET_DETAIL;
  
  // Get full analysis data from the demo wallets (using whale as base)
  const fullData: WalletAnalysisResult = DEMO_WALLETS[0].data;

  return (
    <AppShell>
      <div className="space-y-12 animate-in fade-in duration-700">
        <WalletDetailHeader wallet={wallet} />

        {/* Dashboard Sections */}
        <div className="space-y-12">
          {/* Overview */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-text-disabled uppercase tracking-[0.2em] px-1">
              Portfolio Overview
            </h2>
            <PortfolioDashboard data={fullData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Risk & History */}
            <div className="lg:col-span-4 space-y-8 flex flex-col">
               <div className="flex-1">
                  <RiskScoreCard data={fullData} />
               </div>
               <div className="h-[500px]">
                  <AIReportHistory reports={wallet.reportHistory} />
               </div>
            </div>

            {/* Right Column: Activity */}
            <div className="lg:col-span-8">
              <div className="h-full">
                <WalletActivityTimeline activity={wallet.activity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
