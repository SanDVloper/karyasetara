"use client";
import Link from "next/link";
import { Briefcase, Clock, CheckCircle, Search, MapPin, Accessibility, Flag, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WorkerDashboard() {
  const [userName, setUserName] = useState("Pekerja");
  const [stats, setStats] = useState({ active: 0, waiting: 0, done: 0 });
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("auth_token") || localStorage.getItem("token") : null);

  useEffect(() => {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      try { setUserName(JSON.parse(userRaw).name || "Pekerja"); } catch {}
    }
    const fetchData = async () => {
      const token = getToken();
      if (!token) { setLoading(false); return; }
      try {
        const [recRes, myRes] = await Promise.all([
          fetch(`${apiUrl}/api/worker/jobs/recommended`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
          fetch(`${apiUrl}/api/worker/my-jobs`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
        ]);
        if (recRes.ok) {
          const jd = await recRes.json();
          setRecommended((jd.data || []).slice(0, 2));
        } else {
          const jd = await recRes.json().catch(()=>({}));
          if (recRes.status===400) setError(jd.message || null);
        }
        if (myRes.ok) {
          const md = await myRes.json();
          const jobs = md.data || [];
          setStats({
            active: jobs.filter((j:any)=> j.status==='active' || j.status==='waiting_acceptance').length,
            waiting: jobs.filter((j:any)=> j.status==='waiting_confirmation').length,
            done: jobs.filter((j:any)=> j.status==='completed').length,
          });
        }
      } catch (e:any) { setError(e.message); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Halo, {userName}!</h1>
            <p className="text-slate-600">Selamat datang di dashboard pekerja Anda. Pantau rekomendasi & status pekerjaan.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/worker/profile" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover">Perbarui Profil</Link>
            <Link href="/worker/accessibility" className="border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 flex items-center gap-1"><Accessibility className="w-4 h-4"/> Aksesibilitas</Link>
          </div>
        </header>

        {error && <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex gap-2 text-sm"><AlertCircle className="w-5 h-5"/> {error} — <Link href="/worker/profile" className="underline font-medium">Lengkapi profil</Link></div>}

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Pekerjaan Aktif", value: stats.active, icon: <Briefcase className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50" },
            { label: "Menunggu Konfirmasi", value: stats.waiting, icon: <Clock className="w-5 h-5 text-orange-600" />, bg: "bg-orange-50" },
            { label: "Selesai", value: stats.done, icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>{stat.icon}</div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/worker/jobs" className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary/40 flex items-center gap-3">
            <Search className="w-5 h-5 text-primary"/><span className="font-medium text-slate-800">Rekomendasi Pekerjaan</span>
          </Link>
          <Link href="/worker/my-jobs" className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary/40 flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-primary"/><span className="font-medium text-slate-800">Pekerjaan Saya</span>
          </Link>
          <Link href="/worker/reports" className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary/40 flex items-center gap-3">
            <Flag className="w-5 h-5 text-primary"/><span className="font-medium text-slate-800">Laporan Saya (Trust & Safety)</span>
          </Link>
        </div>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Rekomendasi Pekerjaan (Smart Matching)</h2>
            <Link href="/worker/jobs" className="text-primary text-sm font-medium hover:underline">Lihat Semua</Link>
          </div>
          {recommended.length===0 ? (
            <div className="text-center py-10 text-slate-500 border border-dashed border-slate-200 rounded-xl">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2"/>
              <p className="text-sm">Belum ada rekomendasi. Lengkapi profil & kemampuan untuk mendapatkan match.</p>
              <Link href="/worker/profile" className="text-primary text-sm hover:underline mt-2 inline-block">Atur Profil & Kemampuan</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recommended.map((job:any)=> (
                <div key={job.id} className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-3 hover:border-primary/30 bg-slate-50/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary"><Search className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3"/>{job.location_address} • {job.distance ? Number(job.distance).toFixed(1)+' km' : '-'} </p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-md">Match: {job.match_score ?? 100}%</span>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-200 text-slate-700 rounded-md">Rp {Number(job.wage).toLocaleString("id-ID")}</span>
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">{job.payment_status}</span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/worker/jobs/${job.id}`} className="self-start md:self-center text-sm font-medium border border-slate-200 px-5 py-2 rounded-xl hover:bg-white bg-white">Detail</Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
