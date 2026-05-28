"use client";

import * as React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { UsageAnalyticsDashboard } from "@/components/admin/UsageAnalyticsDashboard";
import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <AdminShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <BarChart3 size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">Usage <span className="text-primary">Analytics</span></h1>
          </div>
          <p className="text-text-secondary text-sm">Track wallet analyses, reports, conversion, and plan usage.</p>
        </div>

        <UsageAnalyticsDashboard />
      </div>
    </AdminShell>
  );
}
