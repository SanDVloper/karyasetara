import { ArrowLeft, MapPin, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CandidatesList() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex items-center gap-4 mb-6">
          <Link href="/employer/dashboard" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kandidat Teratas</h1>
            <p className="text-slate-600">Data Entry & Transkripsi (Match hasil Min-Heap & Haversine)</p>
          </div>
        </div>

        <div className="space-y-4">
          
          <div className="bg-white border border-yellow-300 shadow-md rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Prioritas #1
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Siti Aminah</h3>
                  <p className="text-slate-600 font-medium">Disabilitas Rungu (Teman Tuli)</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <MapPin className="w-4 h-4" /> 1.2 km
                    </span>
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-md font-bold">
                      <CheckCircle className="w-4 h-4" /> 100% Match Capability
                    </span>
                    <span className="text-blue-700 font-medium bg-blue-100 px-2 py-1 rounded-md">
                      Skor Prioritas: 988
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 transition-colors">
                  Pilih Pekerja Ini
                </button>
                <button className="bg-white text-slate-700 border border-slate-300 font-medium px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  Lihat Profil Lengkap
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Bapak Suparjo</h3>
                  <p className="text-slate-600 font-medium">Lansia (Geriatri)</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <MapPin className="w-4 h-4" /> 3.4 km
                    </span>
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-md font-bold">
                      <CheckCircle className="w-4 h-4" /> 100% Match Capability
                    </span>
                    <span className="text-slate-700 font-medium bg-slate-100 px-2 py-1 rounded-md">
                      Skor Prioritas: 966
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-slate-100 text-slate-800 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                  Pilih Pekerja Ini
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
