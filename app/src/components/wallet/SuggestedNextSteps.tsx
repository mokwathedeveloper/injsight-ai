import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const MOCK_STEPS = [
  { type: "warning", text: "Consider diversifying INJ holdings below 35% to reduce concentration risk." },
  { type: "info",    text: "Your stablecoin buffer (28.3%) provides healthy downside protection." },
  { type: "success", text: "No immediate action required — portfolio fundamentals look solid." },
];

const icons = {
  warning: { Icon: AlertTriangle, color: "text-warning" },
  info:    { Icon: Info,          color: "text-accent" },
  success: { Icon: CheckCircle,   color: "text-success" },
};

export function SuggestedNextSteps({ address }: { address: string }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Next Steps</h3>
      <div className="space-y-3">
        {MOCK_STEPS.map((step, i) => {
          const { Icon, color } = icons[step.type as keyof typeof icons];
          return (
            <div key={i} className="flex items-start gap-2">
              <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
              <p className="text-xs text-text-secondary leading-relaxed">{step.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
