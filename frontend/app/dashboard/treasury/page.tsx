"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { TreasurySummaryCard } from "@/components/treasury/TreasurySummaryCard";
import { ExposureChart } from "@/components/treasury/ExposureChart";
import { TreasuryMovementTable } from "@/components/treasury/TreasuryMovementTable";
import { WeeklyReportCTA } from "@/components/treasury/WeeklyReportCTA";
import { MOCK_TREASURY_SUMMARY, MOCK_TREASURY_MOVEMENTS, MOCK_TREASURY_EXPOSURE } from "@/data/treasury-mock";
import { Landmark } from "lucide-react";

export default function TreasuryPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Landmark size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Treasury <span className="text-primary">Monitoring</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Track DAO and protocol treasury wallets, movements, and concentration.</p>
        </div>

        <TreasurySummaryCard summary={MOCK_TREASURY_SUMMARY} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExposureChart data={MOCK_TREASURY_EXPOSURE} />
          <TreasuryMovementTable movements={MOCK_TREASURY_MOVEMENTS} />
        </div>

        <WeeklyReportCTA />
      </div>
    </AppShell>
  );
}
