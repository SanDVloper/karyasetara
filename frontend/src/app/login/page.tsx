"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, ShieldCheck, AlertCircle } from "lucide-react";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(
        `${apiUrl}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      console.log("Login response:", result);

      if (!response.ok) {
        setError(
          result.message ||
            "Email atau kata sandi yang Anda masukkan salah."
        );
        return;
      }

      if (!result.success || !result.data?.token) {
        setError("Login gagal. Token tidak ditemukan.");
        return;
      }

      // Ambil token dari response Laravel
      const token = result.data.token;

      // Ambil data user
      const user = result.data.user;

      // Simpan token konsisten untuk semua halaman (auth_token & token)
      localStorage.setItem("token", token);
      localStorage.setItem("auth_token", token);

      // Simpan tipe token
      localStorage.setItem(
        "token_type",
        result.data.token_type || "Bearer"
      );

      // Simpan data user
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect strict: jika ada next param dan role sesuai, prioritaskan
      const isNextAllowed = (next: string, role: string) => {
        if (next.startsWith("/worker") && role !== "worker") return false;
        if (next.startsWith("/employer") && role !== "employer") return false;
        if (next.startsWith("/admin") && role !== "admin") return false;
        return true;
      };
      if (nextParam && isNextAllowed(nextParam, user?.role)) {
        router.push(nextParam);
      } else if (nextParam && !isNextAllowed(nextParam, user?.role)) {
        setError(`Akun ${user?.role} tidak dapat mengakses ${nextParam}. Anda dialihkan ke dashboard sesuai role.`);
        setTimeout(() => {
          if (user?.role === "worker") router.push("/worker/dashboard");
          else if (user?.role === "employer") router.push("/employer/dashboard");
          else if (user?.role === "admin") router.push("/admin/dashboard");
        }, 1200);
        return;
      } else if (user?.role === "worker") {
        router.push("/worker/dashboard");
      } else if (user?.role === "employer") {
        router.push("/employer/dashboard");
      } else if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        setError("Role pengguna tidak dikenali.");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Tidak dapat terhubung ke server. Pastikan Laravel sedang berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">

        {/* Background decorations */}
        <div className="absolute -left-16 top-20 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="absolute -right-16 bottom-20 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Masuk{" "}
            <span className="text-slate-600 font-normal">
              ke KaryaSetara
            </span>
          </h1>

          <p className="text-sm text-slate-500">
            Selamat datang kembali! Silakan masuk untuk melanjutkan.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5 relative z-10"
        >

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">
              Email
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                autoComplete="email"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:bg-slate-100"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">
              Password
            </label>

            <div className="relative">

              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:bg-slate-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />

              <span className="text-slate-600">
                Ingat saya
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Lupa password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-6 relative z-10">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>

          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-500">
              atau masuk dengan
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 relative z-10">

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />

              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />

              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />

              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>

            Google
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
          >
            <svg
              className="w-5 h-5 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>

            Facebook
          </button>
        </div>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-slate-600 relative z-10">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-semibold"
          >
            Daftar Sekarang
          </Link>
        </p>

        {/* Security Badge */}
        <div className="hidden md:flex absolute bottom-6 -left-32 items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-5 h-5 text-primary" />

          <span>
            Keamanan data Anda adalah prioritas kami.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8">Memuat...</div>}>
      <LoginInner />
    </Suspense>
  );
}

