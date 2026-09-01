"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Loader2, AlertCircle } from "lucide-react";

export default function AdminReports() {
  const [reports,setReports]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  useEffect(()=>{
    const f=async()=>{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/admin/reports`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok) setError(data.message||"Gagal");
      else setReports(data.data||[]);
      setLoading(false);
    };
    f();
  },[]);
  if(loading) return <div className="flex-1 flex items-center justify-center p-10 bg-slate-900 text-white"><Loader2 className="w-8 h-8 animate-spin"/></div>;
  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/admin/dashboard" className="text-slate-400 text-sm hover:text-white">← Dashboard</Link>
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400"/> Semua Laporan (Trust & Safety)</h1>
        {error && <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr><th className="py-3 px-4">ID</th><th className="py-3 px-4">Pelapor → Employer</th><th className="py-3 px-4">Reason</th><th className="py-3 px-4">Prioritas</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {reports.map((r:any)=> (
                <tr key={r.id} className="hover:bg-slate-700/50">
                  <td className="py-3 px-4 font-mono">#{r.id}</td>
                  <td className="py-3 px-4"><span className="text-white">{r.reporter?.name}</span> <span className="text-slate-500">→</span> <span className="text-slate-300">{r.employer?.name||'-'}</span><br/><span className="text-xs text-slate-500">{r.job?.title||'-'}</span></td>
                  <td className="py-3 px-4">{r.reason}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${r.priority==='tinggi'?'bg-red-400/20 text-red-300':r.priority==='sedang'?'bg-yellow-400/20 text-yellow-300':'bg-green-400/20 text-green-300'}`}>{r.priority}</span></td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-slate-700">{r.status}</span></td>
                  <td className="py-3 px-4 text-right"><Link href={`/admin/reports/${r.id}`} className="text-blue-400 hover:underline">Detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length===0 && <div className="p-8 text-center text-slate-400">Belum ada laporan.</div>}
        </div>
      </div>
    </div>
  );
}
