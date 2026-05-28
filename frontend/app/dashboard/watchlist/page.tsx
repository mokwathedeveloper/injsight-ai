"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { WatchlistDashboard } from "@/components/dashboard/WatchlistDashboard";

export default function WatchlistPage() {
  return (
    <AppShell>
      <WatchlistDashboard />
    </AppShell>
  );
}
