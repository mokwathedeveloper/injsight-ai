import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SavedWalletsView } from "@/components/dashboard/SavedWalletsView";

export const metadata: Metadata = { title: "Saved Wallets — InjSight AI" };

export default function SavedWalletsPage() {
  return (
    <DashboardLayout>
      <SavedWalletsView />
    </DashboardLayout>
  );
}
