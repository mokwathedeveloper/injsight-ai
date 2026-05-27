import * as React from "react";
import { AIObservation, ObservationLevel } from "@/types/ai-report";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVEL_CONFIG: Record<ObservationLevel, { icon: any; color: string; bgColor: string }> = {
  info: { icon: Info, color: "text-accent", bgColor: "bg-accent/10" },
  success: { icon: CheckCircle2, color: "text-success", bgColor: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10" },
  error: { icon: AlertCircle, color: "text-error", bgColor: "bg-error/10" },
};

interface AIObservationListProps {
  observations: AIObservation[];
}

export function AIObservationList({ observations }: AIObservationListProps) {
  return (
    <div className="space-y-3">
      {observations.map((obs) => {
        const config = LEVEL_CONFIG[obs.level];
        const Icon = config.icon;
        
        return (
          <div 
            key={obs.id} 
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl border border-border/50 transition-colors hover:bg-hover/30 group",
              `border-l-2 border-l-${obs.level === 'info' ? 'accent' : obs.level}`
            )}
          >
            <div className={cn("p-1.5 rounded-lg shrink-0", config.bgColor)}>
              <Icon size={14} className={config.color} />
            </div>
            <p className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
              {obs.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
