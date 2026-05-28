import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { AssetCategory } from "@/types/injective";

const VARIANT: Record<AssetCategory, "default" | "success" | "secondary" | "warning"> = {
  Native: "default",
  Stablecoin: "success",
  Ecosystem: "secondary",
  Unknown: "warning",
};

export function AssetCategoryBadge({ category }: { category: AssetCategory }) {
  return <Badge variant={VARIANT[category]}>{category}</Badge>;
}
