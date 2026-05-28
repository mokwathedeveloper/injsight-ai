"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Download, Loader2, Check } from "lucide-react";

export function ExportDataButton() {
  const [state, setState] = React.useState<"idle" | "preparing" | "ready">("idle");

  const handleExport = () => {
    setState("preparing");
    setTimeout(() => {
      const blob = new Blob(
        [JSON.stringify({ exportedAt: new Date().toISOString(), savedWallets: [], reports: [], note: "InjSight AI data export (demo)" }, null, 2)],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "injsight-data-export.json";
      a.click();
      URL.revokeObjectURL(url);
      setState("ready");
      setTimeout(() => setState("idle"), 3000);
    }, 1500);
  };

  return (
    <Button variant="secondary" className="gap-2 border-border-strong" onClick={handleExport} disabled={state === "preparing"} aria-busy={state === "preparing"}>
      {state === "preparing" ? <Loader2 size={16} className="animate-spin" /> : state === "ready" ? <Check size={16} className="text-success" /> : <Download size={16} />}
      {state === "preparing" ? "Preparing export…" : state === "ready" ? "Export downloaded" : "Export my data"}
    </Button>
  );
}
