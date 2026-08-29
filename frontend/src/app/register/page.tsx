import Link from "next/link";
import { Mail, Lock, Eye, User } from "lucide-react";

export default function Register() {
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

        <form className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Nama Lengkap</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap" 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                placeholder="Buat password" 
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Konfirmasi Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                placeholder="Konfirmasi password" 
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2 text-sm">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary shrink-0" />
            <span className="text-slate-600 leading-relaxed">
              Saya menyetujui <Link href="/terms" className="text-primary hover:underline font-medium">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-primary hover:underline font-medium">Kebijakan Privasi</Link>
            </span>
          </div>

          <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-blue-500/20 mt-4">
            Daftar
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 relative z-10">
          Sudah punya akun? <Link href="/login" className="text-primary hover:underline font-semibold">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
