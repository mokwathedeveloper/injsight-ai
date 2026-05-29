import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TeamView } from "@/components/team/TeamView";

export const metadata: Metadata = { title: "Team Workspace — InjSight AI" };

export default function TeamPage() {
  return (
    <DashboardLayout>
      <TeamView />
    </DashboardLayout>
  );
}
