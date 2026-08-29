import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Karya<span className="text-primary">Setara</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/pekerjaan" className="hover:text-primary transition-colors">Cari Pekerjaan</Link>
          <Link href="/perusahaan" className="hover:text-primary transition-colors">Untuk Perusahaan</Link>
          <Link href="/sumber-daya" className="hover:text-primary transition-colors">Sumber Daya</Link>
          <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Masuk
          </Link>
          <Link 
            href="/register" 
            className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Mulai Sekarang
          </Link>
        </div>

        <button className="md:hidden p-2 text-slate-600 hover:text-slate-900">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
