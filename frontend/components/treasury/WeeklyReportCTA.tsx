import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarClock } from "lucide-react";

export function WeeklyReportCTA() {
  return (
    <Card className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
            <CalendarClock size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-text-primary tracking-tight">Weekly Treasury Report</h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-md">
              Get an automated AI summary of treasury movements, concentration shifts, and risk changes delivered every Monday.
            </p>
          </div>
        </div>
        <Link href="/dashboard/reports/weekly" className="shrink-0">
          <Button className="h-11 px-6 font-bold text-xs uppercase tracking-widest">Enable Weekly Report</Button>
        </Link>
      </div>
    </Card>
  );
}
