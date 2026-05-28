import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { ErrorSeverity } from "@/types/admin";

const VARIANT: Record<ErrorSeverity, "secondary" | "warning" | "error" | "default"> = {
  low: "secondary",
  medium: "warning",
  high: "error",
  critical: "error",
};

export function SeverityBadge({ severity }: { severity: ErrorSeverity }) {
  return <Badge variant={VARIANT[severity]}>{severity}</Badge>;
}
