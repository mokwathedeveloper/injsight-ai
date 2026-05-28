"use client";

import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/Card";
import { UsagePoint } from "@/types/admin";

export function UsageChart({ data }: { data: UsagePoint[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6">Platform Usage (7 days)</h3>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C2FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00C2FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262D" vertical={false} />
            <XAxis dataKey="day" stroke="#484F58" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#484F58" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#8B949E" }}
            />
            <Area type="monotone" dataKey="analyses" stroke="#0066FF" strokeWidth={2} fill="url(#gA)" name="Analyses" />
            <Area type="monotone" dataKey="reports" stroke="#00C2FF" strokeWidth={2} fill="url(#gR)" name="Reports" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
