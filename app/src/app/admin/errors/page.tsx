import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminErrorsView } from "@/components/admin/AdminErrorsView";

export const metadata: Metadata = { title: "Error Monitoring — Admin — InjSight AI" };

export default function AdminErrorsPage() {
  return (
    <DashboardLayout>
      <AdminErrorsView />
    </DashboardLayout>
  );
}
