import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/types";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "primary" | "accent" | "violet" | "risk";
  riskLevel?: RiskLevel;
}

const variants = {
  default:  "badge bg-surface-2 text-text-secondary border border-border",
  success:  "badge-success",
  warning:  "badge-warning",
  danger:   "badge-danger",
  primary:  "badge-primary",
  accent:   "badge-accent",
  violet:   "badge bg-violet-muted text-violet-400",
};

const riskVariants: Record<RiskLevel, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

export function Badge({ className, variant = "default", riskLevel, children, ...props }: BadgeProps) {
  const cls = riskLevel ? riskVariants[riskLevel] : (variant !== "risk" ? variants[variant] : variants.default);
  return (
    <span className={cn(cls, className)} {...props}>
      {children}
    </span>
  );
}
