"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/Card";
import { ExposureSlice } from "@/types/treasury";

export function ExposureChart({ data }: { data: ExposureSlice[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Asset Exposure</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" paddingAngle={4} dataKey="percent" stroke="none" animationDuration={1200}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} className="outline-none" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ExposureSlice;
                    return (
                      <div className="bg-card/90 backdrop-blur-md border border-border-strong p-3 rounded-xl shadow-2xl">
                        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-wider mb-1">{item.category}</p>
                        <p className="text-sm font-bold text-text-primary">{item.percent}% · ${item.valueUsd.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.map((slice) => (
            <div key={slice.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="text-xs text-text-secondary truncate">{slice.category}</span>
              </div>
              <span className="text-xs font-bold text-text-primary font-mono">{slice.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
