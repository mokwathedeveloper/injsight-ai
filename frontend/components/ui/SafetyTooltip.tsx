"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafetyTooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function SafetyTooltip({ content, children, className }: SafetyTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100]",
          "w-64 p-4 bg-[#161B22] border border-primary/40 rounded-2xl shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          className
        )}>
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-primary/10 rounded-lg shrink-0">
              <ShieldAlert size={14} className="text-primary" />
            </div>
            <p className="text-[10px] text-text-secondary leading-relaxed italic">
              {content}
            </p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#161B22] shadow-2xl" />
        </div>
      )}
    </div>
  );
}
