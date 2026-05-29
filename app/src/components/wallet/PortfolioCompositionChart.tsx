"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/config";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { TokenHolding } from "@/hooks/useAnalysis";

interface PortfolioCompositionChartProps {
  address: string;
  holdings: TokenHolding[];
  totalValueUsd: number;
}

export function PortfolioCompositionChart({
  address,
  holdings,
  totalValueUsd,
}: PortfolioCompositionChartProps) {
  const chartData = holdings.map((h) => ({
    category: h.symbol,
    pct: h.percent,
    value: h.value_usd,
  }));

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Portfolio Composition</h3>
          <p className="text-xs text-text-muted">Asset allocation breakdown</p>
        </div>
        <Link
          href={`/analyze?address=${address}`}
          className="text-xs text-accent hover:underline flex items-center gap-1"
        >
          View Full Breakdown <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="pct"
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as { category: string; pct: number; value: number };
                  return (
                    <div className="glass-card px-3 py-2 text-xs">
                      <p className="font-semibold text-text-primary">{d.category}</p>
                      <p className="text-text-secondary">
                        {d.pct.toFixed(1)}% · {formatCurrency(d.value)}
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-text-primary">{formatCurrency(totalValueUsd)}</p>
            <p className="text-[10px] text-text-muted">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {chartData.map((item, i) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                />
                <span className="text-xs text-text-secondary">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-10 text-right">
                  {item.pct.toFixed(1)}%
                </span>
                <span className="text-xs font-semibold text-text-primary w-20 text-right">
                  {formatCurrency(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
