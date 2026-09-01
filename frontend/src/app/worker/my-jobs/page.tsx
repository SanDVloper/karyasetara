"use client";

import Link from "next/link";
import { Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) return router.push("/login");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/worker/my-jobs`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'waiting_acceptance': return { text: "Menunggu Persetujuan Anda", icon: <AlertCircle className="w-5 h-5 text-yellow-600" />, bg: "bg-yellow-50 text-yellow-700" };
      case 'active': return { text: "Aktif (Sedang Dikerjakan)", icon: <Clock className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50 text-blue-700" };
      case 'waiting_confirmation': return { text: "Menunggu Konfirmasi Employer", icon: <AlertCircle className="w-5 h-5 text-orange-600" />, bg: "bg-orange-50 text-orange-700" };
      case 'completed': return { text: "Selesai", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50 text-green-700" };
      default: return { text: status, icon: <Clock className="w-5 h-5 text-slate-600" />, bg: "bg-slate-50 text-slate-700" };
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Pekerjaan Saya</h1>
          <p className="text-slate-600">Pantau status pekerjaan yang sedang Anda tangani.</p>
        </header>

        <div className="space-y-4">
          {jobs.length === 0 && (
            <div className="text-center p-8 text-slate-500 bg-white rounded-2xl border border-slate-200">
               Belum ada pekerjaan yang Anda ambil.
            </div>
          )}

          {jobs.map((job) => {
            const display = getStatusDisplay(job.status);
            return (
              <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <p className="text-slate-500 font-medium mb-3">{job.employer?.name || "Perusahaan"}</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold ${display.bg}`}>
                    {display.icon} {display.text}
                  </span>
                </div>
                {/* Note: using worker/jobs/[id] because it handles the detailed view for worker */}
                <Link href={`/worker/jobs/${job.id}`} className="text-primary font-medium hover:underline px-4 py-2 bg-blue-50 rounded-lg md:bg-transparent md:p-0 text-center">
                  Lihat Detail
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
