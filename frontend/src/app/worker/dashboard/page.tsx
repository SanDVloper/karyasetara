import Link from "next/link";
import { Briefcase, Clock, CheckCircle, Search } from "lucide-react";

export default function WorkerDashboard() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Halo, Budi!</h1>
            <p className="text-slate-600">Selamat datang di dashboard pekerja Anda.</p>
          </div>
          <Link href="/worker/profile" className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            Perbarui Profil
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Pekerjaan Aktif", value: "1", icon: <Briefcase className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50" },
            { label: "Menunggu Konfirmasi", value: "2", icon: <Clock className="w-5 h-5 text-orange-600" />, bg: "bg-orange-50" },
            { label: "Selesai", value: "12", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50" },
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Rekomendasi Pekerjaan (Min-Heap Match)</h2>
            <Link href="/worker/jobs" className="text-primary text-sm font-medium hover:underline">Lihat Semua</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Transkripsi Audio ke Teks", employer: "PT Maju Bersama", match: "98%", distance: "2.1 km", wage: "Rp 50.000" },
              { title: "Review Website Aksesibilitas", employer: "Tech Inklusif", match: "95%", distance: "4.5 km", wage: "Rp 150.000" },
            ].map((job, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center hover:border-primary/30 transition-colors bg-slate-50/50">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500">{job.employer} • Jarak: {job.distance}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-md">Match: {job.match}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-slate-200 text-slate-700 rounded-md">{job.wage}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/worker/jobs/${i}`} className="text-sm font-medium border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">
                  Detail
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
