import { Briefcase, DollarSign, Accessibility, MapPin } from "lucide-react";

export default function CreateJob() {
  return (
    <div className="flex-1 bg-slate-50 p-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Buat Lowongan Pekerjaan Baru</h1>
          <p className="text-blue-100 text-sm">Sistem akan secara otomatis mencarikan talenta terbaik berdasarkan matriks kemampuan yang Anda tentukan.</p>
        </div>

        <form className="p-8 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Informasi Umum
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Pekerjaan</label>
              <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Contoh: Admin Data Entry" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi & Tugas</label>
              <textarea rows={4} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Jelaskan detail pekerjaan..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nominal Upah (Smart Ledger)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">Rp</span>
                </div>
                <input type="number" className="w-full pl-10 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="50000" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Upah akan dikunci otomatis di database saat pekerja menyepakati pekerjaan ini.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" />
              Syarat Kemampuan (Bitmasking)
            </h2>
            <p className="text-sm text-slate-500">Pilih HANYA kemampuan yang mutlak dibutuhkan untuk pekerjaan ini agar memberi kesempatan inklusif yang lebih luas.</p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "vis", label: "Butuh Penglihatan Optimal" },
                { id: "aud", label: "Butuh Pendengaran Optimal" },
                { id: "mob", label: "Butuh Mobilitas Fisik" },
                { id: "cog", label: "Butuh Komunikasi Verbal/Teks" },
              ].map((cap) => (
                <label key={cap.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary border-slate-300" />
                  <span className="font-medium text-slate-700 text-sm">{cap.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Lokasi Pekerjaan
            </h2>
            <p className="text-sm text-slate-500">Akan digunakan untuk mengukur radius jarak (Haversine) dengan kandidat pekerja.</p>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Latitude (Contoh: -6.20)" />
              <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Longitude (Contoh: 106.81)" />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors">Batal</button>
            <button type="button" className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 transition-colors">
              Publikasikan Lowongan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
