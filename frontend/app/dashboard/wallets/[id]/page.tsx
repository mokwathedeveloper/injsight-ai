"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { WalletDetailHeader } from "@/components/wallet/WalletDetailHeader";
import { PortfolioDashboard } from "@/components/dashboard/PortfolioDashboard";
import { RiskScoreCard } from "@/components/analyzer/RiskScoreCard";
import { WalletActivityTimeline } from "@/components/wallet/WalletActivityTimeline";
import { AIReportHistory } from "@/components/wallet/AIReportHistory";
import { RiskHistoryList } from "@/components/risk/RiskHistoryList";
import { MOCK_WALLET_DETAIL } from "@/data/wallet-detail-mock";
import { DEMO_WALLETS } from "@/data/demo-wallets";
import { MOCK_RISK_CHANGES } from "@/data/risk-change-mock";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { LayoutGrid, List, History, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WalletDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "activity" | "risk">("overview");

  // In a real app, fetch by id. For now, use mock whale data.
  const wallet = MOCK_WALLET_DETAIL;
  
  // Get full analysis data from the demo wallets (using whale as base)
  const fullData: WalletAnalysisResult = DEMO_WALLETS[0].data;

  const walletRiskChanges = MOCK_RISK_CHANGES.filter(rc => rc.walletId === wallet.id);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "activity", label: "Activity", icon: List },
    { id: "risk", label: "Risk History", icon: ShieldAlert },
  ];

  return (
    <AppShell>
      <div className="space-y-10 animate-in fade-in duration-700">
        <WalletDetailHeader wallet={wallet} />

        {/* Tab Navigation */}
        <div className="flex bg-card border border-border rounded-2xl p-1 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-text-disabled hover:text-text-primary hover:bg-hover"
                )}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === "overview" && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="space-y-6">
                <h2 className="text-xs font-bold text-text-disabled uppercase tracking-[0.2em] px-1">
                  Portfolio Overview
                </h2>
                <PortfolioDashboard data={fullData} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 flex flex-col space-y-8">
                  <RiskScoreCard data={fullData} />
                  <div className="h-[400px]">
                    <AIReportHistory reports={wallet.reportHistory} />
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <WalletActivityTimeline activity={wallet.activity.slice(0, 3)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="animate-in fade-in duration-500 h-[800px]">
              <WalletActivityTimeline activity={wallet.activity} />
            </div>
          )}

          {activeTab === "risk" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
               <div className="lg:col-span-8 h-[700px]">
                  <RiskHistoryList changes={walletRiskChanges} />
               </div>
               <div className="lg:col-span-4 space-y-8">
                  <RiskScoreCard data={fullData} />
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                     <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest mb-4">Risk Drift Engine</p>
                     <p className="text-[10px] text-text-secondary leading-relaxed italic">
                        Our engine continuously monitors this wallet for score drifts of ±5 points. 
                        Critical alerts are generated for changes exceeding 15 points in 24h.
                     </p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
