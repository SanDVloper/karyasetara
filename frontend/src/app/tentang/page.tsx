import type { Metadata } from "next";
import { Target, Heart, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Tentang KaryaSetara: SDG 8 & 11, Matriks Kemampuan bitmasking, Smart Ledger anti-eksploitasi untuk disabilitas & lansia.",
};
import BackButton from "@/components/BackButton";

export default function TentangKami() {
  return (
    <div className="flex-1 bg-white">
      <div className="container mx-auto px-4 md:px-8 pt-4">
        <BackButton fallbackHref="/" label="Kembali" />
      </div>
      <div className="bg-slate-50 py-16 md:py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Mewujudkan <span className="text-primary">Kesetaraan</span> Melalui Teknologi</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            KaryaSetara adalah platform gig-economy hyper-inklusif yang dirancang khusus untuk memecahkan masalah akses ekonomi bagi kelompok rentan: Disabilitas (Teman Tuli, Teman Netra, Disabilitas Fisik) dan Lansia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">SDG 8 & 11</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kami mendukung penuh Tujuan Pembangunan Berkelanjutan (SDGs) nomor 8 (Pekerjaan Layak) dan nomor 11 (Komunitas Berkelanjutan) untuk memberdayakan kelompok marginal.
            </p>
          </div>

          <div className="text-center space-y-4 p-6">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Matriks Kemampuan</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tidak ada label kekurangan. Kami menggunakan algoritma pencocokan (Bitmasking) untuk mempertemukan kemampuan optimal pekerja dengan kebutuhan perusahaan.
            </p>
          </div>

          <div className="text-center space-y-4 p-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Smart Ledger</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Anti-eksploitasi. Sistem kami mengunci upah yang disepakati secara permanen di tingkat database (PostgreSQL Triggers) untuk menjamin hak pekerja.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-blue-900/20">
          <h2 className="text-3xl font-bold mb-4">Siap untuk Memulai?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Bergabunglah dengan KaryaSetara hari ini dan jadilah bagian dari perubahan ekonomi yang lebih inklusif.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary-hover transition-colors">
              Daftar Sekarang
            </Link>
            <Link href="/login" className="bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-700 transition-colors">
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
