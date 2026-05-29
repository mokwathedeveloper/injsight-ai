import { Search, Cpu, FileText, ChevronRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Enter a Wallet Address",
    description: "Paste any Injective wallet address. No sign-up required for public analysis.",
    color: "from-primary to-primary/50",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Analyzes On-Chain Data",
    description: "Our AI engine fetches live data from the Injective blockchain and computes risk scores.",
    color: "from-accent to-primary",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Actionable Intelligence",
    description: "Receive a complete report: portfolio breakdown, risk assessment, and AI-suggested next steps.",
    color: "from-violet-500 to-accent",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="page-section">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From wallet address to deep AI intelligence in under 30 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary to-accent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative glass-card p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.color} mb-4 shadow-glow`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs font-bold text-text-muted mb-2">Step {step.step}</div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
