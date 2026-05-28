import * as React from "react";
import { Card } from "@/components/ui/Card";
import { AIReportSection } from "./AIReportSection";
import { AIObservationList } from "./AIObservationList";
import { RiskBreakdownList, RiskFactor } from "./RiskBreakdownList";
import { AIReportSectionData } from "@/types/ai-report";
import { ShieldAlert } from "lucide-react";

const DEFAULT_FACTORS: RiskFactor[] = [
  { label: "Asset concentration", weight: 60, level: "high" },
  { label: "Smart-contract exposure", weight: 25, level: "medium" },
  { label: "Counterparty risk", weight: 10, level: "low" },
  { label: "Liquidity risk", weight: 5, level: "low" },
];

export function AIRiskExplanation({ data, factors = DEFAULT_FACTORS }: { data: AIReportSectionData; factors?: RiskFactor[] }) {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2 text-warning">
        <ShieldAlert size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">AI Risk Explanation</span>
      </div>
      <AIReportSection title={data.title} content={data.content} />
      <div className="pl-3.5 space-y-5">
        <RiskBreakdownList factors={factors} />
        <AIObservationList observations={data.observations} />
      </div>
    </Card>
  );
}
