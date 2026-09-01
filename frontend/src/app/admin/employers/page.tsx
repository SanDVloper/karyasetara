import Link from "next/link";
import { Building, Search, ArrowLeft, Ban, ShieldCheck, MapPin, Briefcase } from "lucide-react";

export default function AdminEmployersPage() {
  const employers = [
    { id: "EMP-001", name: "PT Maju Bersama", email: "hr@majubersama.co.id", jobs: 5, status: "Aktif", color: "bg-green-500/10 text-green-400 border-green-500/20", loc: "-6.20, 106.81" },
    { id: "EMP-002", name: "Tech Inklusif", email: "contact@techinklusif.id", jobs: 3, status: "Peringatan", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", loc: "-6.21, 106.82" },
    { id: "EMP-003", name: "Toko Sinar Jaya", email: "toko@sinarjaya.com", jobs: 2, status: "Nonaktif", color: "bg-red-500/10 text-red-400 border-red-500/20", loc: "-6.19, 106.80" },
  ];

  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 hover:bg-slate-800 rounded-full"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Building className="w-6 h-6 text-blue-400" /> Employer — Manajemen Akun</h1>
        </div>
        <p className="text-sm text-slate-400 -mt-4 ml-11">PAGE.txt: Admin / Employer — moderasi akun employer (UC-15: Nonaktifkan Akun Employer).</p>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input placeholder="Cari perusahaan atau email..." className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500" />
          </div>
          <select className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm"><option>Semua Status</option><option>Aktif</option><option>Peringatan</option><option>Nonaktif</option></select>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Perusahaan</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4">Lowongan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {employers.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-700/40">
                    <td className="py-4 px-4 font-mono text-slate-400">{e.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white flex items-center gap-2"><Building className="w-4 h-4 text-slate-500" /> {e.name}</p>
                      <p className="text-xs text-slate-400">{e.email}</p>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.loc}</td>
                    <td className="py-4 px-4 flex items-center gap-1"><Briefcase className="w-4 h-4 text-slate-500" /> {e.jobs}</td>
                    <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${e.color}`}>{e.status}</span></td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs border border-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-700 inline-flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Detail</button>
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
