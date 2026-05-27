"use client";

import * as React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";

interface RiskDonutChartProps {
  score: number;
  level: string;
  className?: string;
}

export function RiskDonutChart({ score, level, className }: RiskDonutChartProps) {
  // score is 0-100, we want to show it in a donut
  // data: [score, remainder]
  const data = [
    { name: "Risk", value: score },
    { name: "Safe", value: 100 - score },
  ];

  const getColor = (s: number) => {
    if (s < 30) return "#22C55E"; // Success
    if (s < 60) return "#F5C542"; // Warning
    return "#EF4444"; // Error
  };

  const chartColor = getColor(score);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="w-full h-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="95%"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              <Cell fill={chartColor} />
              <Cell fill="#1C2128" /> {/* Fixed background color for the remainder */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <div className="text-4xl font-extrabold text-text-primary tracking-tighter">
          {score}
        </div>
        <div className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", {
          "text-success": score < 30,
          "text-warning": score >= 30 && score < 60,
          "text-error": score >= 60
        })}>
          {level}
        </div>
      </div>
    </div>
  );
}
