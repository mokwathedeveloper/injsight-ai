"use client";

import { Users, Activity, AlertTriangle, BarChart3, TrendingUp, Shield, Database, Zap } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const DAILY_ANALYSES = Array.from({ length: 14 }, (_, i) => ({
  day: `May ${i + 15}`,
  analyses: Math.round(80 + Math.random() * 60),
  users: Math.round(30 + Math.random() * 25),
}));

const STATS = [
  { label: "Total Users",      value: "1,842",  sub: "+142 this week",  icon: Users,        color: "text-primary" },
  { label: "Daily Analyses",   value: "428",    sub: "+12% vs yesterday",icon: Activity,     color: "text-accent" },
  { label: "Active Alerts",    value: "24",     sub: "3 critical",       icon: AlertTriangle, color: "text-danger" },
  { label: "API Requests",     value: "12,840", sub: "today",            icon: Zap,          color: "text-warning" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-sm text-text-secondary">Platform health and usage analytics.</p>
        </div>
        <span className="badge-success">System Healthy</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily analyses trend */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Daily Analyses (14 days)</h3>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={DAILY_ANALYSES}>
              <defs>
                <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#484F58" }} />
              <YAxis tick={{ fontSize: 10, fill: "#484F58" }} />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1 text-xs">
                      <p className="text-text-primary">{payload[0].payload.day}</p>
                      <p className="text-accent">{payload[0].value} analyses</p>
                    </div>
                  ) : null
                }
              />
              <Area type="monotone" dataKey="analyses" stroke="#00C2FF" fill="url(#adminGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User growth */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={DAILY_ANALYSES}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#484F58" }} />
              <YAxis tick={{ fontSize: 10, fill: "#484F58" }} />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="glass-card px-2 py-1 text-xs">
                      <p className="text-text-primary">{payload[0].payload.day}</p>
                      <p className="text-primary">{payload[0].value} users</p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="users" fill="#0066FF" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error monitoring */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold text-text-primary">Error Monitoring</h3>
          <span className="ml-auto badge-success">All systems normal</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "API Errors (24h)",     value: "2",    status: "success" },
            { label: "Failed Analyses",      value: "7",    status: "warning" },
            { label: "Avg Response Time",    value: "340ms", status: "success" },
            { label: "Uptime (30d)",         value: "99.9%", status: "success" },
          ].map(({ label, value, status }) => (
            <div key={label} className="bg-surface-2 rounded-lg p-3">
              <p className="text-xs text-text-muted">{label}</p>
              <p className={`text-lg font-bold mt-1 ${status === "warning" ? "text-warning" : "text-success"}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
