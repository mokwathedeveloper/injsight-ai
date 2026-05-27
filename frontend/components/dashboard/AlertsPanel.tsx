import * as React from "react";
import { DashboardAlert } from "@/types/user-dashboard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  AlertTriangle, 
  TrendingUp, 
  Lock, 
  ChevronRight,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertsPanelProps {
  data: DashboardAlert[];
}

export function AlertsPanel({ data }: AlertsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "risk": return AlertTriangle;
      case "yield": return TrendingUp;
      case "security": return Lock;
      default: return Info;
    }
  };

  const getColors = (severity: string) => {
    switch (severity) {
      case "high": return { text: "text-error", bg: "bg-error/10", border: "border-error/20" };
      case "medium": return { text: "text-warning", bg: "bg-warning/10", border: "border-warning/20" };
      default: return { text: "text-accent", bg: "bg-accent/10", border: "border-accent/20" };
    }
  };

  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Live Alerts</h3>
          <Badge variant="error" className="h-4 px-1.5 text-[8px] animate-pulse">Live</Badge>
        </div>
        <button className="text-[10px] font-bold text-text-disabled uppercase hover:text-text-primary transition-colors">
          Dismiss All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/50">
          {data.map((alert) => {
            const Icon = getIcon(alert.type);
            const colors = getColors(alert.severity);
            
            return (
              <div 
                key={alert.id} 
                className="p-4 hover:bg-hover transition-colors cursor-pointer group flex items-start gap-4"
              >
                <div className={cn("p-2 rounded-lg border shrink-0 mt-0.5", colors.bg, colors.border, colors.text)}>
                  <Icon size={16} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[9px] font-bold uppercase tracking-widest", colors.text)}>
                      {alert.severity} Priority
                    </span>
                    <span className="text-[9px] text-text-disabled font-medium">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                    {alert.message}
                  </p>
                </div>

                <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} className="text-text-disabled" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50">
        <button className="w-full py-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/5 rounded-lg transition-colors">
          Configure Alert Settings
        </button>
      </div>
    </Card>
  );
}
