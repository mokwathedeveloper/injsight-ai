import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportDetailView } from "@/components/dashboard/ReportDetailView";

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ReportDetailView reportId={params.id} />
    </DashboardLayout>
  );
}
