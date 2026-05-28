import * as React from "react";
import { Card } from "@/components/ui/Card";
import { SeverityBadge } from "./SeverityBadge";
import { ErrorLogEntry } from "@/types/admin";
import { cn } from "@/lib/utils";

interface ErrorLogTableProps {
  errors: ErrorLogEntry[];
  onSelect: (e: ErrorLogEntry) => void;
}

export function ErrorLogTable({ errors, onSelect }: ErrorLogTableProps) {
  if (errors.length === 0) {
    return <Card className="p-12 text-center text-text-secondary text-sm">No errors match this severity. System is healthy.</Card>;
  }
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Severity</th>
              <th className="px-6 py-3 font-bold">Type</th>
              <th className="px-6 py-3 font-bold">Endpoint</th>
              <th className="px-6 py-3 font-bold">Time</th>
              <th className="px-6 py-3 font-bold text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((e, i) => (
              <tr
                key={e.id}
                onClick={() => onSelect(e)}
                className={cn("hover:bg-hover/40 transition-colors cursor-pointer", i !== errors.length - 1 && "border-b border-border/50")}
              >
                <td className="px-6 py-4"><SeverityBadge severity={e.severity} /></td>
                <td className="px-6 py-4 text-sm font-bold text-text-primary">{e.type}</td>
                <td className="px-6 py-4 text-xs font-mono text-text-secondary">{e.endpoint}</td>
                <td className="px-6 py-4 text-xs text-text-secondary">{e.time}</td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">{e.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
