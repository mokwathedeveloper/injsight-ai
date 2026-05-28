import * as React from "react";
import { Card } from "@/components/ui/Card";
import { AIReportSection } from "./AIReportSection";
import { AIObservationList } from "./AIObservationList";
import { AIReportSectionData } from "@/types/ai-report";
import { Sparkles } from "lucide-react";

export function AIWalletSummary({ data }: { data: AIReportSectionData }) {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">AI Wallet Summary</span>
      </div>
      <AIReportSection title={data.title} content={data.content} />
      <AIObservationList observations={data.observations} />
    </Card>
  );
}
