import Link from "next/link";
import { UserPlus, Search, Send, CheckCircle, ShieldCheck, Heart, Lock, Flag, ArrowRight } from "lucide-react";

export default function CaraKerjaPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-primary px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm mb-6">
            <Heart className="w-3.5 h-3.5" /> Platform Pencarian Kerja Inklusif
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Cara Kerja <span className="text-primary">KaryaSetara</span>
          </h1>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Langkah mudah untuk menemukan pekerjaan yang tepat — dirancang inklusif untuk Teman Tuli, Teman Netra, Disabilitas Fisik, dan Lansia. Ikuti Golden Flow resmi dari pedoman.
          </p>
          <div className="flex justify-center gap-3 mt-8">
            <Link href="/register" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover shadow-lg shadow-blue-500/20 inline-flex items-center gap-2">
              Mulai Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tentang" className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50">Tentang Kami</Link>
          </div>
        </div>
      </section>

      {/* Steps - sesuai FLOW.txt & referensi image 1 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold text-center text-slate-900">4 Langkah Utama</h2>
          <p className="text-center text-slate-500 text-sm mt-2">Seperti di Landing Page, tapi dijelaskan lebih detail.</p>
          <div className="grid md:grid-cols-4 gap-6 mt-10 relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-200" />
            {[
              { n: "01", icon: <UserPlus className="w-6 h-6 text-primary" />, title: "Buat Profil", desc: "Daftar, pilih role Worker/Employer, lengkapi matriks kemampuan (bitmasking) dan lokasi radius." },
              { icon: <Search className="w-6 h-6 text-primary" />, n: "02", title: "Temukan Peluang", desc: "Sistem matching (skill + Haversine + priority) beri rekomendasi pekerjaan dengan Match Score & jarak." },
              { icon: <Send className="w-6 h-6 text-primary" />, n: "03", title: "Lamar dengan Mudah", desc: "Employer pilih kandidat terbaik → Worker terima tawaran. Upah langsung dikunci di Smart Ledger." },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, n: "04", title: "Dapatkan Kesempatan", desc: "Kerjakan → tandai selesai → Employer konfirmasi → pembayaran diproses." },
            ].map((s) => (
              <div key={s.title} className="relative bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">{s.icon}</div>
                <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-full">{s.n}</span>
                <h3 className="font-bold text-slate-900 mt-3">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Flow detail */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 text-center">Golden Flow (End-to-End)</h2>
          <p className="text-center text-sm text-slate-500 mt-2">Alur wajib dari UC-01 s/d UC-12 — sesuai `PEDOMAN/FLOW.txt`</p>
          <ol className="mt-8 space-y-4">
            {[
              "Employer Login → Buat Pekerjaan (judul, deskripsi, kemampuan, lokasi, upah Rp50.000 → Publish)",
              "Sistem Matching: skill matching → hitung jarak Haversine → priority ranking → Match Score (contoh: Made 92% / 1,2 km / 5/5 kemampuan)",
              "Employer melihat Kandidat & alasan rekomendasi → Pilih Made",
              "Worker Login → Menerima Pekerjaan → Pekerjaan Aktif → Upah TERKUNCI (Smart Ledger)",
              "Worker tandai Selesai → Menunggu Konfirmasi",
              "Employer Konfirmasi Selesai → Payment Status = Processing ✓",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 text-center">Trust & Safety</h2>
          <p className="text-center text-sm text-slate-500 mt-2 max-w-2xl mx-auto">Keamanan dan keadilan adalah prioritas — sesuai UC-13 s/d UC-15.</p>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: "Verifikasi Perusahaan", desc: "Perusahaan diverifikasi kredibilitasnya." },
              { icon: <Heart className="w-5 h-5 text-primary" />, title: "Kesetaraan & Inklusi", desc: "Bitmasking tanpa label kekurangan." },
              { icon: <Lock className="w-5 h-5 text-primary" />, title: "Smart Ledger", desc: "Upah dikunci via PostgreSQL Trigger, anti-eksploitasi." },
              { icon: <Flag className="w-5 h-5 text-primary" />, title: "Laporan & Moderasi", desc: "Worker lapor → Admin tinjau → Tindakan tegas." },
            ].map((f) => (
              <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/worker/reports" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
              Pelajari cara melapor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 bg-slate-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-white font-bold text-xl">Siap mencoba KaryaSetara?</h3>
          <p className="text-slate-400 text-sm mt-2">Bergabung bersama 15.000+ talenta lainnya.</p>
          <Link href="/register" className="inline-block mt-6 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover">Daftar Sekarang</Link>
        </div>
      </section>
    </div>
  );
}
