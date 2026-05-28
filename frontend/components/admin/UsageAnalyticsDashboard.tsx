"use client";

import * as React from "react";
import { MetricCard } from "./MetricCard";
import { ConversionFunnel } from "./ConversionFunnel";
import { CohortTable } from "./CohortTable";
import { UsageChart } from "./UsageChart";
import { MOCK_FUNNEL, MOCK_COHORTS, MOCK_USAGE_SERIES } from "@/data/admin-mock";

export function UsageAnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Wallet Analyses" value="36,629" delta={12} hint="Last 7 days" />
        <MetricCard label="Reports Generated" value="7,000" delta={9} hint="Last 7 days" />
        <MetricCard label="Signup → Paid" value="13.2%" delta={1.4} hint="Conversion" />
        <MetricCard label="Avg Wallets / User" value="3.8" delta={-0.3} hint="Saved wallets" />
      </div>

      <UsageChart data={MOCK_USAGE_SERIES} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConversionFunnel stages={MOCK_FUNNEL} />
        <CohortTable rows={MOCK_COHORTS} />
      </div>
    </div>
  );
}
