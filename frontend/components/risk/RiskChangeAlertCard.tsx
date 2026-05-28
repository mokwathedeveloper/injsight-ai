"use client";

import * as React from "react";
import { RiskChange } from "@/types/risk-change";
import { RiskDeltaBadge } from "./RiskDeltaBadge";
import { RiskLevelBadge } from "@/components/wallet/RiskLevelBadge";
import { Card } from "@/components/ui/Card";
import { 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Clock,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RiskChangeAlertCardProps {
  change: RiskChange;
}

export function RiskChangeAlertCard({ change }: RiskChangeAlertCardProps) {
  const date = new Date(change.timestamp);

  const getSeverityStyles = () => {
    switch (change.severity) {
      case "critical": return "border-error/40 bg-error/5 shadow-[0_0_30px_rgba(239,68,68,0.05)]";
      case "high": return "border-error/20 bg-error/5";
      case "medium": return "border-warning/20 bg-warning/5";
      default: return "border-primary/20 bg-primary/5";
    }
  };

  return (
    <Card className={cn(
      "p-6 border transition-all duration-300 group hover:scale-[1.01]",
      getSeverityStyles()
    )}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className={cn(
            "p-3 rounded-2xl shrink-0 mt-1",
            change.severity === 'critical' || change.severity === 'high' ? "bg-error/10 text-error" : 
            change.severity === 'medium' ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
          )}>
            <ShieldAlert size={20} className={cn(change.severity === 'critical' && "animate-pulse")} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h4 className="text-sm font-bold text-text-primary">
                Risk Drift Detected
              </h4>
              <RiskDeltaBadge delta={change.delta} />
              <RiskLevelBadge level={change.riskLevel} className="scale-75 origin-left" />
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">
              {change.reason} Previous Score: <span className="font-mono font-bold text-text-primary">{change.previousScore}</span> → 
              Current: <span className="font-mono font-bold text-text-primary">{change.currentScore}</span>
            </p>

            <div className="flex items-center gap-2 text-[9px] text-text-disabled font-bold uppercase tracking-widest pt-1">
               <Clock size={12} />
               <span>Recorded {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link href={`/dashboard/wallets/${change.walletId}`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border-strong rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-primary hover:border-primary transition-all group/btn">
              <span>View Analysis</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
