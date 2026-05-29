import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WatchlistView } from "@/components/dashboard/WatchlistView";

export const metadata: Metadata = { title: "Watchlist — InjSight AI" };

export default function WatchlistPage() {
  return (
    <DashboardLayout>
      <WatchlistView />
    </DashboardLayout>
  );
}
