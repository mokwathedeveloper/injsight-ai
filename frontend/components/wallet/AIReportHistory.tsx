"use client";

import * as React from "react";
import { AIReportSnapshot } from "@/types/wallet-detail";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  History, 
  ChevronRight, 
  FileText, 
  Brain,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIReportHistoryProps {
  reports: AIReportSnapshot[];
}

export function AIReportHistory({ reports }: AIReportHistoryProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-primary" />
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Intelligence History</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/50">
          {reports.map((report, index) => {
            const date = new Date(report.timestamp);
            
            return (
              <div 
                key={report.id} 
                className="p-6 hover:bg-hover transition-colors cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Brain size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                        AI Analysis Snapshot
                      </div>
                      <div className="text-[10px] text-text-disabled font-medium mt-0.5 uppercase tracking-tighter">
                        {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn(
                      "text-xs font-bold font-mono px-2 py-0.5 rounded border inline-block",
                      report.riskScore < 30 ? "bg-success/10 border-success/20 text-success" :
                      report.riskScore < 60 ? "bg-warning/10 border-warning/20 text-warning" :
                      "bg-error/10 border-error/20 text-error"
                    )}>
                      Score: {report.riskScore}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2 italic">
                  &ldquo;{report.summary}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1 text-[9px] font-bold text-text-disabled uppercase">
                        <TrendingUp size={10} className="text-success" />
                        <span>High Accuracy</span>
                     </div>
                     <div className="flex items-center gap-1 text-[9px] font-bold text-text-disabled uppercase">
                        <FileText size={10} className="text-primary" />
                        <span>PDF Available</span>
                     </div>
                  </div>
                  
                  <button className="flex items-center gap-1.5 text-[9px] font-extrabold text-primary hover:text-primary-hover uppercase tracking-widest group/btn">
                    <span>Full Snapshot</span>
                    <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <button className="w-full py-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors">
          Download Complete Archive
        </button>
      </div>
    </Card>
  );
}
