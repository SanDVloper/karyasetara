import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import { Shield, Lock, Eye, Database, UserCheck, Cookie } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi KaryaSetara: data worker/employer, Smart Matching, Smart Ledger, dan hak pengguna.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-4xl">
        <BackButton fallbackHref="/register" label="Kembali" />
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-4">
          <div className="bg-primary text-white p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><Lock className="w-6 h-6" /></div>
              <span className="text-sm tracking-widest text-blue-100 font-semibold uppercase">Privacy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Kebijakan Privasi</h1>
            <p className="text-blue-100 mt-2 text-sm">Terakhir diperbarui: 1 September 2026 • Kami menjaga data Anda dengan prinsip inklusif dan aman.</p>
          </div>

          <div className="p-8 md:p-10 space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Database className="w-5 h-5 text-primary"/> 1. Data yang Kami Kumpulkan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><b>Data akun:</b> nama, email, password ter-hash (bcrypt), role (worker/employer/admin).</li>
                <li><b>Profil Worker:</b> capability_bitmask (bitwise kemampuan), latitude/longitude, address, accessibility_preference (json: font_size, high_contrast, voice_enabled, large_target).</li>
                <li><b>Lowongan:</b> judul, deskripsi, required_capability_bitmask, lokasi pekerjaan, upah (wage).</li>
                <li><b>Laporan Trust & Safety:</b> reason, description, evidence_path (file bukti opsional), priority, admin_notes.</li>
                <li><b>Teknis:</b> token Sanctum, last_activity untuk auto-logout 10 menit, log akses (IP, user-agent) untuk keamanan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Eye className="w-5 h-5 text-primary"/> 2. Tujuan Penggunaan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Menjalankan <b>Smart Matching</b> (skill + Haversine jarak + priority) untuk rekomendasi pekerjaan dan kandidat.</li>
                <li>Mengelola <b>Job Flow & Smart Ledger</b> (kunci upah, status pembayaran) agar transaksi adil.</li>
                <li>Moderasi laporan (Admin) untuk menjaga lingkungan aman.</li>
                <li>Personalisasi aksesibilitas (font, kontras, target besar, TTS) di semua device Anda.</li>
                <li>Keamanan: deteksi suspensi akun/pekerjaan jika melanggar Syarat & Ketentuan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Lock className="w-5 h-5 text-primary"/> 3. Penyimpanan & Keamanan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Password di-hash via Laravel cast <code className="bg-slate-100 px-1 rounded">hashed</code>, tidak pernah disimpan plain.</li>
                <li>Token Sanctum disimpan httpOnly di header `Authorization: Bearer`, auto-expire saat logout atau idle 10 menit (client).</li>
                <li>Upah dikunci via <code className="bg-slate-100 px-1 rounded">PostgreSQL trigger check_wage_tampering()</code> — tidak bisa diubah setelah worker ter-assign.</li>
                <li>File bukti laporan disimpan di `storage/app/private` dengan akses hanya Admin; max 5MB, tipe jpg/png/webp/pdf.</li>
                <li>Database Neon (Postgres) dengan SSL `require`.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary"/> 4. Berbagi Data</h2>
              <p className="mt-2">Kami <b>tidak menjual</b> data Anda. Data dibagikan hanya:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Ke Employer: hanya matriks kemampuan, jarak, dan Match Score (bukan data sensitif raw).</li>
                <li>Ke Admin: hanya saat laporan perlu ditinjau.</li>
                <li>Ke pihak ketiga: hanya Google OAuth (jika login via Google) — email/nama terverifikasi via `tokeninfo`.</li>
                <li>Kewajiban hukum jika diminta aparat berwenang dengan dasar hukum sah.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Shield className="w-5 h-5 text-primary"/> 5. Hak Anda</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><b>Akses & Koreksi:</b> lihat/ubah profil di <Link href="/worker/profile" className="text-primary hover:underline">Worker Profile</Link> atau <Link href="/employer/profile" className="text-primary hover:underline">Employer Profile</Link>.</li>
                <li><b>Hapus Akun:</b> hubungi support — data akan di-anonimkan, tapi log transaksi Smart Ledger tetap untuk audit.</li>
                <li><b>Ekspor Data:</b> minta ekspor JSON data Anda via email support.</li>
                <li><b>Tolak Pelacakan:</b> nonaktifkan GPS, tapi rekomendasi jarak menjadi kurang akurat.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Cookie className="w-5 h-5 text-primary"/> 6. Cookies & Local Storage</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><code className="bg-slate-100 px-1 rounded">auth_token</code>, <code className="bg-slate-100 px-1 rounded">user</code>, <code className="bg-slate-100 px-1 rounded">last_activity</code> di localStorage untuk sesi & idle 10 menit.</li>
                <li><code className="bg-slate-100 px-1 rounded">accessibility</code> untuk preferensi font/kontras.</li>
                <li>Tidak ada cookie iklan pihak ketiga. Hanya Google GSI cookie jika login via Google.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900">7. Retensi Data</h2>
              <p className="mt-2">Data akun aktif disimpan selama akun ada. Log laporan & transaksi disimpan minimal 2 tahun untuk audit Trust & Safety, lalu di-arsipkan/anonymized.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900">8. Perubahan Kebijakan</h2>
              <p className="mt-2">Kami akan umumkan perubahan material via banner di dashboard dan email. Versi terbaru selalu di halaman ini.</p>
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900">Kontak Privasi</h3>
              <p className="mt-1">Pertanyaan atau permintaan hak data: <a href="mailto:privacy@karyasetara.id" className="text-primary hover:underline">privacy@karyasetara.id</a> / <a href="mailto:support@karyasetara.id" className="text-primary hover:underline">support@karyasetara.id</a>.</p>
              <div className="flex gap-3 mt-4">
                <Link href="/terms" className="text-sm font-medium text-primary hover:underline">Lihat Syarat & Ketentuan →</Link>
                <Link href="/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover">Kembali ke Daftar</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
