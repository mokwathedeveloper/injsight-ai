"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { WeeklyReportCard } from "@/components/reports/WeeklyReportCard";
import { ReportScheduleSettings } from "@/components/reports/ReportScheduleSettings";
import { EmailPreview } from "@/components/reports/EmailPreview";
import { MOCK_WEEKLY_REPORTS, MOCK_REPORT_SCHEDULE } from "@/data/weekly-reports-mock";
import { ArrowLeft, CalendarClock } from "lucide-react";

export default function WeeklyReportsPage() {
  const latest = MOCK_WEEKLY_REPORTS[0];

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <Link href="/dashboard/reports" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Reports</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <CalendarClock size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Weekly AI <span className="text-primary">Reports</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Automated weekly summaries of changes across your saved wallets.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {MOCK_WEEKLY_REPORTS.map((r) => (
              <WeeklyReportCard key={r.id} report={r} />
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ReportScheduleSettings schedule={MOCK_REPORT_SCHEDULE} />
            <EmailPreview report={latest} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
