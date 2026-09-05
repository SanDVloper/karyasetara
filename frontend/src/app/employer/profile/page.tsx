"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Loader2, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function EmployerProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type:'error'|'success', text:string}|null>(null);
  const [profile, setProfile] = useState({ name:"", address:"", latitude:"", longitude:"" });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const getToken = () => localStorage.getItem("auth_token") || localStorage.getItem("token");

  const fetchProfile = async()=>{
    try{
      const token=getToken(); if(!token) return router.push("/login");
      const res=await fetch(`${apiUrl}/api/employer/profile`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal memuat profil");
      const d=data.data||data;
      setProfile({ name:d.name||"", address:d.address||"", latitude:d.latitude?.toString()||"", longitude:d.longitude?.toString()||"" });
    }catch(e:any){ setMessage({type:'error',text:e.message}); } finally{ setLoading(false); }
  };
  useEffect(()=>{fetchProfile()},[]);

  const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=> setProfile(p=>({ ...p, [e.target.name]: e.target.value }));

  const getLocation=()=>{
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(pos=> setProfile(p=>({...p, latitude:pos.coords.latitude.toString(), longitude:pos.coords.longitude.toString()})), ()=>alert("Gagal ambil GPS"));
    }
  };

  const handleSave=async()=>{
    setSaving(true); setMessage(null);
    try{
      const token=getToken();
      const payload={ name:profile.name, address:profile.address, latitude:Number(profile.latitude), longitude:Number(profile.longitude) };
      const res=await fetch(`${apiUrl}/api/employer/profile`,{method:"PUT", headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"}, body:JSON.stringify(payload)});
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||JSON.stringify(data.errors)||"Gagal simpan");
      setMessage({type:'success',text:'Profil perusahaan berhasil diperbarui'});
      // update local user
      const userRaw=localStorage.getItem("user");
      if(userRaw){ const u=JSON.parse(userRaw); u.name=payload.name; localStorage.setItem("user",JSON.stringify(u)); }
    }catch(e:any){ setMessage({type:'error',text:e.message}); } finally{ setSaving(false); }
  };

  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <BackButton fallbackHref="/employer/dashboard" label="Kembali ke Dashboard" />
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center"><Building2 className="w-7 h-7 text-primary"/></div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profil Perusahaan</h1>
            <p className="text-slate-600 text-sm">Lengkapi data perusahaan agar kandidat dapat menilai lokasi & kredibilitas (Backend perusahaan sudah terhubung).</p>
          </div>
        </header>

        {message && <div className={`p-4 rounded-xl flex gap-2 ${message.type==='error'?'bg-red-50 text-red-700 border border-red-200':'bg-green-50 text-green-700 border border-green-200'}`}>{message.type==='error'?<AlertCircle className="w-5 h-5"/>:<CheckCircle2 className="w-5 h-5"/>}{message.text}</div>}

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Perusahaan</label>
            <input name="name" value={profile.name} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="PT Karya Inklusif"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap Kantor</label>
            <textarea name="address" value={profile.address} onChange={handleChange} rows={3} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Jl. Sudirman No 1, Jakarta"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
              <input name="latitude" value={profile.latitude} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="-6.20"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
              <input name="longitude" value={profile.longitude} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="106.816"/>
            </div>
          </div>
          <button type="button" onClick={getLocation} className="w-full text-sm font-medium text-primary bg-blue-50 py-2.5 rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2"><MapPin className="w-4 h-4"/> Ambil Lokasi Saat Ini (GPS)</button>
          <button onClick={handleSave} disabled={saving} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-60">
            {saving? <Loader2 className="w-5 h-5 animate-spin"/>: <Check className="w-5 h-5"/>} Simpan Profil Perusahaan
          </button>
          <p className="text-xs text-slate-500 text-center">Data tersimpan via <code className="bg-slate-100 px-1 rounded">PUT /api/employer/profile</code> (role employer strict).</p>
        </section>
      </div>
    </div>
  );
}
