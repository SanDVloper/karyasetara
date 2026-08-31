import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function RekomendasiPekerjaan() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Rekomendasi Pekerjaan</h1>
          <p className="text-slate-600">Daftar pekerjaan yang paling sesuai dengan matriks kemampuan Anda.</p>
        </header>

        <div className="space-y-4">
          {[
            { id: 1, title: "Transkripsi Audio ke Teks", employer: "PT Maju Bersama", match: "98%", distance: "2.1 km", wage: "Rp 50.000", req: "Visual, Pendengaran" },
            { id: 2, title: "Review Website Aksesibilitas", employer: "Tech Inklusif", match: "95%", distance: "4.5 km", wage: "Rp 150.000", req: "Visual, Kognitif" },
            { id: 3, title: "Admin Input Data", employer: "Toko Sinar Jaya", match: "88%", distance: "1.2 km", wage: "Rp 80.000", req: "Visual, Motorik" },
          ].map((job) => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <p className="text-slate-500 font-medium">{job.employer}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <MapPin className="w-4 h-4" /> {job.distance}
                    </span>
                    <span className="text-green-700 bg-green-100 px-2.5 py-1 rounded-md font-bold">
                      Match: {job.match}
                    </span>
                    <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      Syarat: {job.req}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-lg font-bold text-slate-900">{job.wage}</span>
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
