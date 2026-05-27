import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  return (
    <Card className={cn("p-0 border-border bg-card overflow-hidden", className)}>
      <div className="p-6 md:p-8 border-b border-border bg-hover/10">
        <h3 className="text-lg font-bold text-text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          {description}
        </p>
      </div>
      <div className="p-6 md:p-8">
        {children}
      </div>
    </Card>
  );
}
