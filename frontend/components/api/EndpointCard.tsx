import * as React from "react";
import { Card } from "@/components/ui/Card";
import { ApiEndpoint } from "@/types/api-platform";
import { cn } from "@/lib/utils";

export function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <Card className="p-4 flex items-center gap-4 hover:border-border-strong transition-colors">
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shrink-0",
          endpoint.method === "GET" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"
        )}
      >
        {endpoint.method}
      </span>
      <div className="min-w-0">
        <code className="text-xs font-mono text-text-primary block truncate">{endpoint.path}</code>
        <p className="text-[11px] text-text-secondary mt-0.5">{endpoint.description}</p>
      </div>
    </Card>
  );
}
