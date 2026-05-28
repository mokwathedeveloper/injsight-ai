"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { PasswordForm } from "@/components/dashboard/PasswordForm";
import { NotificationToggles, DisplayPreferences } from "@/components/dashboard/NotificationToggles";
import { PlanLimitCard } from "@/components/dashboard/PlanLimitCard";
import { LimitUpgradePrompt } from "@/components/dashboard/LimitUpgradePrompt";
import { DangerZone } from "@/components/dashboard/DangerZone";
import { Settings, User, Shield, Bell, Layout, AlertCircle, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-12 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Settings size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Account <span className="text-primary">Settings</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            Manage your profile, security preferences, and dashboard configurations.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <SettingsSection 
            title="User Profile" 
            description="Update your personal information and public identity on the platform."
          >
            <ProfileForm />
          </SettingsSection>

          {/* Billing & Limits Section */}
          <div className="space-y-6 pt-4">
             <div className="flex items-center gap-2 text-text-primary px-1">
                <CreditCard size={18} className="text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Billing & Plan Limits</h3>
             </div>
             <PlanLimitCard />
             <LimitUpgradePrompt />
          </div>

          {/* Security Section */}
          <SettingsSection 
            title="Account Security" 
            description="Protect your intelligence data by maintaining a strong, unique password."
          >
            <PasswordForm />
          </SettingsSection>

          {/* Notifications Section */}
          <SettingsSection 
            title="Notification Hub" 
            description="Control how and when you receive AI intelligence alerts and risk updates."
          >
            <NotificationToggles />
          </SettingsSection>

          {/* Display Section */}
          <SettingsSection 
            title="Display Preferences" 
            description="Customize the dashboard experience to match your workflow and regional standards."
          >
            <DisplayPreferences />
          </SettingsSection>

          {/* Data & Privacy */}
          <Link
            href="/dashboard/settings/privacy"
            className="flex items-center justify-between p-5 rounded-2xl border border-border bg-card hover:border-border-strong transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-text-primary">Data &amp; Privacy controls</p>
                <p className="text-xs text-text-secondary">Export or permanently delete your saved data and account.</p>
              </div>
            </div>
            <span className="text-text-disabled group-hover:text-primary transition-colors">→</span>
          </Link>

          {/* Danger Zone */}
          <div className="pt-12 border-t border-error/20">
             <div className="flex items-center gap-2 text-error mb-8 px-1">
                <AlertCircle size={20} />
                <h3 className="text-lg font-bold uppercase tracking-[0.2em]">Danger Zone</h3>
             </div>
             <DangerZone />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
