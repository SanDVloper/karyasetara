"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Flag, Plus, Loader2, AlertCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function WorkerReports() {
  const [reports,setReports]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  useEffect(()=>{
    const fetchR=async()=>{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/worker/reports`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok) setError(data.message||"Gagal");
      else setReports(data.data||[]);
      setLoading(false);
    };
    fetchR();
  },[]);
  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <BackButton fallbackHref="/worker/dashboard" label="Kembali ke Dashboard" />
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Flag className="w-6 h-6 text-primary"/> Laporan Saya</h1>
            <p className="text-slate-600 text-sm">Daftar laporan pekerjaan/employer yang Anda buat (Trust & Safety).</p>
          </div>
          <Link href="/worker/reports/create" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Plus className="w-5 h-5"/> Buat Laporan</Link>
        </header>
        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}
        {reports.length===0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            <Flag className="w-10 h-10 mx-auto text-slate-300 mb-3"/>
            <p>Belum ada laporan. Jika menemukan pekerjaan/employer bermasalah, buat laporan di sini.</p>
            <Link href="/worker/reports/create" className="mt-4 inline-block bg-primary text-white px-6 py-2.5 rounded-xl text-sm">Buat Laporan Pertama</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map(r=> (
              <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-slate-900">#{r.id} — {r.reason}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{r.description}</p>
                    <p className="text-xs text-slate-500 mt-2">Job: {r.job?.title || '-'} • Employer: {r.employer?.name || '-'} • {new Date(r.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                  <span className={`h-fit text-xs px-3 py-1 rounded-full font-bold ${r.status==='pending'?'bg-amber-100 text-amber-700':r.status==='resolved'?'bg-green-100 text-green-700':r.status==='warning'?'bg-yellow-100 text-yellow-700':'bg-slate-100 text-slate-700'}`}>{r.status}</span>
                </div>
                {r.admin_notes && <p className="text-sm bg-blue-50 border border-blue-100 p-3 rounded-xl mt-3"><b>Catatan Admin:</b> {r.admin_notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
