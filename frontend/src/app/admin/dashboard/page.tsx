"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Users, Briefcase, Activity, Loader2, AlertCircle, CheckCircle, Flag } from "lucide-react";

export default function AdminDashboard() {
  const [stats,setStats]=useState<any>(null);
  const [reports,setReports]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  const fetchData=async()=>{
    const token=getToken();
    try{
      const sRes=await fetch(`${apiUrl}/api/admin/stats`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const sJson=await sRes.json();
      if(!sRes.ok) throw new Error(sJson.message||"Gagal stats");
      setStats(sJson.data);
      const rRes=await fetch(`${apiUrl}/api/admin/reports`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const rJson=await rRes.json();
      if(rRes.ok) setReports((rJson.data||[]).slice(0,5));
    }catch(e:any){ setError(e.message);} finally{ setLoading(false); }
  };
  useEffect(()=>{ fetchData(); },[]);
  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-white"/></div>;
  if(error) return <div className="flex-1 p-6"><div className="max-w-3xl mx-auto p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div></div>;

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400"/> Trust & Safety Admin</h1>
            <p className="text-slate-400 text-sm">Moderasi laporan, suspend job/employer, pantau Smart Ledger.</p>
            <p className="text-xs text-slate-500 mt-1">Backend: <code className="bg-slate-700 px-1 rounded">GET /api/admin/stats</code> • role admin strict</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/admin/reports" className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-medium">Semua Laporan ({stats?.reports_total ?? 0})</Link>
            <Link href="/admin/users" className="border border-slate-600 px-4 py-2 rounded-xl text-sm">Kelola User</Link>
            <Link href="/admin/jobs" className="border border-slate-600 px-4 py-2 rounded-xl text-sm">Kelola Job</Link>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Laporan Pending", value: stats?.reports_pending ?? 0, icon: <ShieldAlert className="w-5 h-5 text-red-400"/>, bg:"bg-red-500/10 border-red-500/20" },
            { label: "Pekerja Aktif", value: stats?.workers_active ?? 0, icon: <Users className="w-5 h-5 text-blue-400"/>, bg:"bg-blue-500/10 border-blue-500/20" },
            { label: "Perusahaan Aktif", value: stats?.employers_active ?? 0, icon: <Briefcase className="w-5 h-5 text-purple-400"/>, bg:"bg-purple-500/10 border-purple-500/20" },
            { label: "Job Selesai", value: stats?.jobs_completed ?? 0, icon: <Activity className="w-5 h-5 text-green-400"/>, bg:"bg-green-500/10 border-green-500/20" },
          ].map((stat,i)=> (
            <div key={i} className={`p-5 rounded-2xl border ${stat.bg} flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">{stat.icon}</div>
              <div><p className="text-sm text-slate-400">{stat.label}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Job Berlangsung</p><p className="text-xl font-bold text-white">{stats?.jobs_active}</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Job Pending</p><p className="text-xl font-bold text-white">{stats?.jobs_pending}</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Anomali Smart Ledger</p><p className="text-xl font-bold text-amber-400">{stats?.anomalies}</p>
          </div>
        </div>

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Flag className="w-5 h-5 text-red-400"/> Antrean Laporan Terbaru</h2>
            <Link href="/admin/reports" className="text-blue-400 text-sm hover:underline">Lihat Semua →</Link>
          </div>
          {reports.length===0 ? (
            <div className="text-center py-8 text-slate-400 border border-dashed border-slate-700 rounded-xl">
              <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2"/>
              Tidak ada laporan pending. Sistem aman.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/50 text-slate-400 border-y border-slate-700">
                  <tr><th className="py-3 px-4">ID</th><th className="py-3 px-4">Pelapor</th><th className="py-3 px-4">Alasan</th><th className="py-3 px-4">Prioritas</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Aksi</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {reports.map((r:any)=> (
                    <tr key={r.id} className="hover:bg-slate-700/50">
                      <td className="py-3 px-4 font-mono text-slate-300">#{r.id}</td>
                      <td className="py-3 px-4 text-white">{r.reporter?.name || r.reporter_id}</td>
                      <td className="py-3 px-4 text-slate-400">{r.reason}</td>
                      <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${r.priority==='tinggi'?'bg-red-400/20 text-red-300':r.priority==='sedang'?'bg-yellow-400/20 text-yellow-300':'bg-green-400/20 text-green-300'}`}>{r.priority}</span></td>
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">{r.status}</span></td>
                      <td className="py-3 px-4 text-right"><Link href={`/admin/reports/${r.id}`} className="text-blue-400 hover:text-blue-300">Investigasi</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
