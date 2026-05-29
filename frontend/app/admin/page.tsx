"use client";

import * as React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsageChart } from "@/components/admin/UsageChart";
import { CostCard } from "@/components/admin/CostCard";
import { UserTable } from "@/components/admin/UserTable";
import { ErrorPanel } from "@/components/admin/ErrorPanel";
import {
  MOCK_ADMIN_STATS, MOCK_USAGE_SERIES, MOCK_COST_BREAKDOWN, MOCK_ADMIN_USERS, MOCK_ERROR_LOG,
} from "@/data/admin-mock";
import { adminApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";
import { Users, Activity, Zap, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [stats, setStats] = React.useState(MOCK_ADMIN_STATS);
  const [users, setUsers] = React.useState(MOCK_ADMIN_USERS);

  React.useEffect(() => {
    if (!authed) return;
    adminApi.stats().then((d: any) => { if (d) setStats(d); }).catch(() => {});
    adminApi.users().then((u: any[]) => { if (u?.length) setUsers(u); }).catch(() => {});
  }, [authed]);

  const s = stats;
  return (
    <AdminShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-text-secondary text-sm mt-1">Monitor users, usage, failures, AI costs, and system health.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={s.totalUsers.toLocaleString()} icon={Users} subValue={`${s.activeToday.toLocaleString()} active today`} />
          <StatCard label="Analyses Today" value={s.analysesToday.toLocaleString()} icon={Activity} trend={{ value: 8, isPositive: true }} subValue="Across all plans" />
          <StatCard label="AI Cost Today" value={`$${s.aiCostUsd.toFixed(2)}`} icon={Zap} subValue="Model + inference" />
          <StatCard label="Error Rate" value={`${s.errorRatePct}%`} icon={AlertTriangle} trend={{ value: 0.2, isPositive: true }} subValue="Of all requests" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><UsageChart data={MOCK_USAGE_SERIES} /></div>
          <CostCard breakdown={MOCK_COST_BREAKDOWN} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><UserTable users={users} /></div>
          <ErrorPanel errors={MOCK_ERROR_LOG} />
        </div>
      </div>
    </AdminShell>
  );
}
