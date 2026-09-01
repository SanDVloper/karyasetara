import Link from "next/link";
import { MapPin, FileText, Clock, Calendar, ShieldCheck, Bookmark, ArrowLeft, User, Star } from "lucide-react";

export default function WorkerJobRecommendationDetail() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back */}
        <Link href="/worker/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Rekomendasi
        </Link>

        {/* Header - style mengikuti REFERENCE image 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-5">
              <div className="w-20 h-20 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-10 h-10 text-purple-600" />
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-semibold border border-blue-100 mb-3">
                  Pekerjaan Rekomendasi
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transkripsi Audio</h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> 1.2 km dari lokasimu</span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">Rp50.000</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-xs">Tipe: Mikro Task</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-xs"><Clock className="w-3 h-3" /> Estimasi: 1–2 jam</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-xs"><Calendar className="w-3 h-3" /> Diposting: 2 hari lalu</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                  <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full">Mikro Task</span>
                  <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full">1–2 jam</span>
                  <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full">2 hari lalu</span>
                </div>
              </div>
            </div>

            {/* Match Circle - 91% seperti referensi */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90">
                  <circle cx="56" cy="56" r="52" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                  <circle cx="56" cy="56" r="52" stroke="#1d4ed8" strokeWidth="8" fill="none" strokeDasharray={`${91*3.267} 326.7`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900">91%</span>
                  <span className="text-xs font-bold text-primary tracking-widest">MATCH</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center max-w-[160px]">Sangat cocok dengan profilmu</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6">
          {/* Left */}
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-3">Deskripsi Pekerjaan</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dengarkan audio yang diberikan dan ubah menjadi teks dengan akurat. Pastikan ejaan, tanda baca, dan format sesuai dengan instruksi. Audio berdurasi ±15 menit, perkiraan 2.000 kata, tingkat kesulitan: Mudah. Cocok untuk pekerja teliti yang nyaman bekerja dari rumah.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Bahasa</p><p className="font-semibold text-slate-900">Bahasa Indonesia</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Durasi Audio</p><p className="font-semibold text-slate-900">± 15 menit</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Jumlah Kata</p><p className="font-semibold text-slate-900">± 2.000 kata</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Tingkat Kesulitan</p><p className="font-semibold text-slate-900">Mudah</p>
                </div>
              </div>
            </section>

            <section className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Kemampuan yang dibutuhkan</h2>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Mendengarkan dengan teliti",
                  "Mengetik cepat dan akurat",
                  "Pemahaman bahasa Indonesia yang baik",
                  "Teliti terhadap detail",
                  "Disiplin dan mampu bekerja tepat waktu",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right - Kenapa cocok */}
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900">Kenapa pekerjaan ini cocok?</h2>
              <p className="text-xs text-slate-500 mt-1 mb-5">Berdasarkan profil dan preferensimu, berikut alasan pekerjaan ini cocok untukmu.</p>
              <div className="space-y-5">
                {[
                  { icon: <User className="w-5 h-5 text-indigo-600" />, bg: "bg-indigo-50", label: "Skill Compatibility", desc: "Kecocokan kemampuanmu dengan pekerjaan ini", value: 92, color: "bg-indigo-600" },
                  { icon: <MapPin className="w-5 h-5 text-green-600" />, bg: "bg-green-50", label: "Jarak", desc: "Lokasi pekerjaan yang dekat dengan lokasimu", value: 88, color: "bg-green-600" },
                  { icon: <Star className="w-5 h-5 text-orange-500" />, bg: "bg-orange-50", label: "Prioritas", desc: "Pekerjaan ini sesuai dengan preferensi dan riwayatmu", value: 90, color: "bg-orange-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-xl ${row.bg} flex items-center justify-center flex-shrink-0`}>{row.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{row.label}</p>
                        <p className="text-xs text-slate-500">{row.desc}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{row.value}%</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2">
                <span className="text-amber-500">★</span>
                <p className="text-xs text-amber-800">Pekerjaan ini banyak diminati oleh pekerja lain dengan kemampuan serupa.</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                <div>
                  <p className="font-bold text-slate-900">Aman & Terpercaya</p>
                  <p className="text-xs text-slate-500">Pembayaran dijamin aman setelah pekerjaan selesai dan disetujui. Upah dikunci di Smart Ledger.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/20 transition-colors">
                  Terima Pekerjaan
                </button>
                <button className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50">
                  <Bookmark className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <Link href="/worker/reports" className="text-center text-xs text-slate-500 hover:text-red-600">Laporkan jika ada kejanggalan</Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
