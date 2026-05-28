"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { AIReportCard } from "@/components/analyzer/AIReportCard";
import { RiskScoreCard } from "@/components/analyzer/RiskScoreCard";
import { PortfolioCompositionCard } from "@/components/dashboard/PortfolioCompositionCard";
import { MOCK_REPORTS } from "@/data/reports-mock";
import { DEMO_WALLETS } from "@/data/demo-wallets";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch report by id. For now, use mock whale data.
  const reportHubData = MOCK_REPORTS[0];
  
  // Get full analysis data from the demo wallets (using whale as base)
  const fullData: WalletAnalysisResult = DEMO_WALLETS[0].data;

  return (
    <AppShell>
      <div className="space-y-12 animate-in fade-in duration-700">
        <ReportHeader 
          title={reportHubData.title}
          walletAddress={reportHubData.walletAddress}
          walletLabel={reportHubData.walletLabel}
          date={reportHubData.dateGenerated}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Intelligence Report */}
          <div className="lg:col-span-8">
            <AIReportCard data={fullData} />
          </div>

          {/* Sidebar Insights */}
          <div className="lg:col-span-4 space-y-8 flex flex-col">
            <div className="flex-1">
              <RiskScoreCard data={fullData} />
            </div>
            <div className="flex-1">
               <PortfolioCompositionCard />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-8 border-t border-border/50 text-center space-y-4">
           <p className="text-xs text-text-disabled leading-relaxed max-w-2xl mx-auto">
             This report is a point-in-time snapshot of the Injective ledger. AI insights are generated 
             using our proprietary GPT-4 risk engine. Historical data is retained for comparative analysis.
           </p>
           <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-success" />
                 <span>On-Chain Verified</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 <span>Privacy Shield Active</span>
              </div>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
