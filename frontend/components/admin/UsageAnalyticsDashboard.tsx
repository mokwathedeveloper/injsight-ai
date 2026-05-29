"use client";

import * as React from "react";
import { MetricCard } from "./MetricCard";
import { ConversionFunnel } from "./ConversionFunnel";
import { CohortTable } from "./CohortTable";
import { UsageChart } from "./UsageChart";
import { MOCK_FUNNEL, MOCK_COHORTS, MOCK_USAGE_SERIES } from "@/data/admin-mock";
import { adminApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";

export function UsageAnalyticsDashboard() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [totalAnalyses, setTotalAnalyses] = React.useState<number | null>(null);
  const [totalUsers, setTotalUsers] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!authed) return;
    adminApi.stats().then((d: any) => {
      if (d?.analysesToday !== undefined) setTotalAnalyses(d.analysesToday);
      if (d?.totalUsers !== undefined) setTotalUsers(d.totalUsers);
    }).catch(() => {});
  }, [authed]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Wallet Analyses" value={totalAnalyses != null ? totalAnalyses.toLocaleString() : "36,629"} delta={12} hint="Total / today" />
        <MetricCard label="Total Users" value={totalUsers != null ? totalUsers.toLocaleString() : "7,000"} hint="Registered accounts" />
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
