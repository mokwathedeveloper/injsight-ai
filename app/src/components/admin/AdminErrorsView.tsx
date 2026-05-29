"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { CardSkeleton, ErrorState, Badge } from "@/components/ui";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function AdminErrorsView() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await apiClient.get("/admin/stats");
      return unwrapData(res) as Record<string, unknown>;
    },
  });

  if (isLoading) return <div className="space-y-4">{[0,1,2].map(i=><CardSkeleton key={i}/>)}</div>;
  if (isError)   return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Error Monitoring</h1>
        <p className="text-sm text-text-secondary">System health and API error tracking.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"API Errors (24h)",   value:"2",    color:"text-success",  icon:CheckCircle},
          {label:"Failed Analyses",    value:"3",    color:"text-warning",  icon:AlertTriangle},
          {label:"Avg Response (ms)",  value:"320",  color:"text-accent",   icon:Clock},
          {label:"Uptime (30d)",       value:"99.9%",color:"text-success",  icon:CheckCircle},
        ].map(({label,value,color,icon:Icon})=>(
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-muted">{label}</p>
              <Icon className={`h-4 w-4 ${color}`}/>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">Recent Error Log</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-2/30">
              {["Time","Endpoint","Status","Latency"].map(h=>(
                <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {time:"12:34:01",ep:"/api/wallets/{id}",     code:200,lat:"142ms",ok:true},
              {time:"12:33:47",ep:"/api/analysis",         code:200,lat:"2380ms",ok:true},
              {time:"12:32:10",ep:"/api/wallets/bad",      code:422,lat:"38ms",ok:false},
              {time:"12:30:55",ep:"/api/public/analyze",   code:200,lat:"201ms",ok:true},
              {time:"12:29:02",ep:"/api/insights",         code:200,lat:"95ms",ok:true},
              {time:"12:28:14",ep:"/api/wallets",          code:401,lat:"12ms",ok:false},
            ].map((row,i)=>(
              <tr key={i} className="border-b border-border/40 hover:bg-surface-2/50">
                <td className="px-5 py-3 text-xs font-mono text-text-muted">{row.time}</td>
                <td className="px-5 py-3 text-xs font-mono text-accent">{row.ep}</td>
                <td className="px-5 py-3"><span className={row.ok?"badge-success":"badge-danger"}>{row.code}</span></td>
                <td className="px-5 py-3 text-xs text-text-secondary">{row.lat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
