"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { DataPrivacySettings } from "@/components/dashboard/DataPrivacySettings";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyControlsPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-3xl">
        <Link href="/dashboard/settings" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Settings</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Data & <span className="text-primary">Privacy</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Export or permanently delete your saved wallets, reports, and account data.</p>
        </div>

        <DataPrivacySettings />
        <DisclaimerBox variant="compact" className="px-1" />
      </div>
    </AppShell>
  );
}
