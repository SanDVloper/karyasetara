import Link from "next/link";
import { Briefcase, Search, ArrowLeft, Ban, Eye, MapPin, DollarSign, AlertTriangle } from "lucide-react";

export default function AdminJobsPage() {
  const jobs = [
    { id: "JOB-001", title: "Data Entry & Transkripsi", employer: "PT Maju Bersama", wage: "Rp 50.000", status: "Aktif", loc: "-6.20, 106.81", candidates: 5, reports: 0 },
    { id: "JOB-002", title: "QA Tester Website", employer: "Tech Inklusif", wage: "Rp 120.000", status: "Aktif", loc: "-6.21, 106.82", candidates: 3, reports: 1 },
    { id: "JOB-003", title: "Desain Banner Promosi", employer: "Toko Sinar Jaya", wage: "Rp 80.000", status: "Dinonaktifkan", loc: "-6.19, 106.80", candidates: 2, reports: 2 },
  ];

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 hover:bg-slate-800 rounded-full"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Briefcase className="w-6 h-6 text-purple-400" /> Pekerjaan — Moderasi Lowongan</h1>
        </div>
        <p className="text-sm text-slate-400 -mt-4 ml-11">PAGE.txt: Admin / Pekerjaan — UC-15 opsi Menonaktifkan Pekerjaan jika terbukti bermasalah.</p>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input placeholder="Cari judul pekerjaan atau perusahaan..." className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500" />
          </div>
          <select className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm"><option>Semua Status</option><option>Aktif</option><option>Dinonaktifkan</option></select>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Pekerjaan</th>
                  <th className="py-3 px-4">Upah</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">Kandidat</th>
                  <th className="py-3 px-4">Laporan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-700/40">
                    <td className="py-4 px-4 font-mono text-slate-400">{j.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white">{j.title}</p>
                      <p className="text-xs text-slate-400">{j.employer}</p>
                    </td>
                    <td className="py-4 px-4 text-white font-medium flex items-center gap-1"><DollarSign className="w-3 h-3 text-slate-500" /> {j.wage}</td>
                    <td className="py-4 px-4 text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {j.loc}</td>
                    <td className="py-4 px-4 text-center">{j.candidates}</td>
                    <td className="py-4 px-4 text-center">
                      {j.reports > 0 ? <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded-full text-xs"><AlertTriangle className="w-3 h-3" /> {j.reports}</span> : <span className="text-slate-500 text-xs">0</span>}
                    </td>
                    <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${j.status === "Aktif" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>{j.status}</span></td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs border border-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-700 inline-flex items-center gap-1"><Eye className="w-3 h-3" /> Detail</button>
                        <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 inline-flex items-center gap-1"><Ban className="w-3 h-3" /> Nonaktifkan</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
