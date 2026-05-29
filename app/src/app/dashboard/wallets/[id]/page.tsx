import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WalletDetailView } from "@/components/wallet/WalletDetailView";

export default function WalletDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <WalletDetailView walletId={params.id} />
    </DashboardLayout>
  );
}
