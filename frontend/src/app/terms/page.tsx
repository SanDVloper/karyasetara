import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import { Shield, FileText, Users, Briefcase, AlertTriangle, Scale } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat & Ketentuan KaryaSetara: Golden Flow, Smart Ledger, Trust & Safety UC-13 s/d UC-15.",
};

export default function TermsPage() {
  return (
    <div className="flex-1 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-4xl">
        <BackButton fallbackHref="/register" label="Kembali" />
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-4">
          <div className="bg-slate-900 text-white p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"><FileText className="w-6 h-6" /></div>
              <span className="text-sm tracking-widest text-slate-400 font-semibold uppercase">Legal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Syarat & Ketentuan</h1>
            <p className="text-slate-400 mt-2 text-sm">Terakhir diperbarui: 1 September 2026 • Berlaku untuk Worker, Employer, dan Admin KaryaSetara</p>
          </div>

          <div className="p-8 md:p-10 space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Shield className="w-5 h-5 text-primary"/> 1. Penerimaan Syarat</h2>
              <p className="mt-2">Dengan mendaftar, masuk, atau menggunakan platform KaryaSetara, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan ini. Jika tidak setuju, harap tidak menggunakan layanan.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> 2. Definisi Pengguna</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><b>Worker:</b> Pencari kerja inklusif (Teman Tuli, Teman Netra, Disabilitas Fisik, Lansia) yang melengkapi matriks kemampuan (bitmasking) dan lokasi radius.</li>
                <li><b>Employer:</b> Perusahaan/institusi yang mempublikasikan lowongan dengan kemampuan dibutuhkan, lokasi, dan upah yang akan dikunci di Smart Ledger.</li>
                <li><b>Admin:</b> Moderator Trust & Safety yang meninjau laporan dan melakukan tindakan moderasi.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> 3. Kewajiban Akun</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Data nama, email, password harus valid dan milik Anda sendiri. Email duplikat tidak diizinkan (UC-01 Alt).</li>
                <li>Anda wajib memilih role <b>Pekerja</b> atau <b>Perusahaan</b> dengan benar — akun worker tidak bisa akses area perusahaan (strict guard) dan sebaliknya.</li>
                <li>Keamanan password tanggung jawab Anda. Aktivitas di bawah akun Anda dianggap sah.</li>
                <li>Akun yang dinonaktifkan karena pelanggaran tidak bisa login (UC-02 Alt).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> 4. Lowongan & Matching</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Employer wajib isi judul, deskripsi, kemampuan dibutuhkan (bitmask), lokasi, dan upah valid (UC-04). Upah tidak valid/lokasi kosong → publish ditolak.</li>
                <li>Sistem melakukan <b>Smart Matching</b>: skill matching bitwise, Haversine jarak radius, priority ranking, dan Match Score. Hasil diurutkan (Min-Heap) — tidak ada jaminan diterima.</li>
                <li>Employer memilih kandidat → status jadi <code className="bg-slate-100 px-1 rounded">waiting_acceptance</code>. Worker bisa Terima/Tolak (UC-08). Jika ditolak, tawaran ke kandidat lain.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Scale className="w-5 h-5 text-primary"/> 5. Alur Pekerjaan & Smart Ledger</h2>
              <p className="mt-2">Alur resmi (Golden Flow): <b>pending → matched → waiting_acceptance → active → waiting_confirmation → completed</b> (UC-09). Payment status mengikuti: <b>Locked → Waiting Confirmation → Processing</b> (UC-12).</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Saat worker menerima, upah <b>TERKUNCI</b> di database via PostgreSQL trigger — tidak bisa diubah employer (anti-eksploitasi).</li>
                <li>Worker tandai selesai (UC-10) → Employer konfirmasi (UC-11) → payment jadi <b>Processing</b>. KaryaSetara MVP tidak pakai payment gateway, hanya status.</li>
                <li>Jika employer tidak konfirmasi berlarut, Admin dapat memediasi via laporan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-600"/> 6. Trust & Safety — Laporan & Moderasi</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Worker dapat melaporkan pekerjaan/employer bermasalah dengan alasan, deskripsi, dan bukti opsional (jpg/png/pdf max 5MB) — status awal <b>Menunggu Review</b> (UC-13).</li>
                <li>Admin meninjau (UC-14) dan dapat: <b>Tetap Aktif</b> (tidak ada pelanggaran), <b>Peringatan</b> (ringan), <b>Nonaktifkan Pekerjaan</b> (bermasalah), <b>Nonaktifkan Akun Employer</b> (berat/berulang) — UC-15.</li>
                <li>Laporan palsu/penyalahgunaan fitur lapor dapat berakibat peringatan atau suspensi akun pelapor.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900">7. Aksesibilitas</h2>
              <p className="mt-2">Fitur P2: font besar, high contrast, large interaction target (≥44px), screen-reader friendly, Voice/TTS untuk showcase — sesuai MVP.txt 8. Preferensi disimpan di <code className="bg-slate-100 px-1 rounded">accessibility_preference</code> dan mempengaruhi tampilan di semua device.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900">8. Larangan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Diskriminasi, pelecehan, kata kasar, penipuan lowongan fiktif, atau permintaan data sensitif di luar platform.</li>
                <li>Manipulasi bitmask, lokasi palsu, atau spam lowongan untuk mengganggu matching.</li>
                <li>Upaya bypass Smart Ledger (ubah upah setelah terkunci) akan tertolak oleh trigger DB.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900">9. Perubahan Layanan</h2>
              <p className="mt-2">KaryaSetara dapat memperbarui Syarat & Ketentuan sewaktu-waktu. Perubahan akan diumumkan di platform. Penggunaan berkelanjutan setelah perubahan dianggap menyetujui versi baru.</p>
            </section>

            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900">Kontak</h3>
              <p className="mt-1">Pertanyaan terkait Syarat & Ketentuan hubungi: <a href="mailto:support@karyasetara.id" className="text-primary hover:underline">support@karyasetara.id</a> — Tim Trust & Safety KaryaSetara.</p>
              <div className="flex gap-3 mt-4">
                <Link href="/privacy" className="text-sm font-medium text-primary hover:underline">Lihat Kebijakan Privasi →</Link>
                <Link href="/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover">Kembali ke Daftar</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
