import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

export function MovementBadge({ isLarge }: { isLarge: boolean }) {
  if (!isLarge) return <Badge variant="secondary">Normal</Badge>;
  return (
    <Badge variant="warning" className="gap-1">
      <AlertTriangle size={10} />
      Large
    </Badge>
  );
}
