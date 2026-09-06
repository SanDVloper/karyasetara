import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus, Search, Users, CheckCircle, Briefcase, ShieldCheck } from "lucide-react";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description: "Alur lengkap KaryaSetara: Perusahaan buat lowongan → Pencocokan Keahlian & Jarak → Pekerja terima → Dana Aman terkunci → selesai.",
};

export default function CaraKerja() {
  const employerFlow = [
    { step: "1", title: "Daftar & Login Perusahaan", desc: "Buat akun perusahaan." },
    { step: "2", title: "Buat Pekerjaan", desc: 'Isi judul, deskripsi, keahlian yang dibutuhkan, lokasi, dan upah (Dana Aman).' },
    { step: "3", title: "Pencocokan Otomatis", desc: "Sistem mencocokkan keahlian dan jarak terdekat → Skor Kecocokan." },
    { step: "4", title: "Lihat Kandidat", desc: "Daftar terurut: 92% Made (1.2 km), 5/5 keahlian terpenuhi." },
    { step: "5", title: "Pilih Pekerja", desc: "Klik Pilih → menunggu persetujuan pekerja." },
  ];
  const workerFlow = [
    { step: "1", title: "Lengkapi Profil", desc: "Pilih keahlian (Visual/Audio/Motorik/Komunikasi), isi alamat & titik di peta, atur aksesibilitas." },
    { step: "2", title: "Dapat Rekomendasi", desc: "Halaman rekomendasi menampilkan pekerjaan terdekat yang paling cocok." },
    { step: "3", title: "Terima / Tolak", desc: "Jika dipilih perusahaan, terima → pekerjaan aktif (upah terkunci, Dana Aman)." },
    { step: "4", title: "Kerjakan & Selesai", desc: "Tandai selesai → menunggu konfirmasi perusahaan." },
    { step: "5", title: "Perusahaan Konfirmasi → Pembayaran Diproses", desc: "Perusahaan konfirmasi → selesai & pembayaran diproses." },
  ];
  return (
    <div className="flex-1 bg-white">
      <div className="container mx-auto px-4 md:px-8 pt-4">
        <BackButton fallbackHref="/" label="Kembali" />
      </div>
      <div className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-slate-900">Cara Kerja <span className="text-primary">KaryaSetara</span></h1>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Alur lengkap inklusif: Perusahaan → Pencocokan Keahlian & Jarak → Pekerja → Dana Aman.</p>
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
            <Link href="/tentang" className="border border-slate-700 px-6 py-3 rounded-xl font-medium">Tentang Dana Aman</Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-5xl text-center">
        <h3 className="font-bold text-slate-900">Dana Aman & Pencocokan — Detail Sederhana</h3>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl mx-auto leading-relaxed">
          Dana Aman mengunci upah saat pekerja menyetujui, tidak bisa diubah perusahaan. Pencocokan berdasarkan keahlian dan jarak aman (radius 5 km) dengan urutan prioritas yang adil.
        </p>
        <details className="mt-4 max-w-3xl mx-auto text-left bg-slate-50 border border-slate-200 rounded-xl p-4">
          <summary className="text-sm font-semibold text-slate-700 cursor-pointer">Lihat detail teknis untuk juri</summary>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Keahlian disimpan sebagai angka (1=Visual,2=Audio,4=Motorik,8=Komunikasi). Contoh: pekerja 15 cocok untuk lowongan 9. Jarak dihitung dengan rumus jarak aman, skor 60% keahlian + 40% jarak. Dana Aman dikunci otomatis di sistem.
          </p>
        </details>
        <BackButton fallbackHref="/" label="Kembali ke Beranda" className="mt-6 mx-auto" />
      </div>
    </div>
  );
}
