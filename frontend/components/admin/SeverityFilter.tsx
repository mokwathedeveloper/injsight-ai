"use client";

import * as React from "react";
import { ErrorSeverity } from "@/types/admin";
import { cn } from "@/lib/utils";

export type SeverityFilterValue = ErrorSeverity | "all";

const OPTIONS: SeverityFilterValue[] = ["all", "low", "medium", "high", "critical"];

interface SeverityFilterProps {
  value: SeverityFilterValue;
  onChange: (v: SeverityFilterValue) => void;
}

export function SeverityFilter({ value, onChange }: SeverityFilterProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-hover/40 border border-border rounded-xl w-fit">
      {OPTIONS.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "px-4 h-9 rounded-lg text-xs font-bold uppercase tracking-wider capitalize transition-all",
            value === o ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
