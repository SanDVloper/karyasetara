"use client";
import { useEffect, useState } from "react";
import { Accessibility, Type, Contrast, Volume2, Loader2, Check, AlertCircle, CheckCircle2 } from "lucide-react";

export default function WorkerAccessibility() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{type:'error'|'success',text:string}|null>(null);
  const [pref, setPref] = useState({ font_size: "normal", high_contrast: false, voice_enabled: false, large_target: false });
  const [profile, setProfile] = useState<any>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const getToken = () => localStorage.getItem("auth_token") || localStorage.getItem("token");

  useEffect(()=>{
    const fetchProfile=async()=>{
      const token=getToken();
      const res=await fetch(`${apiUrl}/api/worker/profile`,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"}});
      const data=await res.json();
      const p=data.data||data;
      setProfile(p);
      if(p.accessibility_preference){
        const ap = typeof p.accessibility_preference === 'string' ? JSON.parse(p.accessibility_preference) : p.accessibility_preference;
        setPref(prev=>({ ...prev, ...ap }));
        applyPref(ap);
      }
      setLoading(false);
    };
    fetchProfile();
  },[]);

  const applyPref=(ap:any)=>{
    const root=document.documentElement;
    if(ap.font_size==='large') root.style.fontSize='17px';
    else if(ap.font_size==='xlarge') root.style.fontSize='19px';
    else root.style.fontSize='16px';
    if(ap.high_contrast){
      root.classList.add("high-contrast");
      document.body.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
      document.body.classList.remove("high-contrast");
    }
  };

  const handleChange=(key:string, value:any)=>{
    const next={ ...pref, [key]: value } as any;
    setPref(next);
    applyPref(next);
  };

  const handleSave=async()=>{
    setSaving(true); setMsg(null);
    try{
      const token=getToken();
      // need to keep existing profile fields
      const payload={
        capability_bitmask: profile.capability_bitmask ?? 0,
        latitude: Number(profile.latitude),
        longitude: Number(profile.longitude),
        address: profile.address,
        accessibility_preference: pref,
      };
      const res=await fetch(`${apiUrl}/api/worker/profile`,{
        method:"PUT",
        headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json",Accept:"application/json"},
        body:JSON.stringify(payload)
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.message||"Gagal simpan");
      setMsg({type:'success',text:'Preferensi aksesibilitas tersimpan. Berlaku otomatis untuk pengalaman Anda.'});
      // store local
      localStorage.setItem("accessibility", JSON.stringify(pref));
    }catch(e:any){ setMsg({type:'error',text:e.message}); } finally{ setSaving(false); }
  };

  const speak=()=>{
    if('speechSynthesis' in window){
      const u=new SpeechSynthesisUtterance("Fitur Voice TTS aktif. KaryaSetara mendukung aksesibilitas untuk semua.");
      u.lang='id-ID';
      speechSynthesis.speak(u);
    } else alert("TTS tidak didukung browser ini");
  };

  if(loading) return <div className="flex-1 flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>;

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center"><Accessibility className="w-7 h-7 text-primary"/></div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Aksesibilitas</h1>
            <p className="text-slate-600 text-sm">Atur tampilan untuk kenyamanan Anda: font besar, kontras tinggi, target besar, dan TTS.</p>
          </div>
        </header>

        {msg && <div className={`p-4 rounded-xl flex gap-2 ${msg.type==='error'?'bg-red-50 text-red-700 border border-red-200':'bg-green-50 text-green-700 border border-green-200'}`}>{msg.type==='error'?<AlertCircle className="w-5 h-5"/>:<CheckCircle2 className="w-5 h-5"/>}{msg.text}</div>}

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-bold text-slate-800"><Type className="w-5 h-5 text-primary"/> Ukuran Font</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {val:"normal",label:"Normal"},
                {val:"large",label:"Besar"},
                {val:"xlarge",label:"Sangat Besar"},
              ].map(o=> (
                <button key={o.val} onClick={()=>handleChange("font_size",o.val)} className={`p-3 rounded-xl border text-sm font-medium ${pref.font_size===o.val?'bg-primary text-white border-primary':'bg-white border-slate-200 hover:bg-slate-50'}`}>{o.label}</button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <span className="flex items-center gap-2 font-medium text-slate-700"><Contrast className="w-5 h-5 text-primary"/> High Contrast</span>
            <input type="checkbox" checked={!!pref.high_contrast} onChange={e=>handleChange("high_contrast",e.target.checked)} className="w-5 h-5 rounded"/>
          </label>

          <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <span className="flex items-center gap-2 font-medium text-slate-700"><Volume2 className="w-5 h-5 text-primary"/> Voice / TTS Aktif</span>
            <input type="checkbox" checked={!!pref.voice_enabled} onChange={e=>handleChange("voice_enabled",e.target.checked)} className="w-5 h-5 rounded"/>
          </label>

          <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <span className="font-medium text-slate-700">Large Interaction Target (tombol besar)</span>
            <input type="checkbox" checked={!!pref.large_target} onChange={e=>handleChange("large_target",e.target.checked)} className="w-5 h-5 rounded"/>
          </label>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover flex items-center justify-center gap-2 disabled:opacity-60">{saving?<Loader2 className="w-5 h-5 animate-spin"/>:<Check className="w-5 h-5"/>} Simpan Preferensi</button>
            <button onClick={speak} className="px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 flex items-center gap-2"><Volume2 className="w-5 h-5"/> Uji TTS</button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-700">
            <p className="font-bold">Preview Aksesibilitas:</p>
            <p className="mt-1">Contoh teks dengan ukuran {pref.font_size}, kontras {pref.high_contrast?'tinggi':'normal'}. Tombol di aplikasi akan membesar jika large target aktif. Screen-reader friendly & keyboard navigable.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
