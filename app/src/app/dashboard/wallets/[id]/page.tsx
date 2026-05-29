"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WalletDetailView } from "@/components/wallet/WalletDetailView";

export default function WalletDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <DashboardLayout>
      <WalletDetailView walletId={id} />
    </DashboardLayout>
  );
}
