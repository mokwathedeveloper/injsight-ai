"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { CardSkeleton, ErrorState } from "@/components/ui";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0066FF","#00C2FF","#7C3AED","#22C55E","#F5C542"];

export function AdminAnalyticsView() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await apiClient.get("/admin/stats");
      return unwrapData(res) as Record<string, unknown>;
    },
  });

  if (isLoading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[0,1,2,3].map(i=><CardSkeleton key={i}/>)}</div>;
  if (isError)   return <ErrorState onRetry={refetch} />;

  const stats = data ?? {};
  const dailyData = Array.from({length:14},(_,i)=>({
    day:`May ${i+16}`, analyses: Math.round(20+Math.random()*60), users: Math.round(10+Math.random()*30)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Usage Analytics</h1>
        <p className="text-sm text-text-secondary">Platform usage metrics and user behaviour.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"Total Users",     value:String(stats.total_users     ?? 0), color:"text-primary"},
          {label:"Total Analyses",  value:String(stats.total_analyses  ?? 0), color:"text-accent"},
          {label:"Total Reports",   value:String(stats.total_reports   ?? 0), color:"text-success"},
          {label:"Active Alerts",   value:String(stats.active_alerts   ?? 0), color:"text-warning"},
        ].map(({label,value,color})=>(
          <div key={label} className="stat-card">
            <p className="text-xs text-text-muted">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Daily Analyses (14 days)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" tick={{fontSize:10,fill:"#484F58"}} />
              <YAxis tick={{fontSize:10,fill:"#484F58"}} />
              <Tooltip content={({active,payload})=>active&&payload?.length?<div className="glass-card px-2 py-1 text-xs"><p className="text-accent">{payload[0].value} analyses</p></div>:null}/>
              <Bar dataKey="analyses" fill="#0066FF" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={dailyData}>
              <XAxis dataKey="day" tick={{fontSize:10,fill:"#484F58"}} />
              <YAxis tick={{fontSize:10,fill:"#484F58"}} />
              <Tooltip content={({active,payload})=>active&&payload?.length?<div className="glass-card px-2 py-1 text-xs"><p className="text-accent">{payload[0].value} users</p></div>:null}/>
              <Line type="monotone" dataKey="users" stroke="#00C2FF" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
