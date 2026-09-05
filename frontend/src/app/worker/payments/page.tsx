"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wallet, CheckCircle, Clock, AlertCircle, Loader2, DollarSign } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function WorkerPayments() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) return router.push("/login");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/worker/my-jobs`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.data) setJobs(data.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const getPaymentDisplay = (payment_status: string, status: string) => {
    if (payment_status === "locked") return { text: "Terkunci (Smart Ledger)", icon: <Wallet className="w-4 h-4 text-slate-600" />, bg: "bg-slate-800 text-white" };
    if (payment_status === "waiting_confirmation") return { text: "Menunggu Konfirmasi", icon: <Clock className="w-4 h-4 text-orange-600" />, bg: "bg-orange-100 text-orange-700" };
    if (payment_status === "processing" || status === "completed") return { text: "Diproses / Cair", icon: <CheckCircle className="w-4 h-4 text-green-600" />, bg: "bg-green-100 text-green-700" };
    return { text: payment_status, icon: <DollarSign className="w-4 h-4" />, bg: "bg-slate-100 text-slate-700" };
  };

  if (loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  const totalLocked = jobs.filter(j => j.payment_status === "locked").reduce((a,b)=> a+Number(b.wage||0),0);
  const totalProcessing = jobs.filter(j => j.payment_status === "processing" || j.status==="completed").reduce((a,b)=> a+Number(b.wage||0),0);

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <BackButton fallbackHref="/worker/dashboard" label="Kembali ke Dashboard" />
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Wallet className="w-6 h-6 text-primary"/> Pembayaran</h1>
          <p className="text-slate-600 text-sm">Riwayat upah terkunci di Smart Ledger & yang sudah diproses.</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-slate-900 text-white p-4 rounded-xl">
              <p className="text-xs text-slate-400">Terkunci</p>
              <p className="text-lg font-bold">Rp {totalLocked.toLocaleString("id-ID")}</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
              <p className="text-xs text-green-700">Diproses / Cair</p>
              <p className="text-lg font-bold text-green-700">Rp {totalProcessing.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          {jobs.length===0 && <div className="text-center p-8 text-slate-500 bg-white rounded-2xl border border-slate-200">Belum ada data pembayaran.</div>}
          {jobs.map(job => {
            const pay = getPaymentDisplay(job.payment_status, job.status);
            return (
              <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-500">{job.employer?.name || "Perusahaan"} • Rp {Number(job.wage).toLocaleString("id-ID")}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${pay.bg}`}>{pay.icon} {pay.text}</span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{job.status}</span>
                  </div>
                </div>
                <Link href={`/worker/jobs/${job.id}`} className="text-sm text-primary font-medium hover:underline self-start md:self-center px-4 py-2 bg-blue-50 rounded-lg">Detail</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
