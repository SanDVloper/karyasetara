import { Check, MapPin, User, Accessibility } from "lucide-react";

export default function WorkerProfile() {
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profil & Kapabilitas</h1>
            <p className="text-slate-600">Lengkapi matriks kemampuan Anda agar sistem dapat memberikan rekomendasi pekerjaan yang tepat.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Accessibility className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg text-slate-900">Matriks Kemampuan</h2>
            </div>
            
            <p className="text-sm text-slate-500">Pilih kemampuan yang Anda miliki secara optimal (Bitmasking):</p>
            
            <div className="space-y-3">
              {[
                { id: "vis", label: "Penglihatan Optimal (Visual)", val: 1 },
                { id: "aud", label: "Pendengaran Optimal (Audio)", val: 2 },
                { id: "mob", label: "Mobilitas Fisik (Motorik)", val: 4 },
                { id: "cog", label: "Komunikasi Tekstual/Verbal", val: 8 },
              ].map((cap) => (
                <label key={cap.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <span className="font-medium text-slate-700">{cap.label}</span>
                  <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary border-slate-300" />
                </label>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg text-slate-900">Lokasi Anda (Radius Aman)</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                  <textarea rows={3} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Masukkan alamat..."></textarea>
                </div>
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
                <button className="w-full text-sm font-medium text-primary bg-blue-50 py-2 rounded-lg hover:bg-blue-100">Ambil Lokasi Saat Ini (GPS)</button>
              </div>
            </section>

            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Simpan Profil
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
