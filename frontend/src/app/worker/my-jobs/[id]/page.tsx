import Link from "next/link";
import { CheckCircle, AlertTriangle, Building, MapPin } from "lucide-react";

export default function WorkerJobDetail() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <Link href="/worker/jobs" className="text-sm font-medium text-slate-500 hover:text-primary mb-6 inline-block">&larr; Kembali ke Rekomendasi</Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mt-2">Data Entry & Transkripsi</h1>
              <div className="flex items-center gap-2 mt-2 text-slate-600 font-medium">
                <Building className="w-4 h-4" /> PT Maju Bersama
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Upah Smart Ledger</p>
              <p className="text-2xl font-bold text-slate-900">Rp 50.000</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Deskripsi Pekerjaan</h3>
              <p className="text-slate-600 leading-relaxed">
                Kami mencari individu yang teliti untuk mentranskrip rekaman suara rapat (durasi 30 menit) ke dalam format dokumen teks. Tidak ada batasan waktu yang ketat, yang terpenting adalah keakuratan teks. Pekerjaan ini sangat cocok dikerjakan dari rumah.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex-1 min-w-[200px]">
                <p className="text-sm text-slate-500 mb-1">Syarat Kemampuan</p>
                <p className="font-semibold text-slate-900">Visual, Komunikasi Teks</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex-1 min-w-[200px]">
                <p className="text-sm text-slate-500 mb-1">Lokasi Perusahaan</p>
                <p className="font-semibold text-slate-900 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" /> 2.1 km dari Anda
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-10">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Apakah Anda ingin mengambil pekerjaan ini?</h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-8">
            Jika Anda menerima pekerjaan ini, upah sebesar Rp 50.000 akan langsung dikunci di dalam sistem (Smart Ledger) untuk menjamin pembayaran Anda setelah tugas selesai.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-primary text-white font-bold px-10 py-3.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 transition-all text-lg flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Terima Pekerjaan
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
