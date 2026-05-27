import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { RiskLevel } from "@/types/wallet-analyzer";
import { cn } from "@/lib/utils";

interface RiskLevelBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskLevelBadge({ level, className }: RiskLevelBadgeProps) {
  const getVariant = () => {
    switch (level) {
      case "Low": return "success";
      case "Moderate": return "warning";
      case "High":
      case "Very High": return "error";
      default: return "default";
    }
  };

  return (
    <Badge variant={getVariant()} className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-0.5", className)}>
      {level} Risk
    </Badge>
  );
}
