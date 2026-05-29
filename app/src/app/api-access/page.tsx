import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ApiAccessView } from "@/components/api/ApiAccessView";

export const metadata: Metadata = { title: "API Access — InjSight AI" };

export default function ApiAccessPage() {
  return (
    <DashboardLayout>
      <ApiAccessView />
    </DashboardLayout>
  );
}
