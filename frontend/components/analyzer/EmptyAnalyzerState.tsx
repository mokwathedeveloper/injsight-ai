import * as React from "react";
import { Search } from "lucide-react";

export function EmptyAnalyzerState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-1000">
      <div className="w-20 h-20 rounded-2xl bg-card border border-border-strong flex items-center justify-center shadow-2xl relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors" />
        <Search className="text-text-disabled relative z-10" size={36} />
      </div>
      <div className="space-y-2 max-w-xs mx-auto">
        <h3 className="text-xl font-bold text-text-primary">Ready to Analyze</h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          Enter an Injective address above to unlock deep AI wallet intelligence.
        </p>
      </div>
      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-disabled bg-hover/30 px-6 py-2.5 rounded-full border border-border">
         <span>Secure</span>
         <span className="w-1 h-1 rounded-full bg-border" />
         <span>Private</span>
         <span className="w-1 h-1 rounded-full bg-border" />
         <span>Real-time</span>
      </div>
    </div>
  );
}
