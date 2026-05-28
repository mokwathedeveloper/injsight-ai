import * as React from "react";
import { Card } from "@/components/ui/Card";
import { UsageMeter } from "@/components/dashboard/UsageMeter";
import { RateLimitInfo } from "@/types/api-platform";
import { Gauge } from "lucide-react";

export function RateLimitCard({ rateLimit }: { rateLimit: RateLimitInfo }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge size={16} className="text-primary" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Rate Limit</h3>
        </div>
        <span className="text-[10px] text-text-disabled uppercase font-bold">Resets in {rateLimit.resetsIn}</span>
      </div>
      <UsageMeter label={`Requests ${rateLimit.window}`} current={rateLimit.used} limit={rateLimit.limit} unit="API calls" />
    </Card>
  );
}
