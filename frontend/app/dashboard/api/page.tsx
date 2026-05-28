"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { APIIntegrationDashboard } from "@/components/api/APIIntegrationDashboard";
import { Code2 } from "lucide-react";

export default function APIPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Code2 size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              API <span className="text-primary">Access</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            Manage API keys, explore endpoints, and monitor request logs and usage.
          </p>
        </div>

        <APIIntegrationDashboard />
      </div>
    </AppShell>
  );
}
