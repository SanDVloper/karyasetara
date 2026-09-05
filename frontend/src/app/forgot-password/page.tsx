"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type:"success"|"error", text:string}|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    // MVP: belum ada endpoint reset di backend, jadi simulasi sesuai UC-02 Alt
    // Jika nanti backend siap, ganti dengan fetch ke /api/auth/forgot-password
    await new Promise(r => setTimeout(r, 800));
    if (!email.includes("@")) {
      setMsg({type:"error", text:"Email tidak valid."});
    } else {
      setMsg({type:"success", text:`Jika ${email} terdaftar, link reset akan dikirim ke email. Silakan cek inbox/spam.`});
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <BackButton fallbackHref="/login" label="Kembali ke Masuk" className="mb-4" />
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Lupa Password?</h1>
            <p className="text-sm text-slate-500 mt-1">Masukkan email terdaftar. Kami kirim link reset (MVP: simulasi, belum butuh payment gateway).</p>
          </div>

          {msg && (
            <div className={`mb-4 p-3 rounded-xl flex gap-2 text-sm ${msg.type==="success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {msg.type==="success" ? <CheckCircle className="w-5 h-5 shrink-0"/> : <AlertCircle className="w-5 h-5 shrink-0"/>}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? "Mengirim..." : <><Send className="w-5 h-5"/> Kirim Link Reset</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Kembali ke Masuk</Link>
            <span className="mx-2 text-slate-300">•</span>
            <Link href="/register" className="text-slate-600 hover:text-slate-900">Belum punya akun? Daftar</Link>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4">MVP: Reset via email belum wajib — cukup tampilkan sukses agar tidak bocorkan apakah email terdaftar (security).</p>
        </div>
      </div>
    </div>
  );
}
