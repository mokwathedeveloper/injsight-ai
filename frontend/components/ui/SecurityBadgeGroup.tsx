import * as React from "react";
import { ShieldCheck, Lock, Eye, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SecurityBadgeGroup({ className }: { className?: string }) {
  const badges = [
    { icon: ShieldCheck, label: "Non-Custodial", color: "text-success", bgColor: "bg-success/10" },
    { icon: Eye, label: "Read-Only", color: "text-primary", bgColor: "bg-primary/10" },
    { icon: Lock, label: "Privacy First", color: "text-accent", bgColor: "bg-accent/10" },
    { icon: CheckCircle, label: "AI Audited", color: "text-success", bgColor: "bg-success/10" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div 
            key={badge.label} 
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50",
              "hover:border-primary/30 hover:bg-hover/20 transition-all cursor-default group"
            )}
          >
            <div className={cn("p-1 rounded-md", badge.bgColor)}>
              <Icon size={12} className={cn(badge.color, "group-hover:scale-110 transition-transform")} />
            </div>
            <span className="text-[10px] font-bold text-text-secondary group-hover:text-text-primary transition-colors uppercase tracking-widest">
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
