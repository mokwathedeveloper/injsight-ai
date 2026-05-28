import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Lightbulb, ArrowRight } from "lucide-react";

export function AISuggestedSteps({ steps }: { steps: string[] }) {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 text-success">
        <Lightbulb size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">AI Suggested Next Steps</span>
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border/50 hover:bg-hover/30 transition-colors group">
            <span className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
              {i + 1}
            </span>
            <span className="text-xs text-text-secondary leading-relaxed flex-1 group-hover:text-text-primary transition-colors">{step}</span>
            <ArrowRight size={14} className="text-text-disabled shrink-0 mt-0.5 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </li>
        ))}
      </ol>
      <p className="text-[10px] text-text-disabled italic leading-relaxed">
        Suggestions are informational only and are never direct buy/sell instructions. InjSight AI is read-only and non-custodial.
      </p>
    </Card>
  );
}
