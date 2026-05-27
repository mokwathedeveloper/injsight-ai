"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { RiskDonutChart } from "../risk/RiskDonutChart";
import { RiskFactorList } from "../risk/RiskFactorList";
import { RiskPeerComparison } from "../risk/RiskPeerComparison";
import { RiskMethodology } from "../risk/RiskMethodology";
import { MOCK_RISK_DATA } from "@/data/risk-score-mock";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskScoreCardProps {
  data: WalletAnalysisResult;
}

export function RiskScoreCard({ data }: RiskScoreCardProps) {
  // Map our general analyzer data to the rich risk format
  // In a real app, this would come from a dedicated risk service
  const risk = MOCK_RISK_DATA;

  const getRiskIcon = () => {
    if (data.riskScore < 30) return <ShieldCheck size={18} className="text-success" />;
    if (data.riskScore < 60) return <Shield size={18} className="text-warning" />;
    return <ShieldAlert size={18} className="text-error" />;
  };

  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col relative group">
      {/* Decorative Glow */}
      <div className={cn(
        "absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-10 transition-colors duration-1000",
        data.riskScore < 30 ? "bg-success" : data.riskScore < 60 ? "bg-warning" : "bg-error"
      )} />

      <div className="border-b border-border p-5 bg-hover/30 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2.5">
          {getRiskIcon()}
          <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Risk Assessment</span>
        </div>
        <div className="text-[10px] font-bold text-text-disabled uppercase tracking-tighter">
          v1.4 Engine
        </div>
      </div>
      
      <div className="p-8 space-y-10 flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* Main Chart Section */}
        <div className="flex flex-col items-center space-y-6">
          <RiskDonutChart 
            score={data.riskScore} 
            level={data.riskLevel} 
            className="w-48 h-48"
          />
          <div className="text-center max-w-[240px]">
            <p className="text-xs text-text-secondary leading-relaxed">
              Based on {data.recentTransactionsCount} recent on-chain events and portfolio composition.
            </p>
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="pt-4 border-t border-border/50">
          <RiskPeerComparison 
            walletScore={data.riskScore} 
            averageScore={risk.peerComparison.averageScore} 
            percentile={risk.peerComparison.percentile} 
          />
        </div>

        {/* Factor Breakdown */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-[10px] font-bold text-text-disabled uppercase tracking-widest mb-6">Risk Dimensions</h4>
          <RiskFactorList dimensions={risk.dimensions} />
        </div>

        {/* Methodology */}
        <div className="pt-4">
          <RiskMethodology />
        </div>
      </div>
      
      <div className={cn(
        "p-4 text-[9px] text-center font-bold border-t border-border uppercase tracking-widest",
        data.riskScore < 30 ? "bg-success/5 text-success/70" : data.riskScore < 60 ? "bg-warning/5 text-warning/70" : "bg-error/5 text-error/70"
      )}>
        Security Audit Status: PASS
      </div>
    </Card>
  );
}
