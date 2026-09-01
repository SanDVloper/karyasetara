"use client";

import Link from "next/link";
import { Search, MapPin, Briefcase, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RekomendasiPekerjaan() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) return router.push("/login");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/worker/jobs/recommended`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      
      if (res.ok && data.data) {
        setJobs(data.data);
      } else {
        setError(data.message || "Gagal mengambil data.");
      }
    } catch (err) {
      setError("Kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const decodeCapabilities = (bitmask: number) => {
    const caps = [];
    if (bitmask & 1) caps.push("Visual");
    if (bitmask & 2) caps.push("Audio");
    if (bitmask & 4) caps.push("Motorik");
    if (bitmask & 8) caps.push("Komunikasi");
    return caps.length > 0 ? caps.join(", ") : "Umum";
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Rekomendasi Pekerjaan</h1>
          <p className="text-slate-600">Daftar pekerjaan yang paling sesuai dengan matriks kemampuan Anda.</p>
        </header>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        <div className="space-y-4">
          {jobs.length === 0 && !error && (
             <div className="text-center p-8 text-slate-500 bg-white rounded-2xl border border-slate-200">
               Belum ada pekerjaan yang sesuai dengan profil atau Anda belum mengatur lokasi profil Anda.
             </div>
          )}

          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <p className="text-slate-500 font-medium">{job.employer?.name || "Perusahaan"}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <MapPin className="w-4 h-4" /> {job.distance ? parseFloat(job.distance).toFixed(1) + " km" : "Lokasi Tidak Diketahui"}
                    </span>
                    <span className="text-green-700 bg-green-100 px-2.5 py-1 rounded-md font-bold">
                      Match: 100%
                    </span>
                    <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      Syarat: {decodeCapabilities(job.required_capability_bitmask)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-lg font-bold text-slate-900">Rp {parseFloat(job.wage).toLocaleString("id-ID")}</span>
                <Link href={`/worker/jobs/${job.id}`} className="bg-primary text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-hover shadow-md shadow-blue-500/20 text-center w-full md:w-auto">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
