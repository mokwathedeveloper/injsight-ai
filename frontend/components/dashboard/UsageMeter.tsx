"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface UsageMeterProps {
  label: string;
  current: number;
  limit: number | "Unlimited";
  unit?: string;
  className?: string;
}

export function UsageMeter({ label, current, limit, unit, className }: UsageMeterProps) {
  const isUnlimited = limit === "Unlimited";
  const percentage = isUnlimited ? 0 : Math.min(Math.max((current / limit) * 100, 0), 100);
  
  const getStatusColor = () => {
    if (isUnlimited) return "bg-primary";
    if (percentage >= 90) return "bg-error";
    if (percentage >= 75) return "bg-warning";
    return "bg-primary";
  };

  const statusColor = getStatusColor();

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest transition-colors">
            {label}
          </p>
          {unit && (
            <p className="text-[9px] text-text-disabled uppercase font-medium">
              {unit}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-text-primary font-mono">
            {current} / <span className="text-text-disabled">{limit}</span>
          </p>
          {!isUnlimited && percentage >= 80 && (
             <div className="flex items-center gap-1 mt-1 text-warning animate-in fade-in slide-in-from-right-1">
                <AlertTriangle size={10} />
                <span className="text-[8px] font-bold uppercase">Approaching Limit</span>
             </div>
          )}
        </div>
      </div>

      <div className="w-full h-2 bg-hover rounded-full overflow-hidden border border-border/50">
        <div 
          className={cn(
            "h-full transition-all duration-1000 ease-out relative",
            statusColor
          )} 
          style={{ width: isUnlimited ? "100%" : `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] -translate-x-full animate-[shimmer_2s_infinite] w-1/2" />
        </div>
      </div>
    </div>
  );
}
