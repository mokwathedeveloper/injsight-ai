import * as React from "react";
import { ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadOnlySafetyNoticeProps {
  className?: string;
}

export function ReadOnlySafetyNotice({ className }: ReadOnlySafetyNoticeProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-widest text-text-disabled py-4", className)}>
      <div className="flex items-center space-x-2">
        <ShieldCheck size={16} className="text-success" />
        <span>Read-Only Access</span>
      </div>
      <div className="flex items-center space-x-2">
        <Lock size={16} className="text-success" />
        <span>No Private Keys Required</span>
      </div>
      <div className="flex items-center space-x-2">
        <ShieldCheck size={16} className="text-success" />
        <span>Non-Custodial</span>
      </div>
    </div>
  );
}
