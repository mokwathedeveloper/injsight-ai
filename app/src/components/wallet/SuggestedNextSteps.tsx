import { CheckCircle, AlertTriangle, Info } from "lucide-react";

interface SuggestedNextStepsProps {
  steps: string[];
}

export function SuggestedNextSteps({ steps }: SuggestedNextStepsProps) {
  if (!steps || steps.length === 0) return null;

  // Assign icon type based on simple heuristics on the text content
  const getStepType = (text: string): "warning" | "info" | "success" => {
    const lower = text.toLowerCase();
    if (lower.includes("reduce") || lower.includes("risk") || lower.includes("consider")) return "warning";
    if (lower.includes("good") || lower.includes("solid") || lower.includes("no immediate")) return "success";
    return "info";
  };

  const icons = {
    warning: { Icon: AlertTriangle, color: "text-warning" },
    info:    { Icon: Info,          color: "text-accent"  },
    success: { Icon: CheckCircle,   color: "text-success" },
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Next Steps</h3>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const type = getStepType(step);
          const { Icon, color } = icons[type];
          return (
            <div key={i} className="flex items-start gap-2">
              <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
              <p className="text-xs text-text-secondary leading-relaxed">{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
