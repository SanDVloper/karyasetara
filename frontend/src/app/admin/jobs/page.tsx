"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Loader2, AlertCircle } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminJobs() {
  const [jobs,setJobs]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const [confirmJob,setConfirmJob]=useState<any|null>(null);
  const [confirmLoading,setConfirmLoading]=useState(false);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  const fetchJobs=async()=>{
    const token=getToken();
    const res=await fetch(`${apiUrl}/api/admin/jobs`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
    const data=await res.json();
    if(!res.ok) setError(data.message||"Gagal");
    else setJobs(data.data||[]);
    setLoading(false);
  };
  useEffect(()=>{ fetchJobs(); },[]);
  const toggleSuspend=async()=>{
    if(!confirmJob) return;
    setConfirmLoading(true);
    const token=getToken();
    const res=await fetch(`${apiUrl}/api/admin/jobs/${confirmJob.id}/suspend`,{
      method:"POST",
      headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},
      body:JSON.stringify({is_suspended: !confirmJob.is_suspended})
    });
    const data=await res.json();
    setConfirmLoading(false);
    if(!res.ok) setError(data.message||"Gagal");
    else { setConfirmJob(null); fetchJobs(); }
  };
  if(loading) return <div className="flex-1 flex items-center justify-center p-10 bg-slate-900 text-white"><Loader2 className="w-8 h-8 animate-spin"/></div>;
  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/admin/dashboard" className="text-slate-400 text-sm hover:text-white">← Dashboard</Link>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Briefcase className="w-6 h-6 text-purple-400"/> Kelola Pekerjaan</h1>
        {error && <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr><th className="py-3 px-4">ID</th><th className="py-3 px-4">Judul</th><th className="py-3 px-4">Employer</th><th className="py-3 px-4">Status</th><th className="py-3 px-4">Payment</th><th className="py-3 px-4">Suspend</th><th className="py-3 px-4 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {jobs.map((j:any)=> (
                <tr key={j.id} className="hover:bg-slate-700/50">
                  <td className="py-3 px-4 font-mono">#{j.id}</td>
                  <td className="py-3 px-4 text-white">{j.title}</td>
                  <td className="py-3 px-4 text-slate-400">{j.employer?.name || j.employer_id}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-slate-700">{j.status}</span></td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-slate-700">{j.payment_status}</span></td>
                  <td className="py-3 px-4">{j.is_suspended ? <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-300">suspended</span> : <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">active</span>}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={()=>setConfirmJob(j)} className={`text-xs px-3 py-1 rounded-lg font-medium ${j.is_suspended?'bg-green-600 text-white':'bg-red-600 text-white'}`}>{j.is_suspended?'Aktifkan':'Suspend'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length===0 && <div className="p-8 text-center text-slate-400">Belum ada pekerjaan.</div>}
        </div>
      </div>
      <ConfirmModal open={!!confirmJob} title={confirmJob?.is_suspended ? "Aktifkan pekerjaan?" : "Suspend pekerjaan?"} description={confirmJob ? (confirmJob.is_suspended ? `Aktifkan "${confirmJob.title}"? Pekerjaan akan kembali bisa dilihat worker.` : `Suspend "${confirmJob.title}"? Pekerjaan tidak akan tampil di rekomendasi & tidak bisa diambil.`) : ""} confirmText={confirmJob?.is_suspended ? "Ya, Aktifkan" : "Ya, Suspend"} variant={confirmJob?.is_suspended ? "success" : "danger"} loading={confirmLoading} onConfirm={toggleSuspend} onClose={()=>setConfirmJob(null)} />
    </div>
  );
}
