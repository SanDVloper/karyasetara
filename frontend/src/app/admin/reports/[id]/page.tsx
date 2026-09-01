"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";

export default function AdminReportDetail() {
  const { id } = useParams<{id:string}>();
  const router=useRouter();
  const [report,setReport]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [msg,setMsg]=useState<string|null>(null);
  const [form,setForm]=useState({ status:"pending", admin_notes:"", action:"none" });
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");

  const fetchReport=async()=>{
    const token=getToken();
    const res=await fetch(`${apiUrl}/api/admin/reports/${id}`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
    const data=await res.json();
    if(!res.ok) setError(data.message||"Gagal");
    else { setReport(data.data||data); setForm({ status:data.data?.status||data.status, admin_notes:data.data?.admin_notes||"", action:"none" }); }
    setLoading(false);
  };
  useEffect(()=>{ fetchReport(); },[]);

  const handleUpdate=async()=>{
    setSaving(true); setError(null); setMsg(null);
    try{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/admin/reports/${id}`,{
        method:"PUT",
        headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},
        body:JSON.stringify(form)
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||JSON.stringify(data.errors));
      setReport(data.data||data);
      setMsg(`Status diperbarui: ${data.data?.status||form.status} | Aksi: ${form.action}`);
    }catch(e:any){ setError(e.message); } finally{ setSaving(false); }
  };

  if(loading) return <div className="flex-1 flex items-center justify-center p-10 bg-slate-900 text-white"><Loader2 className="w-8 h-8 animate-spin"/></div>;
  if(error && !report) return <div className="flex-1 p-6 bg-slate-900 text-white"><div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div></div>;
  if(!report) return null;

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin/reports" className="text-slate-400 hover:text-white text-sm">← Semua Laporan</Link>
        <header className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400"/> Laporan #{report.id}</h1>
          <p className="text-slate-400 text-sm mt-1">Pelapor: {report.reporter?.name} ({report.reporter?.email}) → Employer: {report.employer?.name || '-'} • Job: {report.job?.title || '-'}</p>
          <p className="text-xs text-slate-500 mt-2">Dibuat: {new Date(report.created_at).toLocaleString('id-ID')}</p>
        </header>

        {msg && <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-200 rounded-xl flex gap-2"><CheckCircle className="w-5 h-5"/>{msg}</div>}
        {error && <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <div>
            <p className="text-sm text-slate-400">Alasan</p><p className="font-bold text-white">{report.reason} <span className={`ml-2 text-xs px-2 py-1 rounded-full ${report.priority==='tinggi'?'bg-red-500 text-white':report.priority==='sedang'?'bg-yellow-500 text-slate-900':'bg-green-500 text-white'}`}>{report.priority}</span> <span className="ml-1 text-xs bg-slate-700 px-2 py-1 rounded-full">{report.status}</span></p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Deskripsi</p><p className="text-slate-200 bg-slate-900/50 p-3 rounded-xl border border-slate-700">{report.description}</p>
          </div>
          {report.evidence_url && <div><p className="text-sm text-slate-400">Bukti</p><a href={report.evidence_url} target="_blank" className="text-blue-400 hover:underline">Lihat Bukti</a></div>}
          {report.job && <div className="text-sm text-slate-400">Job terkait: <span className="text-white">{report.job.title} — {report.job.location_address} — Rp {Number(report.job.wage).toLocaleString('id-ID')}</span></div>}
        </section>

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="font-bold text-white">Moderasi (UC-15)</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Status Laporan</label>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white">
              <option value="pending">pending</option>
              <option value="investigating">investigating</option>
              <option value="resolved">resolved (Tetap Aktif)</option>
              <option value="warning">warning (Peringatan ringan)</option>
              <option value="suspended">suspended (Nonaktif)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tindakan Moderasi</label>
            <select value={form.action} onChange={e=>setForm({...form,action:e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white">
              <option value="none">none - Tidak ada</option>
              <option value="warning">warning - Beri peringatan</option>
              <option value="suspend_job">suspend_job - Nonaktifkan Pekerjaan</option>
              <option value="suspend_employer">suspend_employer - Nonaktifkan Akun Employer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Catatan Admin</label>
            <textarea value={form.admin_notes} onChange={e=>setForm({...form,admin_notes:e.target.value})} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Hasil investigasi..."/>
          </div>
          <button onClick={handleUpdate} disabled={saving} className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 flex items-center justify-center gap-2 disabled:opacity-60">
            {saving?<Loader2 className="w-5 h-5 animate-spin"/>: <ShieldAlert className="w-5 h-5"/>} Simpan Keputusan Moderasi
          </button>
        </section>
      </div>
    </div>
  );
}
