import Link from "next/link";
import { ShieldAlert, Search, Filter, ArrowLeft, Clock, AlertTriangle } from "lucide-react";

export default function AdminReportsList() {
  const reports = [
    { id: "REP-001", reporter: "Siti Aminah (Worker)", target: "PT Maju Bersama / Data Entry", cat: "Pelecehan / Kata Kasar", status: "Menunggu Review", prio: "Tinggi", color: "bg-red-500/10 text-red-400 border-red-500/20", date: "31 Agu 2026" },
    { id: "REP-002", reporter: "PT Maju Bersama (Employer)", target: "Budi Santoso / QA Tester", cat: "Pekerja Tidak Merespons", status: "Menunggu Review", prio: "Sedang", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", date: "30 Agu 2026" },
    { id: "REP-003", reporter: "Made (Worker)", target: "Toko Sinar Jaya", cat: "Pekerjaan Fiktif / Penipuan", status: "Diproses", prio: "Tinggi", color: "bg-red-500/10 text-red-400 border-red-500/20", date: "29 Agu 2026" },
  ];

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 rounded-full hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400" /> Laporan — Trust & Safety</h1>
        </div>
        <p className="text-sm text-slate-400 -mt-4 ml-11">PAGE.txt: Admin / Laporan — daftar semua laporan masuk (UC-14).</p>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input placeholder="Cari ID, pelapor, atau kategori..." className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm">
            <option>Semua Status</option>
            <option>Menunggu Review</option>
            <option>Diproses</option>
            <option>Selesai</option>
          </select>
          <button className="px-4 py-2.5 border border-slate-700 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-700"><Filter className="w-4 h-4" /> Prioritas</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Menunggu Review", value: "2", color: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400" },
            { label: "Diproses", value: "1", color: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
            { label: "Selesai Bulan Ini", value: "5", color: "border-green-500/20 bg-green-500/10 text-green-400" },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.color} flex items-center justify-between`}>
              <span className="text-sm font-medium">{s.label}</span><span className="text-xl font-bold">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">ID Laporan</th>
                  <th className="py-3 px-4">Pelapor</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Prioritas</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-700/40">
                    <td className="py-4 px-4 font-mono text-blue-300">{r.id}</td>
                    <td className="py-4 px-4 text-white font-medium">{r.reporter}</td>
                    <td className="py-4 px-4 text-slate-400">{r.target}</td>
                    <td className="py-4 px-4 text-slate-300">{r.cat}</td>
                    <td className="py-4 px-4"><span className={`px-2 py-1 rounded-full text-xs font-bold border ${r.color}`}>{r.prio}</span></td>
                    <td className="py-4 px-4"><span className="inline-flex items-center gap-1 text-xs bg-slate-700 px-2 py-1 rounded-full"><Clock className="w-3 h-3" /> {r.status}</span></td>
                    <td className="py-4 px-4 text-right"><Link href={`/admin/reports/${r.id}`} className="text-blue-400 hover:text-blue-300 font-semibold">Detail →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-900/30 flex items-center gap-2 text-xs text-slate-400">
            <AlertTriangle className="w-4 h-4 text-yellow-400" /> Klik Detail untuk meninjau bukti & melakukan moderasi (UC-15).
          </div>
        </div>
      </div>
    </div>
  );
}
