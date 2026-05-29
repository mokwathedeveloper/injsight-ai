import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HistoryView } from "@/components/dashboard/HistoryView";

export const metadata: Metadata = { title: "Analysis History — InjSight AI" };

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <HistoryView />
    </DashboardLayout>
  );
}
