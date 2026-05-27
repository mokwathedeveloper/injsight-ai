"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { Brain, Sparkles, AlertTriangle, ChevronRight } from "lucide-react";
import { AIReportSection } from "../report/AIReportSection";
import { AIObservationList } from "../report/AIObservationList";
import { AIReportDisclaimer } from "../report/AIReportDisclaimer";
import { MOCK_AI_REPORT } from "@/data/ai-report-mock";
import { cn } from "@/lib/utils";

interface AIReportCardProps {
  data: WalletAnalysisResult;
}

export function AIReportCard({ data }: AIReportCardProps) {
  // In a real app, we would fetch or generate this based on 'data.address'
  // For now, we use the high-fidelity mock report
  const report = MOCK_AI_REPORT;

  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="border-b border-border p-5 bg-hover/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Brain size={20} className="text-accent" />
          </div>
          <span className="text-sm font-bold text-text-primary uppercase tracking-widest">AI Intelligence Report</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-success/10 border border-success/20 rounded-full">
           <Sparkles size={10} className="text-success" />
           <span className="text-[9px] font-bold text-success uppercase">GPT-4 Turbo</span>
        </div>
      </div>
      
      <div className="p-8 space-y-10 flex-1 overflow-y-auto custom-scrollbar">
        {/* Summary Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <AIReportSection 
            title={report.summary.title} 
            content={report.summary.content}
          >
            <AIObservationList observations={report.summary.observations} />
          </AIReportSection>
        </div>

        {/* Risk Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <AIReportSection 
            title={report.risk.title} 
            content={report.risk.content}
          >
            <AIObservationList observations={report.risk.observations} />
          </AIReportSection>
        </div>

        {/* Concentration Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <AIReportSection 
            title={report.concentration.title} 
            content={report.concentration.content}
          >
            <AIObservationList observations={report.concentration.observations} />
          </AIReportSection>
        </div>

        {/* Technical Summary */}
        <div className="pt-4 animate-in fade-in duration-1000 delay-500">
          <div className="bg-hover/20 rounded-xl p-6 border border-border-strong relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Technical Provenance</div>
             <div className="grid grid-cols-2 gap-4 relative z-10">
               <div>
                 <div className="text-[8px] text-text-disabled uppercase font-bold mb-1 tracking-tighter">Network</div>
                 <div className="text-[10px] font-mono text-text-primary uppercase">{data.network}</div>
               </div>
               <div>
                 <div className="text-[8px] text-text-disabled uppercase font-bold mb-1 tracking-tighter">Activity</div>
                 <div className="text-[10px] font-mono text-text-primary">{data.recentTransactionsCount} TXs</div>
               </div>
               <div className="col-span-2">
                 <div className="text-[8px] text-text-disabled uppercase font-bold mb-1 tracking-tighter">Verified Address</div>
                 <div className="text-[10px] font-mono text-text-primary truncate">{data.address}</div>
               </div>
             </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-4">
          <AIReportDisclaimer />
        </div>
      </div>
      
      <div className="bg-page p-4 text-[9px] text-text-disabled text-center font-bold border-t border-border uppercase tracking-widest">
        Automated Intelligence Report — Secure & Read-Only
      </div>
    </Card>
  );
}
