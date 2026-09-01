import { Building, MapPin, Check } from "lucide-react";

export default function EmployerProfile() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Building className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profil Perusahaan</h1>
            <p className="text-slate-600">Lengkapi data institusi Anda untuk meningkatkan kepercayaan pencari kerja.</p>
          </div>
        </header>

        <form className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Perusahaan / Institusi</label>
              <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="PT Maju Bersama" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
              <textarea rows={3} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Perusahaan yang bergerak di bidang..."></textarea>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Titik Lokasi Kantor (Pusat)
            </h2>
            <p className="text-sm text-slate-500">Penting untuk perhitungan jarak radius algoritma kami dengan kandidat.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="-6.200000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                <input type="text" className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="106.816666" />
              </div>
            </div>
            <button type="button" className="w-full text-sm font-medium text-primary bg-blue-50 py-2.5 rounded-lg hover:bg-blue-100">Setel ke Lokasi GPS Saat Ini</button>
          </div>

          <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mt-4">
            <Check className="w-5 h-5" />
            Simpan Profil Perusahaan
          </button>
        </form>

      </div>
    </div>
  );
}
