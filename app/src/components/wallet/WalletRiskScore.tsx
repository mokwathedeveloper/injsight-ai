"use client";

import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import Link from "next/link";

const MOCK_RISK = {
  score: 72,
  level: "High" as const,
  factors: [
    { label: "Concentration Risk",   score: 85, level: "high"   as const },
    { label: "Volatility Exposure",  score: 68, level: "medium" as const },
    { label: "DeFi Exposure",        score: 45, level: "medium" as const },
    { label: "Stablecoin Buffer",    score: 28, level: "low"    as const },
  ],
};

const levelColor: Record<string, string> = {
  high:     "text-warning",
  medium:   "text-yellow-400",
  low:      "text-success",
  critical: "text-danger",
};

const levelBg: Record<string, string> = {
  high:     "bg-warning-muted",
  medium:   "bg-yellow-400/10",
  low:      "bg-success-muted",
  critical: "bg-danger-muted",
};

export function WalletRiskScore({ address }: { address: string }) {
  const { score, level, factors } = MOCK_RISK;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Risk Score</h3>
        <Link href={`/analyze/risk?address=${address}`} className="text-xs text-accent hover:underline">
          Full Risk Report →
        </Link>
      </div>

      {/* Score dial */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#21262D" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke={score >= 80 ? "#EF4444" : score >= 60 ? "#F5C542" : score >= 40 ? "#FACC15" : "#22C55E"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 213.6} 213.6`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-text-primary">{score}</span>
            <span className="text-[9px] text-text-muted">/ 100</span>
          </div>
        </div>

        <div>
          <span className={`text-base font-bold ${level === "High" ? "text-warning" : "text-success"}`}>
            {level} Risk
          </span>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            Score of {score} places this wallet in the{" "}
            <strong className="text-warning">High Risk</strong> tier.
          </p>
        </div>
      </div>

      {/* Risk range bar */}
      <div className="mb-4">
        <div className="flex rounded-full overflow-hidden h-2 gap-0.5">
          <div className="flex-1 bg-success rounded-l-full" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-warning" />
          <div className="flex-1 bg-danger rounded-r-full" />
        </div>
        <div className="flex justify-between text-[9px] text-text-muted mt-1">
          <span>Low</span><span>Medium</span><span>High</span><span>Critical</span>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="space-y-2">
        {factors.map((f) => (
          <div key={f.label} className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">{f.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    f.level === "high" ? "bg-warning" : f.level === "low" ? "bg-success" : "bg-yellow-400"
                  }`}
                  style={{ width: `${f.score}%` }}
                />
              </div>
              <span className={`text-[10px] font-semibold capitalize ${levelColor[f.level]}`}>{f.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
