import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function PriceChangeBadge({ change }: { change: number }) {
  const positive = change >= 0;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-bold font-mono", positive ? "text-success" : "text-error")}>
      {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {positive ? "+" : ""}{change.toFixed(1)}%
    </span>
  );
}
