import { Brain, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui";

export function AiReportPreview() {
  return (
    <section className="page-section bg-surface/30 border-y border-border/50">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — description */}
          <div className="space-y-6">
            <div>
              <p className="section-label mb-3">AI Reports</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                AI Report Preview
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Get comprehensive, plain-English wallet intelligence. Our AI analyzes on-chain
                behavior and translates complex DeFi data into actionable insights.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: Brain,         color: "text-accent",   text: "Executive Summary in plain English" },
                { icon: AlertTriangle, color: "text-warning",  text: "Risk factor breakdown with severity ratings" },
                { icon: TrendingUp,    color: "text-primary",  text: "Concentration analysis across assets" },
                { icon: CheckCircle,   color: "text-success",  text: "Suggested next steps tailored to the wallet" },
              ].map(({ icon: Icon, color, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${color} shrink-0`} />
                  <span className="text-sm text-text-secondary">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — preview card */}
          <div className="glass-card p-5 border-accent/20 shadow-glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-accent-muted">
                <Brain className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-text-primary">AI Wallet Report</span>
              <span className="ml-auto badge-success">Low Risk</span>
            </div>

            <div className="divider mb-4" />

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-text-muted mb-1.5">Executive Summary</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  This wallet shows a well-diversified portfolio with 72% blue-chip allocation.
                  The INJ concentration at 42.1% is slightly elevated and increases single-asset
                  risk if Injective market conditions shift significantly.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-text-muted mb-2">Risk Factors</p>
                <div className="space-y-1.5">
                  {[
                    { label: "INJ Concentration", severity: "Medium", icon: "⚠️" },
                    { label: "Activity Buffer",    severity: "Low",    icon: "✅" },
                    { label: "Stablecoin Ratio",   severity: "Low",    icon: "✅" },
                  ].map((factor) => (
                    <div key={factor.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-xs text-text-secondary flex items-center gap-1.5">
                        {factor.icon} {factor.label}
                      </span>
                      <span className={`text-xs font-semibold ${
                        factor.severity === "Medium" ? "text-warning" : "text-success"
                      }`}>
                        {factor.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-text-muted mb-2">Next Steps</p>
                <ul className="space-y-1">
                  {[
                    "Consider reducing INJ to under 35% for better diversification",
                    "No urgent action required — portfolio is well-structured",
                  ].map((step) => (
                    <li key={step} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
