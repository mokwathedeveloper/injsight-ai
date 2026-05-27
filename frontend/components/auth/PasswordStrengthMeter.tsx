"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthMeterProps) {
  const getStrength = (p: string) => {
    let score = 0;
    if (!p) return 0;
    if (p.length > 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = getStrength(password);
  const labels = ["Weak", "Fair", "Good", "Strong"];
  
  const getColor = (s: number) => {
    if (s <= 1) return "bg-error";
    if (s === 2) return "bg-warning";
    if (s >= 3) return "bg-success";
    return "bg-border";
  };

  return (
    <div className="space-y-2 mt-2 px-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-text-disabled uppercase tracking-widest">Security Strength</span>
        {password && (
           <span className={cn("text-[9px] font-bold uppercase", {
             "text-error": strength <= 1,
             "text-warning": strength === 2,
             "text-success": strength >= 3
           })}>
             {labels[strength - 1] || labels[0]}
           </span>
        )}
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-500",
              step <= strength ? getColor(strength) : "bg-hover"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
