import * as React from "react";
import { Card } from "@/components/ui/Card";
import { SeverityBadge } from "./SeverityBadge";
import { ErrorLogEntry } from "@/types/admin";

export function ErrorPanel({ errors }: { errors: ErrorLogEntry[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Errors</h3>
      </div>
      <div className="divide-y divide-border/50">
        {errors.slice(0, 4).map((e) => (
          <div key={e.id} className="flex items-start gap-3 p-4 hover:bg-hover/30 transition-colors">
            <SeverityBadge severity={e.severity} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-text-primary">{e.type}</p>
              <p className="text-[11px] text-text-secondary truncate">{e.message}</p>
            </div>
            <span className="text-[10px] font-mono text-text-disabled shrink-0">×{e.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
