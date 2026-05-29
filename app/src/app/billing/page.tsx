import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BillingView } from "@/components/billing/BillingView";

export const metadata: Metadata = { title: "Billing — InjSight AI" };

export default function BillingPage() {
  return (
    <DashboardLayout>
      <BillingView />
    </DashboardLayout>
  );
}
