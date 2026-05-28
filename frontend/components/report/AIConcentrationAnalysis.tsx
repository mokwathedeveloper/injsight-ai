import * as React from "react";
import { Card } from "@/components/ui/Card";
import { AIReportSection } from "./AIReportSection";
import { AIObservationList } from "./AIObservationList";
import { ConcentrationRiskCard, ConcentrationHolding } from "./ConcentrationRiskCard";
import { AIReportSectionData } from "@/types/ai-report";
import { PieChart } from "lucide-react";

const DEFAULT_HOLDINGS: ConcentrationHolding[] = [
  { symbol: "INJ", percent: 60 },
  { symbol: "USDT", percent: 22 },
  { symbol: "WETH", percent: 10 },
];

export function AIConcentrationAnalysis({
  data,
  holdings = DEFAULT_HOLDINGS,
}: {
  data: AIReportSectionData;
  holdings?: ConcentrationHolding[];
}) {
  const topNPercent = holdings.reduce((s, h) => s + h.percent, 0);
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 text-accent">
        <PieChart size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">AI Concentration Analysis</span>
      </div>
      <AIReportSection title={data.title} content={data.content} />
      <div className="pl-3.5 space-y-5">
        <ConcentrationRiskCard holdings={holdings} topNPercent={topNPercent} />
        <AIObservationList observations={data.observations} />
      </div>
    </Card>
  );
}
