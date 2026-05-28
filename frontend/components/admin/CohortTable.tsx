import * as React from "react";
import { Card } from "@/components/ui/Card";
import { CohortRow } from "@/types/admin";
import { cn } from "@/lib/utils";

function RetentionCell({ value }: { value: number }) {
  if (value === 0) return <td className="px-4 py-3 text-center text-text-disabled">—</td>;
  const intensity = value / 100;
  return (
    <td className="px-4 py-3 text-center">
      <span
        className="inline-block px-2.5 py-1 rounded-md text-xs font-bold font-mono text-white"
        style={{ backgroundColor: `rgba(0, 102, 255, ${0.25 + intensity * 0.7})` }}
      >
        {value}%
      </span>
    </td>
  );
}

export function CohortTable({ rows }: { rows: CohortRow[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Retention Cohorts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold text-left">Cohort</th>
              <th className="px-4 py-3 font-bold text-right">Signups</th>
              <th className="px-4 py-3 font-bold text-center">Week 1</th>
              <th className="px-4 py-3 font-bold text-center">Week 2</th>
              <th className="px-4 py-3 font-bold text-center">Week 4</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.cohort} className={cn(i !== rows.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-3 text-sm font-bold text-text-primary">{r.cohort}</td>
                <td className="px-4 py-3 text-sm font-mono text-text-secondary text-right">{r.signups}</td>
                <RetentionCell value={r.week1} />
                <RetentionCell value={r.week2} />
                <RetentionCell value={r.week4} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
