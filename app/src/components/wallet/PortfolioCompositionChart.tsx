"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/config";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const MOCK_COMPOSITION = [
  { category: "INJ",    pct: 42.1, value: 104534 },
  { category: "USDT",   pct: 28.3, value: 70280  },
  { category: "ATOM",   pct: 15.6, value: 38762  },
  { category: "STINJ",  pct: 5.4,  value: 13486  },
  { category: "WBTC",   pct: 3.3,  value: 8291   },
  { category: "ETH",    pct: 2.9,  value: 7218   },
  { category: "Other",  pct: 2.4,  value: 5879   },
];

export function PortfolioCompositionChart({ address }: { address: string }) {
  const total = MOCK_COMPOSITION.reduce((s, c) => s + c.value, 0);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Portfolio Composition</h3>
          <p className="text-xs text-text-muted">Asset allocation breakdown</p>
        </div>
        <Link href="#" className="text-xs text-accent hover:underline flex items-center gap-1">
          View Full Breakdown <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={MOCK_COMPOSITION}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="pct"
              >
                {MOCK_COMPOSITION.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="glass-card px-3 py-2 text-xs">
                      <p className="font-semibold text-text-primary">{d.category}</p>
                      <p className="text-text-secondary">{d.pct}% · {formatCurrency(d.value)}</p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-text-primary">{formatCurrency(total)}</p>
            <p className="text-[10px] text-text-muted">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {MOCK_COMPOSITION.map((item, i) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                />
                <span className="text-xs text-text-secondary">{item.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-10 text-right">{item.pct}%</span>
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
