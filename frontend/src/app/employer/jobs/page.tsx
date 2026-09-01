import Link from "next/link";
import { PlusCircle, Search, Filter, Briefcase, MapPin, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function EmployerJobsList() {
  const jobs = [
    { id: 1, title: "Data Entry & Transkripsi", status: "Mencari Kandidat", color: "bg-blue-100 text-blue-700 border-blue-200", cand: 5, wage: "Rp 50.000", loc: "-6.20, 106.81", date: "30 Agu 2026" },
    { id: 2, title: "QA Tester Website", status: "Aktif (Dikerjakan)", color: "bg-green-100 text-green-700 border-green-200", cand: 1, wage: "Rp 120.000", loc: "-6.21, 106.82", date: "28 Agu 2026" },
    { id: 3, title: "Desain Banner Promosi", status: "Menunggu Konfirmasi", color: "bg-orange-100 text-orange-700 border-orange-200", cand: 1, wage: "Rp 80.000", loc: "-6.19, 106.80", date: "25 Agu 2026" },
    { id: 4, title: "Input Data Pelanggan", status: "Selesai", color: "bg-slate-100 text-slate-700 border-slate-200", cand: 3, wage: "Rp 75.000", loc: "-6.22, 106.83", date: "20 Agu 2026" },
  ];

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Briefcase className="w-6 h-6 text-primary" /> Pekerjaan Saya</h1>
            <p className="text-sm text-slate-600 mt-1">Kelola semua lowongan yang pernah kamu buat — sesuai <span className="font-medium">PAGE.txt: Employer / Pekerjaan Saya</span></p>
          </div>
          <Link href="/employer/jobs/create" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover inline-flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Buat Pekerjaan
          </Link>
        </header>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Cari judul pekerjaan..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white">
            <option>Semua Status</option>
            <option>Mencari Kandidat</option>
            <option>Aktif</option>
            <option>Menunggu Konfirmasi</option>
            <option>Selesai</option>
          </select>
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50"><Filter className="w-4 h-4" /> Filter</button>
        </div>

        {/* Stats mini */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Pekerjaan", value: "4", icon: <Briefcase className="w-4 h-4 text-blue-600" /> },
            { label: "Mencari Kandidat", value: "1", icon: <Users className="w-4 h-4 text-blue-600" /> },
            { label: "Aktif", value: "1", icon: <Clock className="w-4 h-4 text-green-600" /> },
            { label: "Selesai", value: "1", icon: <CheckCircle className="w-4 h-4 text-slate-600" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">{s.icon}</div>
              <div><p className="text-xs text-slate-500">{s.label}</p><p className="font-bold text-slate-900">{s.value}</p></div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5 font-medium">Judul</th>
                  <th className="py-3 px-5 font-medium">Status</th>
                  <th className="py-3 px-5 font-medium">Upah</th>
                  <th className="py-3 px-5 font-medium">Kandidat</th>
                  <th className="py-3 px-5 font-medium">Tanggal</th>
                  <th className="py-3 px-5 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50">
                    <td className="py-4 px-5">
                      <p className="font-semibold text-slate-900">{j.title}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {j.loc}</p>
                    </td>
                    <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${j.color}`}>{j.status}</span></td>
                    <td className="py-4 px-5 font-medium text-slate-900">{j.wage}</td>
                    <td className="py-4 px-5 text-slate-600">{j.cand} orang</td>
                    <td className="py-4 px-5 text-slate-500 text-xs">{j.date}</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/employer/jobs/${j.id}`} className="text-xs font-medium border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">Detail</Link>
                        <Link href={`/employer/jobs/${j.id}/candidates`} className="text-xs font-medium bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-hover">Kandidat</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link href="/employer/dashboard" className="text-sm text-slate-500 hover:text-primary">← Kembali ke Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
