import Link from "next/link";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function MyJobs() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Pekerjaan Saya</h1>
          <p className="text-slate-600">Pantau status pekerjaan yang sedang Anda tangani.</p>
        </header>

        <div className="space-y-4">
          {[
            { id: 1, title: "Transkripsi Audio ke Teks", employer: "PT Maju Bersama", status: "Aktif (Sedang Dikerjakan)", icon: <Clock className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50 text-blue-700" },
            { id: 2, title: "Review Website Aksesibilitas", employer: "Tech Inklusif", status: "Menunggu Konfirmasi", icon: <AlertCircle className="w-5 h-5 text-orange-600" />, bg: "bg-orange-50 text-orange-700" },
            { id: 3, title: "Admin Input Data", employer: "Toko Sinar Jaya", status: "Selesai (Upah Diterima)", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-50 text-green-700" },
          ].map((job) => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                <p className="text-slate-500 font-medium mb-3">{job.employer}</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold ${job.bg}`}>
                  {job.icon} {job.status}
                </span>
              </div>
              <Link href={`/worker/my-jobs/${job.id}`} className="text-primary font-medium hover:underline px-4 py-2 bg-blue-50 rounded-lg md:bg-transparent md:p-0 text-center">
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
