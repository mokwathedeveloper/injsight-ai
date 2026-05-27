"use client";

import * as React from "react";
import { WalletActivity, ActivityType } from "@/types/wallet-detail";
import { Card } from "@/components/ui/Card";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Layers, 
  Coins, 
  ExternalLink,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIVITY_CONFIG: Record<ActivityType, { icon: any; color: string; bgColor: string; label: string }> = {
  send: { icon: ArrowUpRight, color: "text-error", bgColor: "bg-error/10", label: "Sent" },
  receive: { icon: ArrowDownLeft, color: "text-success", bgColor: "bg-success/10", label: "Received" },
  swap: { icon: RefreshCcw, color: "text-primary", bgColor: "bg-primary/10", label: "Swapped" },
  stake: { icon: Layers, color: "text-accent", bgColor: "bg-accent/10", label: "Staked" },
  unstake: { icon: Layers, color: "text-warning", bgColor: "bg-warning/10", label: "Unstaked" },
  claim: { icon: Coins, color: "text-success", bgColor: "bg-success/10", label: "Claimed" },
};

interface WalletActivityTimelineProps {
  activity: WalletActivity[];
}

export function WalletActivityTimeline({ activity }: WalletActivityTimelineProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">On-Chain Activity</h3>
        <button className="text-[10px] font-bold text-primary uppercase hover:underline">
          Full History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border/50" />

          {activity.map((item, index) => {
            const config = ACTIVITY_CONFIG[item.type];
            const Icon = config.icon;
            const date = new Date(item.timestamp);

            return (
              <div key={item.id} className="relative flex items-start gap-6 group animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Node */}
                <div className={cn(
                  "relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-card transition-transform group-hover:scale-110",
                  config.bgColor,
                  config.color
                )}>
                  <Icon size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                      {config.label} {item.amount && `${item.amount} ${item.asset}`}
                    </h4>
                    <span className="text-[10px] text-text-disabled font-medium whitespace-nowrap">
                      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    {item.protocol && (
                      <div className="flex items-center gap-1 text-[10px] text-text-secondary">
                        <Layers size={10} className="text-primary" />
                        <span>{item.protocol}</span>
                      </div>
                    )}
                    <a 
                      href={`https://explorer.injective.network/transaction/${item.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] text-text-disabled hover:text-text-primary transition-colors font-mono"
                    >
                      <span>{item.hash}</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <div className={cn("w-1 h-1 rounded-full", item.status === 'success' ? 'bg-success' : 'bg-error')} />
                    <span className="text-[9px] font-bold text-text-disabled uppercase tracking-tighter">
                      {item.status} • {date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <p className="text-[9px] text-text-disabled font-bold uppercase tracking-widest flex items-center justify-center gap-2">
           <Clock size={12} />
           <span>Continuous Ledger Sync Active</span>
        </p>
      </div>
    </Card>
  );
}
