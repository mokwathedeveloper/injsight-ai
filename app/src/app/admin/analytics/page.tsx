import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminAnalyticsView } from "@/components/admin/AdminAnalyticsView";

export const metadata: Metadata = { title: "Usage Analytics — Admin — InjSight AI" };

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout>
      <AdminAnalyticsView />
    </DashboardLayout>
  );
}
