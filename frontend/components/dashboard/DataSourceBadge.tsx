import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Database } from "lucide-react";

interface DataSourceBadgeProps {
  source: string;
  lastAnalyzed: string;
}

export function DataSourceBadge({ source, lastAnalyzed }: DataSourceBadgeProps) {
  return (
    <div className="flex items-center space-x-3">
      <Badge variant="secondary" className="flex items-center space-x-1.5 py-1 px-3 bg-hover/50 text-[10px] lowercase font-mono">
        <Database size={10} className="text-primary" />
        <span>src: {source}</span>
      </Badge>
      <span className="text-[10px] text-text-disabled font-medium uppercase tracking-tighter">
        Last sync: {lastAnalyzed}
      </span>
    </div>
  );
}
