import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Hexagon } from "lucide-react";

export function NativeAssetBadge() {
  return (
    <Badge variant="default" className="gap-1">
      <Hexagon size={10} className="fill-white/20" />
      INJ Native
    </Badge>
  );
}
