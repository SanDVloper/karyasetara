"use client";

import { Briefcase, DollarSign, Accessibility, MapPin, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wage: "",
    required_capability_bitmask: 0,
    latitude: "",
    longitude: "",
    location_address: "",
  });

  const capabilities = [
    { id: "vis", label: "Butuh Penglihatan Optimal", val: 1 },
    { id: "aud", label: "Butuh Pendengaran Optimal", val: 2 },
    { id: "mob", label: "Butuh Mobilitas Fisik", val: 4 },
    { id: "cog", label: "Butuh Komunikasi Verbal/Teks", val: 8 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBitmaskChange = (val: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      required_capability_bitmask: checked 
        ? prev.required_capability_bitmask | val 
        : prev.required_capability_bitmask & ~val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Pastikan location_address terisi (fallback ke deskripsi singkat jika kosong)
    const payload = {
      ...formData,
      location_address: formData.location_address?.trim() ? formData.location_address : `Lokasi ${formData.latitude}, ${formData.longitude}`,
      wage: Number(formData.wage),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    };

    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) { setError("Sesi habis. Silakan login ulang."); setLoading(false); return; }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/employer/jobs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok) {
        router.push("/employer/dashboard");
      } else {
        setError(data.message || "Gagal membuat pekerjaan.");
      }
    } catch (err) {
      setError("Kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Buat Lowongan Pekerjaan Baru</h1>
          <p className="text-blue-100 text-sm">Sistem akan secara otomatis mencarikan talenta terbaik berdasarkan matriks kemampuan yang Anda tentukan.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Informasi Umum
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Pekerjaan</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Contoh: Admin Data Entry" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi & Tugas</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4} 
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Jelaskan detail pekerjaan..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nominal Upah (Smart Ledger)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">Rp</span>
                </div>
                <input 
                  type="number" 
                  name="wage"
                  value={formData.wage}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                  placeholder="50000" 
                />
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
              {capabilities.map((cap) => {
                const isChecked = (formData.required_capability_bitmask & cap.val) === cap.val;
                return (
                  <label key={cap.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={(e) => handleBitmaskChange(cap.val, e.target.checked)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary border-slate-300" 
                    />
                    <span className="font-medium text-slate-700 text-sm">{cap.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Lokasi Pekerjaan
            </h2>
            <p className="text-sm text-slate-500">Akan digunakan untuk mengukur radius jarak (Haversine) dengan kandidat pekerja.</p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap Lokasi</label>
              <input
                type="text"
                name="location_address"
                value={formData.location_address}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Jl. Contoh No. 123, Jakarta"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Latitude (Contoh: -6.20)" 
              />
              <input 
                type="text" 
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                placeholder="Longitude (Contoh: 106.81)" 
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors">Batal</button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Publikasikan Lowongan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
