import Link from "next/link";
import { ArrowLeft, ShieldAlert, FileText, User, Building, Image as ImageIcon, AlertTriangle, CheckCircle, Ban } from "lucide-react";

export default function AdminReportDetail() {
  return (
    <div className="flex-1 bg-slate-900 min-h-screen p-6 text-slate-100">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/admin/reports" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Laporan</Link>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400" /> Detail Laporan REP-001</h1>
            <p className="text-sm text-slate-400 mt-1">PAGE.txt: Admin / Detail Laporan — UC-14 & UC-15 (Meninjau & Moderasi)</p>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">Prioritas Tinggi</span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold">Menunggu Review</span>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            <p>Dilaporkan: 31 Agu 2026</p><p>Oleh: Siti Aminah (Worker)</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <h2 className="font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-blue-400" /> Informasi Laporan</h2>
            <div className="space-y-3 text-sm">
              <div><p className="text-slate-500 text-xs">Kategori</p><p className="font-medium">Pelecehan / Kata Kasar</p></div>
              <div><p className="text-slate-500 text-xs">Target</p><p className="font-medium flex items-center gap-2"><Building className="w-4 h-4" /> PT Maju Bersama — Pekerjaan: Data Entry & Transkripsi (ID: JOB-001)</p></div>
              <div><p className="text-slate-500 text-xs">Deskripsi / Kronologi</p><p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-700">Employer menggunakan bahasa kasar saat memberikan instruksi via chat dan merendahkan disabilitas saya. Saya merasa tidak nyaman dan ingin melapor agar ditinjau.</p></div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <h2 className="font-bold text-white flex items-center gap-2"><User className="w-5 h-5 text-purple-400" /> Info Pelapor & Bukti</h2>
            <div className="text-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700" />
                <div><p className="font-medium">Siti Aminah</p><p className="text-xs text-slate-400">Teman Tuli • Worker • 1.2 km dari lokasi pekerjaan</p></div>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-2">Bukti (opsional — UC-13)</p>
                <div className="border border-dashed border-slate-600 rounded-xl p-4 flex flex-col items-center gap-2 bg-slate-900/30">
                  <ImageIcon className="w-8 h-8 text-slate-500" />
                  <p className="text-xs text-slate-400">screenshot-chat.png</p>
                  <button className="text-xs text-blue-400 hover:underline">Lihat Bukti</button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Jika tidak ada bukti, laporan tetap dapat diproses (Alternative Flow UC-13).</p>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-orange-500" /> Tindakan Moderasi (UC-15)</h2>
          <p className="text-sm text-slate-600 mt-1">Pilih salah satu tindakan sesuai hasil peninjauan:</p>
          <div className="grid md:grid-cols-4 gap-3 mt-5">
            {[
              { label: "Tetap Aktif", desc: "Tidak ada pelanggaran", icon: <CheckCircle className="w-5 h-5 text-green-600" />, style: "border-green-200 hover:bg-green-50 text-green-700" },
              { label: "Beri Peringatan", desc: "Pelanggaran ringan", icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />, style: "border-yellow-200 hover:bg-yellow-50 text-yellow-700" },
              { label: "Nonaktifkan Pekerjaan", desc: "Pekerjaan bermasalah", icon: <Ban className="w-5 h-5 text-orange-600" />, style: "border-orange-200 hover:bg-orange-50 text-orange-700" },
              { label: "Nonaktifkan Akun Employer", desc: "Pelanggaran berat/berulang", icon: <ShieldAlert className="w-5 h-5 text-red-600" />, style: "border-red-200 hover:bg-red-50 text-red-700" },
            ].map((a) => (
              <button key={a.label} className={`p-4 rounded-xl border-2 bg-white text-left transition-colors ${a.style}`}>
                <div className="flex items-center gap-2 font-bold text-sm">{a.icon} {a.label}</div>
                <p className="text-xs mt-1 opacity-80">{a.desc}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover">Konfirmasi Tindakan</button>
            <Link href="/admin/reports" className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 text-slate-700 text-center">Batal</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
