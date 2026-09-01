"use client";

import { Check, MapPin, User, Accessibility, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkerProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'error'|'success', text: string} | null>(null);

  const [profile, setProfile] = useState({
    name: "",
    capability_bitmask: 0,
    latitude: "",
    longitude: "",
    address: "",
  });

  const capabilities = [
    { id: "vis", label: "Penglihatan Optimal (Visual)", val: 1 },
    { id: "aud", label: "Pendengaran Optimal (Audio)", val: 2 },
    { id: "mob", label: "Mobilitas Fisik (Motorik)", val: 4 },
    { id: "cog", label: "Komunikasi Tekstual/Verbal", val: 8 },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) return router.push("/login");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/worker/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setProfile({
          name: data.data.name || "",
          capability_bitmask: data.data.capability_bitmask || 0,
          latitude: data.data.latitude || "",
          longitude: data.data.longitude || "",
          address: data.data.address || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBitmaskChange = (val: number, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      capability_bitmask: checked 
        ? prev.capability_bitmask | val 
        : prev.capability_bitmask & ~val
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setProfile(prev => ({
          ...prev,
          latitude: pos.coords.latitude.toString(),
          longitude: pos.coords.longitude.toString()
        }));
      }, () => {
        alert("Gagal mendapatkan lokasi GPS.");
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      // Kirim capability sebagai int, latitude/longitude sebagai number
      const payload = {
        ...profile,
        capability_bitmask: Number(profile.capability_bitmask),
        latitude: Number(profile.latitude),
        longitude: Number(profile.longitude),
      };
      const res = await fetch(`${apiUrl}/api/worker/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profil berhasil diperbarui.' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Gagal menyimpan profil.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Kesalahan jaringan.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profil & Kapabilitas ({profile.name})</h1>
            <p className="text-slate-600">Lengkapi matriks kemampuan Anda agar sistem dapat memberikan rekomendasi pekerjaan yang tepat.</p>
          </div>
        </header>

        {message && (
          <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Accessibility className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg text-slate-900">Matriks Kemampuan</h2>
            </div>
            
            <p className="text-sm text-slate-500">Pilih kemampuan yang Anda miliki secara optimal (Bitmasking):</p>
            
            <div className="space-y-3">
              {capabilities.map((cap) => {
                const isChecked = (profile.capability_bitmask & cap.val) === cap.val;
                return (
                  <label key={cap.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                    <span className="font-medium text-slate-700">{cap.label}</span>
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={(e) => handleBitmaskChange(cap.val, e.target.checked)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary border-slate-300" 
                    />
                  </label>
                );
              })}
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
                  <textarea 
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    rows={3} 
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                    placeholder="Masukkan alamat..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                    <input 
                      type="text" 
                      name="latitude"
                      value={profile.latitude}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                      placeholder="-6.200000" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                    <input 
                      type="text" 
                      name="longitude"
                      value={profile.longitude}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                      placeholder="106.816666" 
                    />
                  </div>
                </div>
                <button type="button" onClick={getLocation} className="w-full text-sm font-medium text-primary bg-blue-50 py-2 rounded-lg hover:bg-blue-100">
                  Ambil Lokasi Saat Ini (GPS)
                </button>
              </div>
            </section>

            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              Simpan Profil
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
