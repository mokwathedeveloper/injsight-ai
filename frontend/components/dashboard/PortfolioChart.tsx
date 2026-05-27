"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartDataPoint } from "@/types/portfolio";
import { Card } from "@/components/ui/Card";

interface PortfolioChartProps {
  data: ChartDataPoint[];
  totalValue: number;
}

export function PortfolioChart({ data, totalValue }: PortfolioChartProps) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalValue);

  return (
    <Card className="p-6 bg-card border-border flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            Portfolio Value
          </p>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
            {formattedValue}
          </h2>
        </div>
        
        <div className="flex bg-hover rounded-lg p-1 border border-border">
          <button className="px-3 py-1 text-[10px] font-bold text-primary bg-card rounded-md shadow-sm">7D</button>
          <button className="px-3 py-1 text-[10px] font-bold text-text-disabled hover:text-text-secondary transition-colors">30D</button>
          <button className="px-3 py-1 text-[10px] font-bold text-text-disabled hover:text-text-secondary transition-colors">ALL</button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              hide 
            />
            <YAxis 
              hide 
              domain={["dataMin - 10000", "dataMax + 10000"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card/90 backdrop-blur-md border border-border-strong p-3 rounded-xl shadow-2xl">
                      <p className="text-[10px] font-bold text-text-disabled uppercase mb-1">
                        {payload[0].payload.date}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(payload[0].value as number)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0066FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
