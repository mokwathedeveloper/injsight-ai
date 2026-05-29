import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertsView } from "@/components/dashboard/AlertsView";

export const metadata: Metadata = { title: "Alerts — InjSight AI" };

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <AlertsView />
    </DashboardLayout>
  );
}
