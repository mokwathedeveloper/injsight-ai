import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsView } from "@/components/dashboard/ReportsView";

export const metadata: Metadata = { title: "Reports — InjSight AI" };

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <ReportsView />
    </DashboardLayout>
  );
}
