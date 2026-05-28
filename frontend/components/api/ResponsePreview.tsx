import * as React from "react";
import { Card } from "@/components/ui/Card";

export function ResponsePreview({ json, endpoint }: { json: string; endpoint: string }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between bg-hover/20">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Example Response</h3>
        <code className="text-[10px] font-mono text-text-disabled">{endpoint}</code>
      </div>
      <pre className="p-5 text-xs font-mono text-text-secondary leading-relaxed overflow-x-auto">
        <code>{json}</code>
      </pre>
    </Card>
  );
}
