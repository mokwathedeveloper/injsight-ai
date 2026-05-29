"use client";

import Link from "next/link";
import type { AnalysisResult } from "@/hooks/useAnalysis";

interface Props {
  address: string;
  riskScore: AnalysisResult["riskScore"] | null;
}

const levelColor: Record<string, string> = {
  Low:      "text-success",
  Moderate: "text-yellow-400",
  High:     "text-warning",
  "Very High": "text-danger",
};

const levelBarColor: Record<string, string> = {
  Low:      "bg-success",
  Moderate: "bg-yellow-400",
  High:     "bg-warning",
  "Very High": "bg-danger",
};

export function WalletRiskScore({ address, riskScore }: Props) {
  if (!riskScore) return null;

  const { score, level, dimensions } = riskScore;
  const arc = Math.min(score, 100);
  const dashLen = 213.6;
  const strokeColor =
    score >= 80 ? "#EF4444" : score >= 60 ? "#F5C542" : score >= 40 ? "#FACC15" : "#22C55E";

  const factors = [
    { label: "Concentration Risk", value: dimensions.concentration },
    { label: "Volatility Exposure", value: dimensions.volatility },
    { label: "Stablecoin Buffer",   value: dimensions.stablecoinBuffer },
    { label: "Diversification",     value: dimensions.diversification },
    { label: "Activity Risk",       value: dimensions.activity },
  ];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Risk Score</h3>
        <Link href={`/analyze?address=${address}`} className="text-xs text-accent hover:underline">
          Full Report →
        </Link>
      </div>

      {/* Score dial */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#21262D" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="34" fill="none" stroke={strokeColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(arc / 100) * dashLen} ${dashLen}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-text-primary">{score}</span>
            <span className="text-[9px] text-text-muted">/ 100</span>
          </div>
        </div>
        <div>
          <p className={`text-base font-bold ${levelColor[level] ?? "text-text-primary"}`}>
            {level} Risk
          </p>
          <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-[140px]">
            Score of {score} places this wallet in the{" "}
            <span className={`font-semibold ${levelColor[level] ?? ""}`}>{level}</span> tier.
          </p>
        </div>
      </div>

      {/* Risk range bar */}
      <div className="mb-4">
        <div className="flex rounded-full overflow-hidden h-1.5 gap-0.5">
          <div className="flex-1 bg-success rounded-l-full" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-warning" />
          <div className="flex-1 bg-danger rounded-r-full" />
        </div>
        <div className="flex justify-between text-[9px] text-text-muted mt-1">
          <span>Low</span><span>Moderate</span><span>High</span><span>Very High</span>
        </div>
      </div>

      {/* Factor bars */}
      <div className="space-y-2">
        {factors.map((f) => (
          <div key={f.label} className="flex items-center justify-between gap-2">
            <span className="text-xs text-text-secondary truncate flex-1">{f.label}</span>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-16 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    f.value >= 70 ? "bg-warning" : f.value >= 40 ? "bg-yellow-400" : "bg-success"
                  }`}
                  style={{ width: `${f.value}%` }}
                />
              </div>
              <span className="text-[10px] text-text-muted w-6 text-right">{f.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
