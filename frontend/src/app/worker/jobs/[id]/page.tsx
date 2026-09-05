"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import BackButton from "@/components/BackButton";

export default function WorkerJobDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"accept"|"reject"|"complete"|null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const getToken = () => localStorage.getItem("auth_token") || localStorage.getItem("token");

  const fetchJob = async () => {
    try {
      const token = getToken();
      if (!token) return router.push("/login");
      const res = await fetch(`${apiUrl}/api/worker/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memuat detail pekerjaan");
      // JobResource may wrap in data
      setJob(data.data || data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJob(); }, [id]);

  const callAction = async (action: "accept" | "reject" | "complete") => {
    setActionLoading(action);
    setError(null);
    setMessage(null);
    try {
      const token = getToken();
      const res = await fetch(`${apiUrl}/api/worker/jobs/${id}/${action}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json", "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Gagal ${action}`);
      setJob(data.data || data);
      setMessage(action === "accept" ? "Pekerjaan diterima! Status: Aktif" : action === "reject" ? "Pekerjaan ditolak" : "Pekerjaan selesai, menunggu konfirmasi employer");
      if (action === "accept" || action === "complete") setTimeout(()=>router.push("/worker/my-jobs"), 1200);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (error && !job) return <div className="flex-1 p-6 max-w-3xl mx-auto"><div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div><div className="mt-4"><BackButton fallbackHref="/worker/jobs" label="Kembali ke Rekomendasi" /></div></div>;
  if (!job) return null;

  const status = job.status;
  const wage = job.wage ? Number(job.wage).toLocaleString("id-ID") : "0";

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <BackButton fallbackHref="/worker/jobs" label="Kembali" />

        {message && <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex gap-2"><CheckCircle className="w-5 h-5"/>{message}</div>}
        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-2"><AlertCircle className="w-5 h-5"/>{error}</div>}

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${status==='pending'?'bg-slate-100 text-slate-700': status==='waiting_acceptance'?'bg-yellow-100 text-yellow-700': status==='active'?'bg-blue-100 text-blue-700': status==='waiting_confirmation'?'bg-orange-100 text-orange-700':'bg-green-100 text-green-700'}`}>{status}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Rp {wage}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.payment_status==='locked'?'bg-slate-800 text-white': job.payment_status==='waiting_confirmation'?'bg-orange-500 text-white':'bg-green-600 text-white'}`}>Payment: {job.payment_status}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
          <p className="text-slate-600 mt-2">{job.description}</p>

          <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-sm">
            <div className="flex gap-2 items-center text-slate-600"><Briefcase className="w-4 h-4 text-primary"/> Employer: {job.employer?.name || "-"}</div>
            <div className="flex gap-2 items-center text-slate-600"><MapPin className="w-4 h-4 text-primary"/> {job.location_address || `${job.latitude}, ${job.longitude}`} {job.distance ? `(${Number(job.distance).toFixed(2)} km)` : ""}</div>
            <div className="text-slate-500">Upah Terkunci (Smart Ledger): Rp {wage}</div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {status === "waiting_acceptance" && (
              <>
                <button onClick={()=>setPendingAction("accept")} disabled={!!actionLoading} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover disabled:opacity-60 flex items-center justify-center gap-2">{actionLoading==="accept"?<Loader2 className="w-5 h-5 animate-spin"/>:<CheckCircle className="w-5 h-5"/>} Terima Pekerjaan</button>
                <button onClick={()=>setPendingAction("reject")} disabled={!!actionLoading} className="px-6 py-3 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 disabled:opacity-60 flex items-center gap-2">{actionLoading==="reject"?<Loader2 className="w-5 h-5 animate-spin"/>:<XCircle className="w-5 h-5"/>} Tolak</button>
              </>
            )}
            {status === "active" && (
              <button onClick={()=>setPendingAction("complete")} disabled={!!actionLoading} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2">{actionLoading==="complete"?<Loader2 className="w-5 h-5 animate-spin"/>:<CheckCircle className="w-5 h-5"/>} Tandai Selesai</button>
            )}
            {status === "pending" && <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl w-full text-center">Menunggu employer memilih kandidat. Anda akan menerima penawaran jika terpilih.</p>}
            {status === "waiting_confirmation" && <p className="text-sm text-orange-700 bg-orange-50 p-3 rounded-xl w-full text-center">Menunggu konfirmasi employer. Pembayaran akan diproses setelah dikonfirmasi.</p>}
            {status === "completed" && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-xl w-full text-center flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5"/> Pekerjaan selesai & pembayaran diproses.</p>}
          </div>
        </div>
      </div>
      <ConfirmModal open={pendingAction==="accept"} title="Terima pekerjaan ini?" description={`Terima "${job.title}"? Upah Rp ${wage} akan TERKUNCI di Smart Ledger & status jadi Aktif.`} confirmText="Ya, Terima" variant="primary" loading={actionLoading==="accept"} onConfirm={()=>{ const a="accept"; setPendingAction(null); callAction(a); }} onClose={()=>setPendingAction(null)} />
      <ConfirmModal open={pendingAction==="reject"} title="Tolak tawaran?" description="Tolak tawaran? Pekerjaan akan ditawarkan ke kandidat lain dan tidak bisa dibatalkan." confirmText="Ya, Tolak" variant="warning" loading={actionLoading==="reject"} onConfirm={()=>{ const a="reject"; setPendingAction(null); callAction(a); }} onClose={()=>setPendingAction(null)} />
      <ConfirmModal open={pendingAction==="complete"} title="Tandai selesai?" description="Tandai selesai? Employer akan diminta konfirmasi & payment akan jadi Waiting Confirmation." confirmText="Ya, Selesai" variant="success" loading={actionLoading==="complete"} onConfirm={()=>{ const a="complete"; setPendingAction(null); callAction(a); }} onClose={()=>setPendingAction(null)} />
    </div>
  );
}
