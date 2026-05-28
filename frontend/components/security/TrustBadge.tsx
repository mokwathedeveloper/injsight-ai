import * as React from "react";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function TrustBadge({ icon: Icon, title, description }: TrustBadgeProps) {
  return (
    <Card className="p-6 space-y-3 hover:border-border-strong transition-colors">
      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <h3 className="text-sm font-bold text-text-primary">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
    </Card>
  );
}
