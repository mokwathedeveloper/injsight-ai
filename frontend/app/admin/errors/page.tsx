"use client";

import * as React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ErrorLogTable } from "@/components/admin/ErrorLogTable";
import { SeverityFilter, SeverityFilterValue } from "@/components/admin/SeverityFilter";
import { ErrorDetailDrawer } from "@/components/admin/ErrorDetailDrawer";
import { MOCK_ERROR_LOG } from "@/data/admin-mock";
import { ErrorLogEntry } from "@/types/admin";
import { AlertTriangle } from "lucide-react";

export default function AdminErrorsPage() {
  const [filter, setFilter] = React.useState<SeverityFilterValue>("all");
  const [selected, setSelected] = React.useState<ErrorLogEntry | null>(null);

  const filtered = filter === "all" ? MOCK_ERROR_LOG : MOCK_ERROR_LOG.filter((e) => e.severity === filter);

  return (
    <AdminShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-error">
            <AlertTriangle size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">Error <span className="text-primary">Monitoring</span></h1>
          </div>
          <p className="text-text-secondary text-sm">Track failed analyses, provider errors, and AI failures.</p>
        </div>

        <SeverityFilter value={filter} onChange={setFilter} />
        <ErrorLogTable errors={filtered} onSelect={setSelected} />
      </div>

      <ErrorDetailDrawer error={selected} onClose={() => setSelected(null)} />
    </AdminShell>
  );
}
