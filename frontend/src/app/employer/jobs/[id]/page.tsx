"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Briefcase, MapPin, Loader2, AlertCircle, ArrowLeft, Users } from "lucide-react";

export default function EmployerJobDetail() {
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [message, setMessage] = useState<string|null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const getToken = () => localStorage.getItem("auth_token") || localStorage.getItem("token");

  const fetchJob = async()=>{
    try{
      const token=getToken();
      if(!token) return router.push("/login");
      const res=await fetch(`${apiUrl}/api/employer/jobs/${id}`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal memuat pekerjaan");
      setJob(data.data||data);
    }catch(e:any){setError(e.message)} finally{setLoading(false)}
  };
  useEffect(()=>{fetchJob()},[id]);

  const confirmCompletion=async()=>{
    setConfirmLoading(true); setError(null);
    try{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/employer/jobs/${id}/confirm-completion`,{method:"POST",headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal konfirmasi");
      setJob(data.data||data);
      setMessage("Konfirmasi berhasil! Pembayaran diproses.");
    }catch(e:any){setError(e.message)} finally{setConfirmLoading(false)}
  };

  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;
  if(error && !job) return <div className="flex-1 p-6 max-w-3xl mx-auto"><div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div></div>;
  if(!job) return null;
  const wage = job.wage? Number(job.wage).toLocaleString("id-ID"):"0";

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/employer/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"><ArrowLeft className="w-4 h-4"/> Kembali ke Dashboard</Link>
        {message && <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex gap-2"><CheckCircle className="w-5 h-5"/>{message}</div>}
        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

        <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-bl-xl text-sm">Status: {job.status}</div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">{job.title}</h1>
          <p className="text-slate-500 mt-1">Dibuat pada: {new Date(job.created_at).toLocaleDateString("id-ID")}</p>
          <p className="text-slate-600 mt-3">{job.description}</p>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Pekerja Ditugaskan:</p>
              {job.worker ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{job.worker.name?.[0]}</div>
                  <div>
                    <p className="font-bold text-slate-900">{job.worker.name}</p>
                    <p className="text-xs text-slate-600">{job.worker.email}</p>
                  </div>
                </div>
              ) : <p className="text-sm text-slate-500 italic">Belum ada pekerja terpilih. <Link href={`/employer/jobs/${id}/candidates`} className="text-primary hover:underline">Lihat Kandidat</Link></p>}
            </div>
            <div className="flex-1 md:border-l border-slate-100 md:pl-4">
              <p className="text-sm font-medium text-slate-500 mb-1">Smart Ledger (Upah):</p>
              <p className="font-bold text-xl text-slate-900">Rp {wage} <span className="text-xs font-normal text-white bg-slate-800 px-2 py-1 rounded ml-2">{job.payment_status}</span></p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.location_address}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {job.status==="pending" && <Link href={`/employer/jobs/${id}/candidates`} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-hover"><Users className="w-5 h-5"/> Lihat Kandidat</Link>}
          </div>
        </header>

        {job.status==="waiting_confirmation" && (
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900">Pekerjaan Sudah Selesai?</h2>
            <p className="text-slate-600 max-w-md mx-auto mt-2 mb-8">
              Jika pekerja telah menyelesaikan tugasnya dengan baik, klik tombol di bawah ini. Upah yang terkunci di Smart Ledger akan otomatis dicairkan ke saldo pekerja.
            </p>
            <button onClick={confirmCompletion} disabled={confirmLoading} className="bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all text-lg flex items-center gap-2 mx-auto disabled:opacity-60">
              {confirmLoading? <Loader2 className="w-6 h-6 animate-spin"/>: <CheckCircle className="w-6 h-6" />}
              Konfirmasi Selesai & Cairkan Dana
            </button>
          </section>
        )}
        {job.status==="completed" && (
          <section className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2"/>
            <p className="font-bold text-green-800">Pekerjaan Selesai - Pembayaran Diproses</p>
          </section>
        )}

        <section className="text-center">
          <Link href="#" className="text-sm text-slate-500 flex items-center justify-center gap-1 hover:text-red-600 transition-colors">
            <AlertTriangle className="w-4 h-4" /> Laporkan masalah (Trust & Safety)
          </Link>
        </section>

      </div>
    </div>
  );
}
