import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { Brain, Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIReportCardProps {
  data: WalletAnalysisResult;
}

export function AIReportCard({ data }: AIReportCardProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="border-b border-border p-5 bg-hover/30 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Brain size={20} className="text-accent" />
        </div>
        <span className="text-sm font-bold text-text-primary uppercase tracking-widest">AI Intelligence Report</span>
      </div>
      
      <div className="p-8 space-y-10 flex-1 overflow-y-auto">
        {data.insights.map((insight, index) => (
          <div key={index} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg border",
                insight.category === "risk" ? "bg-error/10 text-error border-error/20" : 
                insight.category === "opportunity" ? "bg-success/10 text-success border-success/20" : "bg-primary/10 text-primary border-primary/20"
              )}>
                {insight.category === "risk" ? <AlertTriangle size={16} /> : <Sparkles size={16} />}
              </div>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">{insight.title}</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed pl-12 border-l-2 border-border/50 italic">
              &quot;{insight.content}&quot;
            </p>
          </div>
        ))}

        <div className="pt-8 border-t border-border/50">
          <div className="bg-hover/20 rounded-xl p-6 border border-border-strong relative overflow-hidden">
             {/* Decorative glow */}
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Technical Summary</div>
             <div className="grid grid-cols-2 gap-4">
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
      </div>
      
      <div className="bg-page p-4 text-[10px] text-text-disabled text-center italic border-t border-border uppercase tracking-tight">
        InjSight AI is an informational platform. AI insights are not financial advice.
      </div>
    </Card>
  );
}
