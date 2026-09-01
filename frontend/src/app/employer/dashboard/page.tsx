import Link from "next/link";
import { PlusCircle, Users, Activity, ChevronRight } from "lucide-react";

export default function EmployerDashboard() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Perusahaan</h1>
            <p className="text-slate-600">Pantau lowongan kerja dan kelola kandidat Anda.</p>
          </div>
          <Link href="/employer/jobs/create" className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Buat Pekerjaan
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Pekerjaan Aktif", value: "3", icon: <Activity className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50" },
            { label: "Kandidat Ditemukan", value: "24", icon: <Users className="w-5 h-5 text-purple-600" />, bg: "bg-purple-50" },
            { label: "Pekerjaan Selesai", value: "8", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Pekerjaan Terakhir Anda</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-medium">Judul Pekerjaan</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Kandidat</th>
                  <th className="py-3 px-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, title: "Data Entry & Transkripsi", status: "Mencari Kandidat", cand: 5 },
                  { id: 2, title: "QA Tester Website", status: "Aktif (Dikerjakan)", cand: 1 },
                ].map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-900">{job.title}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${job.status.includes('Aktif') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{job.cand} orang</td>
                    <td className="py-4 px-4 text-right">
                      <Link href={`/employer/jobs/${job.id}/candidates`} className="text-primary hover:underline font-medium inline-flex items-center">
                        Lihat <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

// Dummy icon to avoid error
function CheckCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}
