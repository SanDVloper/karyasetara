"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Loader2, AlertCircle, ShieldAlert } from "lucide-react";

export default function AdminUsers() {
  const [users,setUsers]=useState<any[]>([]);
  const [filter,setFilter]=useState("all");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  const fetchUsers=async()=>{
    const token=getToken();
    const url= filter==="all" ? `${apiUrl}/api/admin/users` : `${apiUrl}/api/admin/users?role=${filter}`;
    const res=await fetch(url,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
    const data=await res.json();
    if(!res.ok) setError(data.message||"Gagal");
    else setUsers(data.data||[]);
    setLoading(false);
  };
  useEffect(()=>{ fetchUsers(); },[filter]);
  const toggleSuspend=async(u:any)=>{
    const token=getToken();
    const res=await fetch(`${apiUrl}/api/admin/users/${u.id}/suspend`,{
      method:"POST",
      headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},
      body:JSON.stringify({is_suspended: !u.is_suspended})
    });
    const data=await res.json();
    if(!res.ok) alert(data.message||"Gagal");
    else fetchUsers();
  };
  if(loading) return <div className="flex-1 flex items-center justify-center p-10 bg-slate-900 text-white"><Loader2 className="w-8 h-8 animate-spin"/></div>;
  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/admin/dashboard" className="text-slate-400 text-sm hover:text-white">← Dashboard</Link>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-blue-400"/> Kelola User (Employer & Pekerja)</h1>
          <select value={filter} onChange={e=>{setLoading(true); setFilter(e.target.value);}} className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-sm text-white">
            <option value="all">Semua</option>
            <option value="worker">Worker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr><th className="py-3 px-4">ID</th><th className="py-3 px-4">Nama</th><th className="py-3 px-4">Email</th><th className="py-3 px-4">Role</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u:any)=> (
                <tr key={u.id} className="hover:bg-slate-700/50">
                  <td className="py-3 px-4 font-mono">#{u.id}</td>
                  <td className="py-3 px-4 text-white">{u.name}</td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-slate-700">{u.role}</span></td>
                  <td className="py-3 px-4">{u.is_suspended ? <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-300">suspended</span> : <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">active</span>}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={()=>toggleSuspend(u)} className={`text-xs px-3 py-1 rounded-lg font-medium ${u.is_suspended?'bg-green-600 text-white':'bg-red-600 text-white'}`}>
                      {u.is_suspended ? 'Aktifkan' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length===0 && <div className="p-8 text-center text-slate-400">Tidak ada user.</div>}
        </div>
      </div>
    </div>
  );
}
