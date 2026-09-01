"use client";

import Link from "next/link";
import { Building2, PlusCircle, Users, Wallet, TrendingUp, ChevronRight, MapPin, Loader2, ShieldCheck, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("Perusahaan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) return router.push("/login");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      // fetch company profile + jobs parallel
      const [profileRes, jobsRes] = await Promise.all([
        fetch(`${apiUrl}/api/employer/profile`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
        fetch(`${apiUrl}/api/employer/jobs`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
      ]);
      if (profileRes.ok) {
        const p = await profileRes.json();
        setCompanyName((p.data || p).name || "Perusahaan");
      }
      if (jobsRes.ok) {
        const d = await jobsRes.json();
        setJobs(d.data || []);
      }
      if (!profileRes.ok && !jobsRes.ok) {
        // token invalid?
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'pending').length,
    waiting: jobs.filter(j => j.status === 'waiting_acceptance' || j.status === 'waiting_confirmation').length,
    active: jobs.filter(j => j.status === 'active').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    lockedWage: jobs.filter(j => j.payment_status === 'locked').reduce((a,b)=> a + Number(b.wage||0),0),
  };

  const pipeline = [
    { label: "Draft / Mencari Kandidat", count: stats.pending, color: "bg-amber-500" },
    { label: "Menunggu / Aktif", count: stats.active + stats.waiting, color: "bg-blue-500" },
    { label: "Selesai (Payment Processing)", count: stats.completed, color: "bg-green-600" },
  ];

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* CORPORATE HEADER - BEDA TOTAL DARI WORKER */}
        <header className="bg-slate-900 text-white p-7 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl" />
          <div className="absolute -right-6 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
          <div className="relative flex flex-col md:flex-row justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs tracking-widest text-slate-400 font-semibold uppercase">Area Perusahaan</p>
                <h1 className="text-2xl font-bold mt-1">{companyName}</h1>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">Rekrut talenta inklusif dengan <span className="text-blue-300 font-semibold">Smart Matching</span> (Bitmask + Haversine) & kelola upah dengan <span className="text-emerald-300 font-semibold">Smart Ledger</span> yang terkunci di database.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link href="/employer/jobs" className="text-xs bg-white text-slate-900 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-100">Pekerjaan Saya →</Link>
                  <Link href="/employer/profile" className="text-xs border border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-800">Profil Perusahaan</Link>
                  <span className="text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Smart Ledger Aktif</span>
                </div>
              </div>
            </div>
            <Link href="/employer/jobs/create" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 flex items-center gap-2 self-start md:self-center">
              <PlusCircle className="w-5 h-5" /> Buat Lowongan Baru
            </Link>
          </div>
        </header>

        {/* STATS CORPORATE */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Total Lowongan</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Semua yang Anda publish</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-amber-700 uppercase">Perlu Tindakan</p>
            <p className="text-3xl font-bold text-amber-700 mt-2">{stats.pending + stats.waiting}</p>
            <p className="text-xs text-amber-600 mt-1">{stats.pending} mencari kandidat • {stats.waiting} menunggu</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase">Talent Terhubung</p>
            <p className="text-3xl font-bold text-blue-700 mt-2">{stats.active}</p>
            <p className="text-xs text-blue-600 mt-1">Sedang dikerjakan</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">Selesai & Dana Cair</p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">{stats.completed}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><Wallet className="w-3 h-3"/> Payment processing</p>
          </div>
        </div>

        {/* PIPELINE + SMART LEDGER INFO - KHAS PERUSAHAAN */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Pipeline Rekrutmen</h2>
            <div className="flex gap-2 mt-4">
              {pipeline.map((p,i)=> (
                <div key={i} className="flex-1">
                  <div className={`h-2 rounded-full ${p.color}`} style={{ opacity: p.count===0?0.2:1 }} />
                  <p className="text-xs font-medium text-slate-600 mt-2">{p.label}</p>
                  <p className="text-xl font-bold text-slate-900">{p.count}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 bg-slate-50 border border-slate-100 p-3 rounded-xl">
              Alur: <b>pending</b> → <b>waiting_acceptance</b> (Anda pilih Made 92% / 1.2km) → <b>active</b> (upah <span className="text-slate-900 font-bold">TERKUNCI</span>) → <b>waiting_confirmation</b> → <b>completed</b> (payment processing).
            </p>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400"/> Smart Ledger</h3>
            <p className="text-sm text-slate-300 mt-2">Upah terkunci permanen di PostgreSQL trigger. Tidak bisa diubah setelah worker ter-assign.</p>
            <div className="mt-4 p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400">Total Upah Terkunci</p>
              <p className="text-lg font-bold text-white">Rp {stats.lockedWage.toLocaleString("id-ID")}</p>
              <p className="text-xs text-emerald-300 mt-1">🔒 {stats.pending+stats.active} pekerjaan terkunci</p>
            </div>
            <Link href="/cara-kerja" className="text-xs text-blue-300 hover:underline mt-3 inline-block">Pelajari cara kerja →</Link>
          </div>
        </div>

        {/* DAFTAR PEKERJAAN - TAMPILAN KORPORAT */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Lowongan Terbaru</h2>
              <p className="text-sm text-slate-500">Kelola kandidat dengan algoritma Min-Heap + Haversine (prioritas jarak & kemampuan).</p>
            </div>
            <Link href="/employer/jobs" className="hidden md:inline-flex text-sm font-medium text-primary hover:underline">Lihat Semua <ChevronRight className="w-4 h-4"/></Link>
          </div>
          <div className="divide-y divide-slate-100">
            {jobs.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3"><Building2 className="w-8 h-8 text-primary"/></div>
                <p className="font-medium text-slate-700">Belum ada lowongan</p>
                <p className="text-sm text-slate-500">Buat lowongan pertama dan sistem akan carikan kandidat 92% match dalam radius aman.</p>
                <Link href="/employer/jobs/create" className="inline-flex mt-4 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium">Buat Sekarang</Link>
              </div>
            )}
            {jobs.slice(0,5).map((job)=> (
              <div key={job.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{job.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${job.status==='pending'?'bg-amber-100 text-amber-700': job.status==='completed'?'bg-emerald-100 text-emerald-700':'bg-blue-100 text-blue-700'}`}>{job.status}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${job.payment_status==='locked'?'bg-slate-800 text-white': job.payment_status==='processing'?'bg-emerald-600 text-white':'bg-orange-500 text-white'}`}>{job.payment_status}</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-1 mt-1">{job.description}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.location_address}</span>
                    <span className="flex items-center gap-1"><Wallet className="w-3 h-3"/> Rp {Number(job.wage).toLocaleString("id-ID")}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {job.worker ? `Ditugaskan: ${job.worker.name}` : "Belum ada kandidat terpilih"}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/employer/jobs/${job.id}`} className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium hover:bg-white bg-white">Detail</Link>
                  <Link href={`/employer/jobs/${job.id}/candidates`} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 inline-flex items-center gap-1">Kandidat <ChevronRight className="w-4 h-4"/></Link>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-500">Tips: Buat lowongan dengan kemampuan spesifik (bitmask) untuk dapat match 92% seperti contoh Made.</p>
            <Link href="/employer/jobs" className="text-sm font-medium text-primary md:hidden">Lihat Semua</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
