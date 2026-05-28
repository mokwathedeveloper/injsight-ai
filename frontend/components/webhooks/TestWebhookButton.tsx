"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function TestWebhookButton({ disabled }: { disabled?: boolean }) {
  const [state, setState] = React.useState<"idle" | "sending" | "ok" | "fail">("idle");

  const handleTest = () => {
    setState("sending");
    setTimeout(() => setState("ok"), 1500);
    setTimeout(() => setState("idle"), 4000);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="gap-2 border-border-strong"
      onClick={handleTest}
      disabled={disabled || state === "sending"}
      aria-busy={state === "sending"}
    >
      {state === "sending" && <Loader2 size={14} className="animate-spin" />}
      {state === "ok" && <CheckCircle2 size={14} className="text-success" />}
      {state === "fail" && <AlertCircle size={14} className="text-error" />}
      {state === "idle" && <Send size={14} />}
      {state === "sending" ? "Sending..." : state === "ok" ? "Test sent" : "Send test"}
    </Button>
  );
}
