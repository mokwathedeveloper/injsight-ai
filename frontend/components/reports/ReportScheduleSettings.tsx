"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { ReportSchedule, ReportFrequency } from "@/types/weekly-reports";
import { cn } from "@/lib/utils";

const FREQUENCIES: ReportFrequency[] = ["weekly", "biweekly", "monthly"];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-text-secondary">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={cn("relative w-11 h-6 rounded-full transition-colors", checked ? "bg-primary" : "bg-hover border border-border")}
      >
        <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform", checked && "translate-x-5")} />
      </button>
    </div>
  );
}

export function ReportScheduleSettings({ schedule: initial }: { schedule: ReportSchedule }) {
  const [schedule, setSchedule] = React.useState(initial);
  const set = (patch: Partial<ReportSchedule>) => setSchedule((s) => ({ ...s, ...patch }));

  return (
    <Card className="p-6 space-y-5">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Report Schedule</h3>

      <Toggle checked={schedule.enabled} onChange={() => set({ enabled: !schedule.enabled })} label="Enable automated reports" />

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Frequency</p>
        <div className="grid grid-cols-3 gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f}
              onClick={() => set({ frequency: f })}
              disabled={!schedule.enabled}
              className={cn(
                "h-9 rounded-lg text-xs font-bold uppercase tracking-wider capitalize transition-all disabled:opacity-40",
                schedule.frequency === f ? "bg-primary text-white" : "bg-hover/40 border border-border text-text-secondary hover:text-text-primary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-border/50">
        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Delivery</p>
        <Toggle checked={schedule.deliverEmail} onChange={() => set({ deliverEmail: !schedule.deliverEmail })} label="Email" />
        <Toggle checked={schedule.deliverInApp} onChange={() => set({ deliverInApp: !schedule.deliverInApp })} label="In-app notification" />
      </div>
    </Card>
  );
}
