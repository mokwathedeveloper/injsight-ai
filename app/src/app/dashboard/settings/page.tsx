import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsView } from "@/components/dashboard/SettingsView";

export const metadata: Metadata = { title: "Settings — InjSight AI" };

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsView />
    </DashboardLayout>
  );
}
