import * as React from "react";
import { cn } from "@/lib/utils";

interface RiskPeerComparisonProps {
  walletScore: number;
  averageScore: number;
  percentile: number;
}

export function RiskPeerComparison({ walletScore, averageScore, percentile }: RiskPeerComparisonProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Peer Comparison</h4>
        <div className="text-[10px] font-bold text-accent uppercase bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          Top {100 - percentile}% Safer
        </div>
      </div>

      <div className="relative pt-4 pb-2">
        {/* Baseline */}
        <div className="w-full h-1 bg-border rounded-full" />
        
        {/* Average Marker */}
        <div 
          className="absolute top-0 flex flex-col items-center -translate-x-1/2" 
          style={{ left: `${averageScore}%` }}
        >
          <div className="w-px h-6 bg-text-disabled" />
          <span className="text-[8px] font-bold text-text-disabled uppercase mt-1">Avg: {averageScore}</span>
        </div>

        {/* Wallet Marker */}
        <div 
          className="absolute top-0 flex flex-col items-center -translate-x-1/2" 
          style={{ left: `${walletScore}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-primary border-2 border-card ring-2 ring-primary/20" />
          <span className="text-[8px] font-bold text-primary uppercase mt-1">YOU</span>
        </div>
      </div>
      
      <p className="text-[10px] text-text-secondary leading-relaxed italic text-center pt-2">
        This portfolio is {percentile}% safer than the average active Injective wallet.
      </p>
    </div>
  );
}
