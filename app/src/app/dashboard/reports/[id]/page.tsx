"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportDetailView } from "@/components/dashboard/ReportDetailView";

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <DashboardLayout>
      <ReportDetailView reportId={id} />
    </DashboardLayout>
  );
}
