import * as React from "react";
import { Card } from "@/components/ui/Card";
import { RequestLogEntry } from "@/types/api-platform";
import { cn } from "@/lib/utils";

const statusColor = (cls: RequestLogEntry["statusClass"]) =>
  cls === "success" ? "text-success" : cls === "client_error" ? "text-warning" : "text-error";

export function RequestLog({ entries }: { entries: RequestLogEntry[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Requests</h3>
      </div>
      {entries.length === 0 ? (
        <div className="p-12 text-center text-text-secondary text-sm">No requests yet. Make your first API call to see logs here.</div>
      ) : (
        <div className="divide-y divide-border/50 font-mono">
          {entries.map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-6 py-3 text-xs hover:bg-hover/30 transition-colors">
              <span className="text-text-disabled w-16 shrink-0">{e.time}</span>
              <span className={cn("font-bold w-12 shrink-0", e.method === "GET" ? "text-success" : "text-primary")}>{e.method}</span>
              <span className="text-text-secondary truncate flex-1">{e.endpoint}</span>
              <span className={cn("font-bold w-10 text-right shrink-0", statusColor(e.statusClass))}>{e.statusCode}</span>
              <span className="text-text-disabled w-16 text-right shrink-0">{e.latencyMs}ms</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
