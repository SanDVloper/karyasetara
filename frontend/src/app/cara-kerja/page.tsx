import Link from "next/link";
import { UserPlus, Search, Users, CheckCircle, Briefcase, ShieldCheck } from "lucide-react";

export default function CaraKerja() {
  const employerFlow = [
    { step: "1", title: "Daftar & Login Employer", desc: "Buat akun perusahaan dengan role employer." },
    { step: "2", title: "Buat Pekerjaan", desc: 'Isi judul, deskripsi, kemampuan dibutuhkan (bitmask), lokasi, dan upah Rp (Smart Ledger).' },
    { step: "3", title: "Sistem Matching", desc: "ALGORITMA: Skill Matching (bitwise AND) + Haversine jarak + Priority Score → Match Score." },
    { step: "4", title: "Lihat Kandidat", desc: "Daftar terurut: 92% Made (1.2km), prioritas 988, kemampuan 5/5 terpenuhi." },
    { step: "5", title: "Pilih Worker", desc: "Klik Pilih → status waiting_acceptance." },
  ];
  const workerFlow = [
    { step: "1", title: "Lengkapi Profil", desc: "Pilih kemampuan (Visual/Audio/Motorik/Komunikasi), isi alamat & GPS, atur aksesibilitas." },
    { step: "2", title: "Dapat Rekomendasi", desc: "Halaman /worker/jobs menampilkan pekerjaan pending dengan jarak terdekat." },
    { step: "3", title: "Terima / Tolak", desc: "Jika dipilih employer, terima → status active (upah locked)." },
    { step: "4", title: "Kerjakan & Selesai", desc: "Tandai selesai → waiting_confirmation." },
    { step: "5", title: "Employer Konfirmasi → Pembayaran Diproses", desc: "Employer confirm → completed & payment processing (anti-tamper trigger)." },
  ];
  return (
    <div className="flex-1 bg-white">
      <div className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-slate-900">Cara Kerja <span className="text-primary">KaryaSetara</span></h1>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Alur lengkap inklusif: Employer → Sistem Matching (Bitmasking + Haversine + Min-Heap) → Worker → Smart Ledger.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl grid md:grid-cols-2 gap-8">
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Briefcase className="w-6 h-6 text-primary"/> Alur Employer</h2>
          <ol className="mt-4 space-y-4">
            {employerFlow.map(s=> (
              <li key={s.step} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm shrink-0">{s.step}</span>
                <div><p className="font-semibold text-slate-900">{s.title}</p><p className="text-sm text-slate-600">{s.desc}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><UserPlus className="w-6 h-6 text-primary"/> Alur Worker</h2>
          <ol className="mt-4 space-y-4">
            {workerFlow.map(s=> (
              <li key={s.step} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">{s.step}</span>
                <div><p className="font-semibold text-slate-900">{s.title}</p><p className="text-sm text-slate-600">{s.desc}</p></div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2"><ShieldCheck className="w-6 h-6 text-blue-400"/> Trust & Safety Flow</h2>
          <p className="text-center text-slate-400 mt-2">Worker lapor → upload bukti → Admin review → Tindakan (warning / suspend job / suspend employer).</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href="/worker/reports/create" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-medium">Buat Laporan</Link>
            <Link href="/admin/dashboard" className="bg-primary text-white px-6 py-3 rounded-xl font-medium">Admin Moderasi</Link>
            <Link href="/tentang" className="border border-slate-700 px-6 py-3 rounded-xl font-medium">Tentang Smart Ledger</Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-5xl text-center">
        <h3 className="font-bold text-slate-900">Smart Ledger & Matching Detail</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl mx-auto text-left md:text-center leading-relaxed">
          <b>Bitmasking:</b> kemampuan 1=Visual,2=Audio,4=Motorik,8=Komunikasi. Worker 15 (1111) cocok untuk job 9 (1001). Query SQL: <code className="bg-slate-100 px-1 rounded">(required_capability_bitmask & worker_mask) = required</code>.<br/>
          <b>Haversine:</b> jarak aman radius 5km untuk pekerja rentan. <b>Priority Score:</b> 60 skill + 40 jarak + fairness. <b>Smart Ledger:</b> PostgreSQL trigger <code className="bg-slate-100 px-1 rounded">check_wage_tampering()</code> — upah locked saat worker_id terisi, exception jika diubah.
        </p>
        <Link href="/" className="inline-block mt-6 text-primary hover:underline text-sm">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
