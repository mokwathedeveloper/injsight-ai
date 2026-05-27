"use client";

import * as React from "react";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { PortfolioDashboard } from "../dashboard/PortfolioDashboard";
import { RiskScoreCard } from "../analyzer/RiskScoreCard";
import { AIReportCard } from "../analyzer/AIReportCard";
import { TokenBalanceTable } from "../table/TokenBalanceTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ChevronRight, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DemoWalletReportProps {
  data: WalletAnalysisResult;
}

export function DemoWalletReport({ data }: DemoWalletReportProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <CheckCircle2 className="text-primary" size={24} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-text-primary tracking-tight">Demo Analysis Complete</h2>
              <Badge variant="secondary" className="text-[10px] h-5 bg-accent/10 text-accent border-accent/20">Demo Mode</Badge>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary mt-1">
              <span className="font-mono text-xs text-text-disabled">{data.address}</span>
              <button className="p-1 hover:bg-hover rounded-md text-text-disabled hover:text-text-primary transition-colors" title="Copy Address">
                <Copy size={12} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link href="/analyze">
            <Button variant="primary" size="sm" className="h-10 px-6 font-bold shadow-lg shadow-primary/20 group">
              <span>Try Real Wallet</span>
              <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top: Portfolio Dashboard (Full Width) */}
        <div className="lg:col-span-12">
          <PortfolioDashboard data={data} />
        </div>

        {/* Left Column: Risk */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          <RiskScoreCard data={data} />
        </div>

        {/* Middle Column: AI Report */}
        <div className="lg:col-span-5 flex flex-col">
          <AIReportCard data={data} />
        </div>

        {/* Right Column: Portfolio & CTA */}
        <div className="lg:col-span-3 space-y-8 flex flex-col">
           {/* Holdings Summary */}
           <Card className="p-0 border-border bg-card overflow-hidden flex-1">
              <div className="p-6 border-b border-border bg-hover/10">
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Demo Holdings</h3>
              </div>
              <div className="p-0">
                {data.holdings.slice(0, 5).map((token, index) => (
                  <div 
                    key={token.id} 
                    className={cn(
                      "flex items-center justify-between p-6 hover:bg-hover/30 transition-colors",
                      index !== Math.min(data.holdings.length, 5) - 1 && "border-b border-border/50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                       <div className="w-9 h-9 rounded-xl bg-hover border border-border flex items-center justify-center text-xs font-bold text-text-primary">
                         {token.symbol[0]}
                       </div>
                       <div>
                         <div className="text-sm font-bold text-text-primary leading-none mb-1">{token.symbol}</div>
                         <div className="text-[10px] text-text-disabled uppercase font-bold tracking-tighter">{token.name}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-bold text-text-primary leading-none mb-1">
                         {token.percentOfPortfolio}%
                       </div>
                       <div className="text-[10px] text-text-secondary font-mono">
                         {token.balance.toLocaleString()}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-hover/20">
                <Link href="/token-balance">
                  <button className="w-full py-2.5 text-[11px] font-bold text-text-secondary hover:text-primary transition-colors flex items-center justify-center space-x-2">
                    <span>Explore Full Portfolio</span>
                    <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
           </Card>

           {/* Landing CTA */}
           <Card className="p-8 border-accent/20 bg-accent/5 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-text-primary tracking-tight">Ready to see yours?</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Connect your real Injective wallet to get personalized intelligence and risk alerts.
                  </p>
                </div>
                <Link href="/analyze" className="block">
                  <Button className="w-full h-11 font-bold text-xs" variant="primary">
                    Analyze Real Wallet
                  </Button>
                </Link>
              </div>
           </Card>
        </div>
      </div>

      {/* Detailed Holdings Section */}
      <div className="pt-8">
        <TokenBalanceTable tokens={data.holdings} />
      </div>
    </div>
  );
}
