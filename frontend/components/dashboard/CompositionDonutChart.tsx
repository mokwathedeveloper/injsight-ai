"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CompositionData } from "@/types/composition";

interface CompositionDonutChartProps {
  data: CompositionData[];
}

export function CompositionDonutChart({ data }: CompositionDonutChartProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                className="hover:opacity-80 transition-opacity cursor-pointer outline-none" 
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as CompositionData;
                return (
                  <div className="bg-card/90 backdrop-blur-md border border-border-strong p-3 rounded-xl shadow-2xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <p className="text-[10px] font-bold text-text-disabled uppercase tracking-wider">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-text-primary">
                      {item.value}% Allocation
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
