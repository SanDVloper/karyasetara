import { ShieldAlert, Send } from "lucide-react";

export default function WorkerReports() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Laporan Keamanan (Trust & Safety)</h1>
            <p className="text-slate-600">Keamanan Anda adalah prioritas kami. Laporkan tindakan eksploitasi atau penipuan.</p>
          </div>
        </header>

        <form className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block font-bold text-slate-900 mb-2">Jenis Laporan</label>
            <select className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none bg-white">
              <option>Pilih jenis laporan...</option>
              <option>Perusahaan tidak merespons</option>
              <option>Pelecehan verbal / Diskriminasi</option>
              <option>Upah tidak sesuai dengan yang dikunci</option>
              <option>Pekerjaan fiktif / Penipuan</option>
            </select>
          </div>
          
          <div>
            <label className="block font-bold text-slate-900 mb-2">ID Pekerjaan / Nama Perusahaan</label>
            <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Contoh: PT Maju Bersama (Job: Data Entry)" />
          </div>

          <div>
            <label className="block font-bold text-slate-900 mb-2">Kronologi Kejadian</label>
            <textarea rows={5} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ceritakan apa yang terjadi secara detail..."></textarea>
          </div>

          <button type="button" className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all text-lg flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Kirim Laporan ke Admin
          </button>
        </form>

      </div>
    </div>
  );
}
