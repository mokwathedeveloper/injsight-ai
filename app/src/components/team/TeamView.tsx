"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { Users, UserPlus, Mail, Trash2, Crown, ShieldCheck, Eye, User } from "lucide-react";
import { Button, EmptyState, CardSkeleton, ErrorState } from "@/components/ui";

const ROLES = {
  owner:   { label:"Owner",   color:"text-warning",        Icon:Crown      },
  admin:   { label:"Admin",   color:"text-primary",        Icon:ShieldCheck },
  analyst: { label:"Analyst", color:"text-accent",         Icon:User        },
  viewer:  { label:"Viewer",  color:"text-text-secondary", Icon:Eye         },
};

export function TeamView() {
  const qc = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole,  setInviteRole]  = useState("analyst");

  const wsQuery = useQuery({
    queryKey:["team-workspace"],
    queryFn: async ()=>{
      const res = await apiClient.get("/teams/workspaces");
      return unwrapData(res) as any;
    },
  });
  const membersQuery = useQuery({
    queryKey:["team-members"],
    queryFn: async ()=>{
      const res = await apiClient.get("/teams/members");
      return (unwrapData(res) as any[]) ?? [];
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async ({email,role}:{email:string,role:string})=>{
      const res = await apiClient.post("/teams/members",{email,role});
      return unwrapData(res);
    },
    onSuccess:()=>{ qc.invalidateQueries({queryKey:["team-members"]}); setInviteEmail(""); },
  });
  const removeMutation = useMutation({
    mutationFn: async (memberId:string)=>{ await apiClient.delete(`/teams/members/${memberId}`); },
    onSuccess:()=>qc.invalidateQueries({queryKey:["team-members"]}),
  });
  const changeRole = useMutation({
    mutationFn: async ({memberId,role}:{memberId:string,role:string})=>{
      const res = await apiClient.put(`/teams/members/${memberId}/role`,{role});
      return unwrapData(res);
    },
    onSuccess:()=>qc.invalidateQueries({queryKey:["team-members"]}),
  });

  const ws      = wsQuery.data;
  const members = membersQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Team Workspace</h1>
          <p className="text-sm text-text-secondary">
            {ws ? ws.name : "Manage your team members and shared wallets."}
          </p>
        </div>
      </div>

      {/* Stats */}
      {membersQuery.isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[0,1,2,3].map(i=><CardSkeleton key={i}/>)}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {label:"Total Members",value:String(members.length),   icon:Users},
            {label:"Admins",       value:String(members.filter((m:any)=>m.role==="admin").length), icon:ShieldCheck},
            {label:"Analysts",     value:String(members.filter((m:any)=>m.role==="analyst").length),icon:User},
            {label:"Viewers",      value:String(members.filter((m:any)=>m.role==="viewer").length), icon:Eye},
          ].map(({label,value,icon:Icon})=>(
            <div key={label} className="stat-card">
              <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-accent"/><p className="text-xs text-text-muted">{label}</p></div>
              <p className="text-2xl font-bold text-text-primary">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Members list */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border"><h2 className="text-sm font-semibold text-text-primary">Members</h2></div>

        {membersQuery.isLoading ? <div className="p-5"><CardSkeleton/></div>
        : membersQuery.isError  ? <ErrorState onRetry={()=>membersQuery.refetch()} className="py-6"/>
        : members.length === 0  ? (
          <EmptyState icon={<Users className="h-8 w-8"/>} title="No team members yet" description="Invite colleagues to collaborate on wallet analysis." className="py-8"/>
        ) : (
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Member","Role","Joined","Actions"].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {members.map((m:any)=>{
                const roleCfg = ROLES[m.role as keyof typeof ROLES] ?? ROLES.viewer;
                return (
                  <tr key={m.id} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                          {(m.name||m.email||"?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-text-primary">{m.name||m.email}</p>
                          {m.name&&<p className="text-[10px] text-text-muted">{m.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1 text-xs font-semibold ${roleCfg.color}`}>
                        <roleCfg.Icon className="h-3 w-3"/> {roleCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-muted">
                      {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        {m.role !== "owner" && (
                          <>
                            <select
                              value={m.role}
                              onChange={e=>changeRole.mutate({memberId:m.id,role:e.target.value})}
                              className="text-xs bg-surface-2 border border-border rounded px-2 py-1 text-text-secondary"
                            >
                              {["admin","analyst","viewer"].map(r=><option key={r} value={r}>{r}</option>)}
                            </select>
                            <Button variant="ghost" size="icon" className="text-danger" onClick={()=>removeMutation.mutate(m.id)}>
                              <Trash2 className="h-3.5 w-3.5"/>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Invite form */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-accent"/> Invite New Member
        </h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted"/>
            <input type="email" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} placeholder="colleague@example.com" className="input-field pl-9"/>
          </div>
          <select value={inviteRole} onChange={e=>setInviteRole(e.target.value)} className="input-field w-36">
            {["admin","analyst","viewer"].map(r=><option key={r} value={r}>{r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
          </select>
          <Button
            variant="accent"
            onClick={()=>inviteEmail.trim()&&inviteMutation.mutate({email:inviteEmail.trim(),role:inviteRole})}
            loading={inviteMutation.isPending}
            disabled={!inviteEmail.trim()}
          >
            Send Invite
          </Button>
        </div>
        {inviteMutation.isError && (
          <p className="text-xs text-danger mt-2">Failed to send invite. Please try again.</p>
        )}
        {inviteMutation.isSuccess && (
          <p className="text-xs text-success mt-2">Invite sent successfully!</p>
        )}
      </div>
    </div>
  );
}
