import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Wallet, Database, Sparkles, User, ArrowRight, Ban, KeyRound } from "lucide-react";

const STEPS = [
  { icon: Wallet, label: "Public address", sub: "You paste it" },
  { icon: Database, label: "Read-only fetch", sub: "Public chain data" },
  { icon: Sparkles, label: "AI analysis", sub: "Risk + insights" },
  { icon: User, label: "You", sub: "View results" },
];

export function ReadOnlyArchitectureDiagram() {
  return (
    <Card className="p-8 space-y-8">
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">How Read-Only Analysis Works</h3>
        <p className="text-xs text-text-secondary">No wallet connection. No signatures. No custody.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center text-center gap-2 w-32">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon size={22} />
                </div>
                <p className="text-xs font-bold text-text-primary">{s.label}</p>
                <p className="text-[10px] text-text-disabled">{s.sub}</p>
              </div>
              {i < STEPS.length - 1 && <ArrowRight size={18} className="text-text-disabled rotate-90 md:rotate-0 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2 text-error">
          <Ban size={16} />
          <span className="text-xs font-bold">Never private keys</span>
        </div>
        <div className="flex items-center gap-2 text-error">
          <KeyRound size={16} />
          <span className="text-xs font-bold">Never seed phrases</span>
        </div>
        <div className="flex items-center gap-2 text-error">
          <Ban size={16} />
          <span className="text-xs font-bold">Never fund access</span>
        </div>
      </div>
    </Card>
  );
}
