"use client";

import * as React from "react";
import { RiskChange } from "@/types/risk-change";
import { Card } from "@/components/ui/Card";
import { RiskDeltaBadge } from "./RiskDeltaBadge";
import { RiskLevelBadge } from "@/components/wallet/RiskLevelBadge";
import { History, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskHistoryListProps {
  changes: RiskChange[];
}

export function RiskHistoryList({ changes }: RiskHistoryListProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-primary" />
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Risk Evolution</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/50">
          {changes.map((change, index) => {
            const date = new Date(change.timestamp);
            
            return (
              <div 
                key={change.id} 
                className="p-6 hover:bg-hover/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-hover border border-border rounded-lg text-text-disabled">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="text-[10px] text-text-disabled font-bold uppercase tracking-widest">
                          {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                            Intelligence Update
                          </span>
                          <RiskDeltaBadge delta={change.delta} className="scale-75 origin-left" />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-text-secondary leading-relaxed italic">
                      &ldquo;{change.reason}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                       <RiskLevelBadge level={change.riskLevel} className="scale-[0.7] origin-left" />
                       <div className="text-[10px] font-mono text-text-disabled">
                          Score: {change.previousScore} → {change.currentScore}
                       </div>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-hover rounded-lg text-text-disabled group-hover:text-primary transition-colors self-center">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <p className="text-[9px] text-text-disabled font-bold uppercase tracking-widest">
          Risk profiling v1.4 • High Precision
        </p>
      </div>
    </Card>
  );
}
