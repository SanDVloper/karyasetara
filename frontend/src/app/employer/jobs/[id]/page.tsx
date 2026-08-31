import Link from "next/link";
import { CheckCircle, AlertTriangle, Briefcase, MapPin } from "lucide-react";

export default function EmployerJobDetail() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-bl-xl text-sm">
            Status: Aktif Dikerjakan
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Data Entry & Transkripsi</h1>
          <p className="text-slate-500 mt-1">Dibuat pada: 30 Agustus 2026</p>
          
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Pekerja Ditugaskan:</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-bold text-slate-900">Siti Aminah</p>
                  <p className="text-xs text-slate-600">Teman Tuli</p>
                </div>
              </div>
            </div>
            <div className="flex-1 border-l border-slate-100 pl-4">
              <p className="text-sm font-medium text-slate-500 mb-1">Smart Ledger (Upah):</p>
              <p className="font-bold text-xl text-slate-900">Rp 50.000 <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded ml-2">TERKUNCI</span></p>
            </div>
          </div>
        </header>

        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Pekerjaan Sudah Selesai?</h2>
          <p className="text-slate-600 max-w-md mx-auto mt-2 mb-8">
            Jika pekerja telah menyelesaikan tugasnya dengan baik, klik tombol di bawah ini. Upah yang terkunci di Smart Ledger akan otomatis dicairkan ke saldo pekerja.
          </p>
          <button className="bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all text-lg flex items-center gap-2 mx-auto">
            <CheckCircle className="w-6 h-6" />
            Konfirmasi Selesai & Cairkan Dana
          </button>
        </section>

        <section className="text-center">
          <Link href="/worker/reports" className="text-sm text-slate-500 flex items-center justify-center gap-1 hover:text-red-600 transition-colors">
            <AlertTriangle className="w-4 h-4" /> Laporkan masalah (Trust & Safety)
          </Link>
        </section>

      </div>
    </div>
  );
}
