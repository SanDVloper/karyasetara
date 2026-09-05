"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "worker",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear specific field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);

    if (!formData.terms) {
      setErrorMessage("Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setErrorMessage("Konfirmasi password tidak cocok dengan password.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          setFieldErrors(data.errors);
          setErrorMessage(data.message || "Validasi gagal. Silakan periksa kembali data Anda.");
        } else {
          setErrorMessage(data.message || "Terjadi kesalahan saat melakukan pendaftaran.");
        }
        return;
      }

      // Success
      setSuccessMessage("Pendaftaran berhasil! Menyimpan sesi dan mengalihkan...");
      if (data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("last_activity", Date.now().toString());
        window.dispatchEvent(new Event("auth-change"));
      }

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setErrorMessage("Gagal terhubung ke server backend. Pastikan Laravel backend berjalan di http://localhost:8000 - " + (err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-50 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute -right-16 top-20 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -left-16 bottom-20 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            <span className="text-primary">Daftar</span> Akun Baru
          </h1>
          <p className="text-sm text-slate-500">
            Buat akun untuk mulai mencari pekerjaan yang sesuai untuk Anda.
          </p>
        </div>

        {/* Global Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-sm relative z-10">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-5 p-3.5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2.5 text-green-700 text-sm relative z-10">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Nama Lengkap</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Masukkan nama lengkap" 
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.name ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="nama@email.com" 
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.email ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Buat password (min. 8 karakter)" 
                className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.password ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.password[0]}</p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Konfirmasi Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Konfirmasi password" 
                className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.password_confirmation ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.password_confirmation && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.password_confirmation[0]}</p>
            )}
          </div>

          {/* Pilih Role - INI YANG BIKIN AREA PERUSAHAAN GAGAL SEBELUMNYA (selalu worker) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Daftar Sebagai</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${formData.role==='worker'?'border-primary bg-blue-50':'border-slate-300 hover:bg-slate-50'}`}>
                <input type="radio" name="role" value="worker" checked={formData.role==='worker'} onChange={handleChange} className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-slate-700">Pekerja</span>
              </label>
              <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${formData.role==='employer'?'border-primary bg-blue-50':'border-slate-300 hover:bg-slate-50'}`}>
                <input type="radio" name="role" value="employer" checked={formData.role==='employer'} onChange={handleChange} className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-slate-700">Perusahaan</span>
              </label>
            </div>
            <p className="text-xs text-slate-500">Pilih <b>Perusahaan</b> agar bisa login ke Area Perusahaan (strict). Akun worker tidak bisa masuk area perusahaan.</p>
            {fieldErrors.role && <p className="text-xs text-red-500">{fieldErrors.role[0]}</p>}
          </div>

          {/* Checkbox Syarat & Ketentuan */}
          <div className="space-y-1 pt-1">
            <div className="flex items-start gap-2 text-sm">
              <input 
                type="checkbox" 
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary shrink-0 cursor-pointer" 
              />
              <label htmlFor="terms" className="text-slate-600 leading-relaxed cursor-pointer select-none">
                Saya menyetujui <Link href="/terms" className="text-primary hover:underline font-medium">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-primary hover:underline font-medium">Kebijakan Privasi</Link>
              </label>
            </div>
            {fieldErrors.terms && (
              <p className="text-xs text-red-500">{fieldErrors.terms[0]}</p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-blue-500/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Mendaftarkan Akun..." : "Daftar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 relative z-10">
          Sudah punya akun? <Link href="/login" className="text-primary hover:underline font-semibold">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
