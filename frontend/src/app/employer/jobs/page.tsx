"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Loader2, ChevronRight, Building2, Users } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function EmployerJobsList() {
  const router=useRouter();
  const [jobs,setJobs]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const apiUrl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  const getToken=()=>localStorage.getItem("auth_token")||localStorage.getItem("token");
  useEffect(()=>{
    const fetchJobs=async()=>{
      const token=getToken(); if(!token) return router.push("/login?next=/employer/jobs");
      const res=await fetch(`${apiUrl}/api/employer/jobs`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(res.ok) setJobs(data.data||[]);
      setLoading(false);
    };
    fetchJobs();
  },[]);
  const getStatus=(s:string)=>{
    switch(s){
      case 'pending': return {label:"Mencari Kandidat",cls:"bg-purple-100 text-purple-700"};
      case 'waiting_acceptance': return {label:"Menunggu Pekerja",cls:"bg-yellow-100 text-yellow-700"};
      case 'active': return {label:"Aktif",cls:"bg-blue-100 text-blue-700"};
      case 'waiting_confirmation': return {label:"Menunggu Konfirmasi",cls:"bg-orange-100 text-orange-700"};
      case 'completed': return {label:"Selesai",cls:"bg-green-100 text-green-700"};
      default: return {label:s,cls:"bg-slate-100 text-slate-700"};
    }
  };
  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackHref="/employer/dashboard" label="Kembali ke Dashboard" />
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Building2 className="w-6 h-6 text-primary"/> Pekerjaan Saya</h1>
            <p className="text-slate-600 text-sm">Semua lowongan yang Anda publikasikan (backend: GET /api/employer/jobs).</p>
          </div>
          <div className="flex gap-2">
            <Link href="/employer/profile" className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium hover:bg-slate-50">Profil Perusahaan</Link>
            <Link href="/employer/jobs/create" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover flex items-center gap-2"><PlusCircle className="w-5 h-5"/> Buat Pekerjaan</Link>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {jobs.length===0 ? (
            <div className="p-12 text-center text-slate-500">
              <Users className="w-10 h-10 mx-auto text-slate-300 mb-3"/>
              <p>Belum ada pekerjaan. Buat lowongan pertama Anda.</p>
              <Link href="/employer/jobs/create" className="inline-block mt-4 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium">Buat Sekarang</Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {jobs.map(job=>{
                const st=getStatus(job.status);
                return (
                  <div key={job.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70">
                    <div>
                      <h3 className="font-bold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-1">{job.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                        <span className="text-xs text-slate-500">Rp {Number(job.wage).toLocaleString("id-ID")} • {job.location_address}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/employer/jobs/${job.id}`} className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium hover:bg-white">Detail</Link>
                      <Link href={`/employer/jobs/${job.id}/candidates`} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover inline-flex items-center gap-1">Kandidat <ChevronRight className="w-4 h-4"/></Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
