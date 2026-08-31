import { ShieldAlert, Users, Briefcase, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-400" />
              Trust & Safety Admin
            </h1>
            <p className="text-slate-400">Pusat komando moderasi dan keamanan platform KaryaSetara.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Laporan Baru", value: "3", icon: <ShieldAlert className="w-5 h-5 text-red-400" />, bg: "bg-red-500/10 border-red-500/20" },
            { label: "Pekerja Aktif", value: "128", icon: <Users className="w-5 h-5 text-blue-400" />, bg: "bg-blue-500/10 border-blue-500/20" },
            { label: "Perusahaan Aktif", value: "45", icon: <Briefcase className="w-5 h-5 text-purple-400" />, bg: "bg-purple-500/10 border-purple-500/20" },
            { label: "Job Berlangsung", value: "89", icon: <Activity className="w-5 h-5 text-green-400" />, bg: "bg-green-500/10 border-green-500/20" },
          ].map((stat, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${stat.bg} flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-6">Antrean Laporan (Moderasi)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-slate-400 border-y border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-medium">ID Laporan</th>
                  <th className="py-3 px-4 font-medium">Pelapor</th>
                  <th className="py-3 px-4 font-medium">Kategori</th>
                  <th className="py-3 px-4 font-medium">Prioritas</th>
                  <th className="py-3 px-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  { id: "REP-001", reporter: "Siti Aminah (Worker)", cat: "Pelecehan / Kata Kasar", prio: "Tinggi", color: "text-red-400 bg-red-400/10" },
                  { id: "REP-002", reporter: "PT Maju Bersama (Employer)", cat: "Pekerja Tidak Merespons", prio: "Sedang", color: "text-yellow-400 bg-yellow-400/10" },
                ].map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-300">{rep.id}</td>
                    <td className="py-4 px-4 text-white font-medium">{rep.reporter}</td>
                    <td className="py-4 px-4 text-slate-400">{rep.cat}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${rep.color}`}>
                        {rep.prio}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 font-medium">
                        Investigasi
                      </button>
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
