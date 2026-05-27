import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Brain, PieChart, ShieldAlert } from "lucide-react";

export function WalletAnalyzerPreview() {
  return (
    <Card className="p-0 overflow-hidden border-border-strong bg-[#0F1419]/80 backdrop-blur-md shadow-2xl">
      <div className="border-b border-border p-4 bg-hover/50 flex justify-between items-center">
        <span className="text-sm font-semibold text-text-primary">Wallet Intelligence Preview</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-error/40" />
          <div className="w-3 h-3 rounded-full bg-warning/40" />
          <div className="w-3 h-3 rounded-full bg-success/40" />
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Risk Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Overall Risk Score</span>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-[10px] border-border flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-text-primary">72</span>
                <span className="text-[10px] font-bold text-error uppercase tracking-tighter">High Risk</span>
              </div>
              {/* Svg Donut overlay (visual only) */}
              <svg className="absolute w-32 h-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="57"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="358"
                  strokeDashoffset="100"
                  className="text-error"
                />
              </svg>
            </div>
            <div className="space-y-3 pt-2">
              <RiskBar label="Concentration Risk" score={85} color="bg-error" />
              <RiskBar label="Volatility Risk" score={65} color="bg-warning" />
              <RiskBar label="Diversification" score={40} color="bg-primary" />
              <RiskBar label="Activity Risk" score={55} color="bg-accent" />
              <RiskBar label="Stablecoin Buffer" score={30} color="bg-error" />
            </div>
          </div>

          {/* Portfolio Composition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Portfolio Composition</span>
            </div>
            <div className="flex items-center space-x-6">
               <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full border-[12px] border-primary" />
                  <div className="absolute inset-0 rounded-full border-[12px] border-accent border-l-transparent border-b-transparent border-r-transparent rotate-[45deg]" />
                  <div className="absolute inset-2 bg-card rounded-full flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">$248k</span>
                    <span className="text-[8px] text-text-disabled">Total USD</span>
                  </div>
               </div>
               <div className="flex-1 space-y-2">
                 <TokenLegent label="INJ" percent="42.6%" color="bg-primary" />
                 <TokenLegent label="USDT" percent="20.1%" color="bg-accent" />
                 <TokenLegent label="USDC" percent="14.8%" color="bg-[#8B5CF6]" />
                 <TokenLegent label="ETH" percent="8.7%" color="bg-success" />
                 <TokenLegent label="Others" percent="13.8%" color="bg-text-disabled" />
               </div>
            </div>
            
            <div className="pt-4 border-t border-border mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain size={14} className="text-accent" />
                <span className="text-[10px] font-bold text-accent uppercase">AI Insight Preview</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed italic">
                &quot;This wallet shows high exposure to INJ (42.6%) which increases concentration risk. Stablecoin buffer is moderate at 20%...&quot;
              </p>
              <button className="text-[10px] text-primary hover:underline mt-2 inline-block font-bold">View Full Report →</button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RiskBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-medium text-text-secondary">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="h-1 w-full bg-border rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function TokenLegent({ label, percent, color }: { label: string; percent: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-text-secondary">{label}</span>
      </div>
      <span className="text-text-primary font-medium">{percent}</span>
    </div>
  );
}
