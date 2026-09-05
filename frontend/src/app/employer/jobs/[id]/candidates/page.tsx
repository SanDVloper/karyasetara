"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, CheckCircle, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import BackButton from "@/components/BackButton";

export default function CandidatesList() {
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<number|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [message, setMessage] = useState<string|null>(null);
  const [confirmWorker, setConfirmWorker] = useState<any|null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const getToken = () => localStorage.getItem("auth_token") || localStorage.getItem("token");

  const fetchData = async()=>{
    try{
      const token=getToken();
      if(!token) return router.push("/login");
      // fetch job info
      const jobRes = await fetch(`${apiUrl}/api/employer/jobs/${id}`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const jobData = await jobRes.json();
      if(jobRes.ok) setJob(jobData.data||jobData);
      // fetch candidates
      const res = await fetch(`${apiUrl}/api/employer/jobs/${id}/candidates`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data = await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal memuat kandidat");
      setCandidates(data.data||[]);
    }catch(e:any){setError(e.message)} finally{setLoading(false)}
  };
  useEffect(()=>{fetchData()},[id]);

  const selectWorker = async(workerId:number)=>{
    setSelecting(workerId); setError(null);
    try{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/employer/jobs/${id}/select-worker`,{
        method:"POST",
        headers:{Authorization:`Bearer ${token}`,Accept:"application/json","Content-Type":"application/json"},
        body: JSON.stringify({worker_id: workerId})
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal memilih pekerja");
      setMessage(`Berhasil memilih pekerja! Status pekerjaan: ${data.data?.status || data.status}`);
      setTimeout(()=>router.push(`/employer/jobs/${id}`),1500);
    }catch(e:any){setError(e.message)} finally{setSelecting(null)}
  };

  const decodeCapabilities = (bitmask:number)=>{
    const caps=[];
    if(bitmask & 1) caps.push("Visual");
    if(bitmask & 2) caps.push("Audio");
    if(bitmask & 4) caps.push("Motorik");
    if(bitmask & 8) caps.push("Komunikasi");
    return caps.join(", ")||"Umum";
  };

  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackHref={`/employer/jobs/${id}`} label="Kembali ke Detail" />
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kandidat Teratas</h1>
            <p className="text-slate-600">{job?.title || "Pekerjaan"} (Match hasil Min-Heap & Haversine)</p>
          </div>
        </div>

        {message && <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex gap-2"><CheckCircle className="w-5 h-5"/>{message}</div>}
        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

        {candidates.length===0 && !error && <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">Belum ada kandidat yang memenuhi syarat kemampuan & radius. Coba ubah syarat kemampuan atau lokasi pekerjaan.</div>}

        <div className="space-y-4">
          {candidates.map((c, idx)=>(
            <div key={c.id} className={`bg-white border ${idx===0?'border-yellow-300 shadow-md':'border-slate-200'} rounded-2xl p-6 relative overflow-hidden`}>
              {idx===0 && <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Prioritas #1</div>}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border-2 border-white shadow-sm flex-shrink-0">{c.name?.[0]}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                    <p className="text-slate-600 font-medium text-sm">{c.email || decodeCapabilities(c.capability_bitmask)} • {c.address || "Tanpa alamat"}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                      <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-md"><MapPin className="w-4 h-4" /> {c.distance? Number(c.distance).toFixed(2)+' km' : '-'}</span>
                      <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-md font-bold"><CheckCircle className="w-4 h-4" /> {c.match_score || 100}% Match</span>
                      <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded-md text-xs">Kemampuan: {decodeCapabilities(c.capability_bitmask)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <button onClick={()=>setConfirmWorker(c)} disabled={!!selecting} className={`${idx===0?'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-blue-500/30':'bg-slate-100 text-slate-800 hover:bg-slate-200'} font-bold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2`}>
                    {selecting===c.id ? <Loader2 className="w-5 h-5 animate-spin"/> : null} Pilih Pekerja Ini
                  </button>
                  <span className="text-xs text-slate-500 text-center">Skor Prioritas: {Math.max(0, 1000 - (Number(c.distance||0)*10)).toFixed(0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmModal
        open={!!confirmWorker}
        title="Pilih pekerja ini?"
        description={confirmWorker ? `Pilih ${confirmWorker.name} untuk "${job?.title || "pekerjaan ini"}"? Status akan jadi Menunggu Penerimaan & upah terkunci di Smart Ledger. Aksi tidak bisa dibatalkan.` : ""}
        confirmText="Ya, Pilih"
        variant="primary"
        loading={!!selecting}
        onConfirm={()=>{ if(confirmWorker){ selectWorker(confirmWorker.id); setConfirmWorker(null);} }}
        onClose={()=>setConfirmWorker(null)}
      />
    </div>
  );
}
