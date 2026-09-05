"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, Loader2, AlertCircle, Upload } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function CreateReport() {
  const router=useRouter();
  const [jobs,setJobs]=useState<any[]>([]);
  const [form,setForm]=useState({ job_id:"", reason:"kata_kasar", description:"", priority:"sedang" });
  const [file,setFile]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");

  useEffect(()=>{
    const token=getToken();
    fetch(`${apiUrl}/api/worker/my-jobs`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}})
      .then(r=>r.json()).then(d=> setJobs(d.data||[])).catch(()=>{});
  },[]);

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setError(null);
    try{
      const token=getToken();
      const fd=new FormData();
      if(form.job_id) fd.append("job_id", form.job_id);
      fd.append("reason", form.reason);
      fd.append("description", form.description);
      fd.append("priority", form.priority);
      if(file) fd.append("evidence", file);
      const res=await fetch(`${apiUrl}/api/worker/reports`,{method:"POST", headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}, body:fd});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||JSON.stringify(data.errors));
      router.push("/worker/reports");
    }catch(e:any){ setError(e.message); } finally{ setLoading(false); }
  };

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <BackButton fallbackHref="/worker/reports" label="Kembali ke Laporan" />
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Flag className="w-6 h-6 text-primary"/> Buat Laporan</h1>
          <p className="text-slate-600 text-sm">Laporkan pekerjaan/employer bermasalah. Admin akan meninjau (UC-13).</p>
        </header>

        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan Terkait (opsional)</label>
            <select value={form.job_id} onChange={e=>setForm({...form,job_id:e.target.value})} className="w-full border border-slate-300 rounded-xl p-3 text-sm">
              <option value="">-- Tanpa pekerjaan spesifik --</option>
              {jobs.map((j:any)=><option key={j.id} value={j.id}>{j.title} (#{j.id})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alasan Laporan</label>
            <select value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} className="w-full border border-slate-300 rounded-xl p-3 text-sm" required>
              <option value="kata_kasar">Kata Kasar / Pelecehan</option>
              <option value="penipuan">Penipuan</option>
              <option value="pelecehan">Pelecehan</option>
              <option value="tidak_merespons">Tidak Merespons</option>
              <option value="diskriminasi">Diskriminasi</option>
              <option value="lain">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prioritas</label>
            <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} className="w-full border border-slate-300 rounded-xl p-3 text-sm">
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi (min 10 karakter)</label>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} required minLength={10} className="w-full border border-slate-300 rounded-xl p-3 text-sm" placeholder="Jelaskan kronologi..."/>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bukti (opsional, jpg/png/pdf max 5MB)</label>
            <label className="flex items-center gap-2 border border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:bg-slate-50">
              <Upload className="w-5 h-5 text-slate-500"/>
              <span className="text-sm text-slate-600">{file ? file.name : "Pilih file / bukti screenshot"}</span>
              <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" className="hidden" onChange={e=>setFile(e.target.files?.[0]||null)}/>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover flex items-center justify-center gap-2 disabled:opacity-60">
            {loading? <Loader2 className="w-5 h-5 animate-spin"/>: <Flag className="w-5 h-5"/>} Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
}
