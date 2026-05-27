"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickAnalyzeCard } from "@/components/dashboard/QuickAnalyzeCard";
import { RecentAnalysisTable } from "@/components/dashboard/RecentAnalysisTable";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MOCK_DASHBOARD_DATA } from "@/data/user-dashboard-mock";
import { Wallet, Shield, Bell, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const data = MOCK_DASHBOARD_DATA;

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Command <span className="text-primary">Center</span>
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Welcome back, John. Here&apos;s what&apos;s happening with your tracked wallets.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-xl text-success">
            <Shield size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">All Systems Operational</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Tracked Wallets"
            value={data.stats.totalWallets}
            icon={Wallet}
            subValue="Saved for monitoring"
          />
          <StatCard 
            label="Total Value"
            value={`$${(data.stats.totalValueUsd / 1000000).toFixed(2)}M`}
            icon={BarChart3}
            trend={{ value: 4.2, isPositive: true }}
            subValue="Aggregated balance"
          />
          <StatCard 
            label="Active Alerts"
            value={data.stats.activeAlerts}
            icon={Bell}
            trend={{ value: 1, isPositive: false }}
            subValue="Action required"
          />
          <StatCard 
            label="Avg Risk Score"
            value={data.stats.riskScoreAvg}
            icon={Shield}
            subValue="Ecosystem percentile: 82%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Analysis & Recent Activity */}
          <div className="lg:col-span-8 space-y-8">
            <QuickAnalyzeCard />
            <div className="h-[400px]">
              <RecentAnalysisTable data={data.recentAnalyses} />
            </div>
          </div>

          {/* Right Column: Alerts */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <AlertsPanel data={data.alerts} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
