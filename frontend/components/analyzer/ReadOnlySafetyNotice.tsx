import * as React from "react";
import { ShieldCheck, Lock, Eye, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ReadOnlySafetyNoticeProps {
  className?: string;
}

export function ReadOnlySafetyNotice({ className }: ReadOnlySafetyNoticeProps) {
  return (
    <Card className={cn("p-8 bg-hover/20 border-border relative overflow-hidden group", className)}>
      {/* Subtle background safety glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-success/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center space-x-2 text-success">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Verified Safety Standard</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary tracking-tight">
            InjSight AI is 100% Read-Only.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            We only analyze public on-chain data from the Injective network. 
            Our platform never requests private keys, seed phrases, or permission to move funds. 
            Your assets always remain safely in your control.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0">
          <div className="p-4 bg-card border border-border/50 rounded-2xl flex flex-col items-center text-center space-y-2 group-hover:border-success/30 transition-colors">
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <Eye size={20} />
            </div>
            <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Public Data</span>
          </div>
          <div className="p-4 bg-card border border-border/50 rounded-2xl flex flex-col items-center text-center space-y-2 group-hover:border-success/30 transition-colors">
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <Lock size={20} />
            </div>
            <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Zero Custody</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-3">
        <AlertCircle size={14} className="text-text-disabled" />
        <p className="text-[10px] text-text-disabled font-medium uppercase tracking-tight italic">
          Security Note: Never share your secret recovery phrase with any platform or individual.
        </p>
      </div>
    </Card>
  );
}
