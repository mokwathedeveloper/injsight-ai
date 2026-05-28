"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AIReportCard } from "@/components/analyzer/AIReportCard";
import { RiskScoreCard } from "@/components/analyzer/RiskScoreCard";
import { PortfolioCompositionCard } from "@/components/dashboard/PortfolioCompositionCard";
import { ReadOnlySafetyNotice } from "@/components/analyzer/ReadOnlySafetyNotice";
import { SecurityBadgeGroup } from "@/components/ui/SecurityBadgeGroup";
import { DEMO_WALLETS } from "@/data/demo-wallets";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PublicReportPage({ params }: { params: { id: string } }) {
  // In a real app, fetch the public report by the short-id.
  // For demo purposes, we'll show the whale data.
  const fullData: WalletAnalysisResult = DEMO_WALLETS[0].data;

  return (
    <div className="min-h-screen bg-page text-text-primary">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-page/80 backdrop-blur-md border-b border-border h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={32} height={32} />
                <span className="text-xl font-bold tracking-tight">InjSight AI</span>
             </Link>
             <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <Globe size={12} className="text-primary" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Public Report</span>
             </div>
          </div>

          <Link href="/signup">
             <Button variant="primary" size="sm" className="font-bold text-[10px] uppercase tracking-widest h-10 px-6">
                Analyze your own wallet
                <ArrowRight size={14} className="ml-2" />
             </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Title Section */}
        <div className="space-y-4">
           <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
             Intelligence Snapshot: <span className="text-primary">Whale Portfolio</span>
           </h1>
           <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="font-mono text-xs bg-hover/50 px-2 py-0.5 rounded border border-border/50">
                {fullData.address}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Snapshot taken on May 27, 2026</span>
           </div>
           <SecurityBadgeGroup className="pt-2" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <AIReportCard data={fullData} />
          </div>
          <div className="lg:col-span-4 space-y-8 flex flex-col">
            <RiskScoreCard data={fullData} />
            <PortfolioCompositionCard title="Asset Breakdown" />
          </div>
        </div>

        {/* Call to Action & Safety */}
        <div className="space-y-8 pt-12 border-t border-border/50">
           <div className="max-w-4xl mx-auto">
              <ReadOnlySafetyNotice />
           </div>

           <div className="text-center space-y-6 bg-primary/5 border border-primary/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-4">
                 <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">
                    Want deep-chain intelligence for your assets?
                 </h2>
                 <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
                    InjSight AI provides continuous monitoring, risk alerts, and automated yield strategy suggestions 
                    for your Injective portfolios.
                 </p>
                 <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup">
                       <Button size="lg" className="h-14 px-10 font-bold uppercase tracking-widest shadow-xl shadow-primary/20">
                          Create Free Account
                       </Button>
                    </Link>
                    <Link href="/demo">
                       <Button variant="secondary" size="lg" className="h-14 px-10 font-bold uppercase tracking-widest border-border-strong">
                          Try Live Demo
                       </Button>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-12 bg-hover/10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-text-disabled font-bold uppercase tracking-widest text-[10px]">
               <ShieldCheck size={14} className="text-success" />
               <span>On-Chain Verified Report • Generated by InjSight AI v1.4</span>
            </div>
            <p className="text-[10px] text-text-disabled leading-relaxed max-w-2xl mx-auto">
               Intelligence snapshots are point-in-time and subject to market volatility. 
               All data is read from the public Injective ledger. AI insights are for informational 
               purposes and do not constitute financial advice.
            </p>
         </div>
      </footer>
    </div>
  );
}
