"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAreaClick = (e: React.MouseEvent, href: string, needRole: "worker" | "employer") => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push(`/login?next=${encodeURIComponent(href)}`);
      return;
    }
    if (user?.role !== needRole) {
      e.preventDefault();
      // strict: jangan biarkan worker masuk employer dan sebaliknya
      if (user?.role === "worker") router.push("/worker/dashboard");
      else if (user?.role === "employer") router.push("/employer/dashboard");
      else router.push(href);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-blue.png" alt="KaryaSetara Logo" width={40} height={40} className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Karya<span className="text-primary">Setara</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className={`hover:text-primary transition-colors ${pathname==="/"?"text-primary font-bold":""}`}>Beranda</Link>
          <a href="/worker/dashboard" onClick={(e)=>handleAreaClick(e,"/worker/dashboard","worker")} className={`hover:text-primary transition-colors cursor-pointer ${pathname.startsWith("/worker")?"text-primary font-bold":""}`}>Area Pekerja</a>
          <a href="/employer/dashboard" onClick={(e)=>handleAreaClick(e,"/employer/dashboard","employer")} className={`hover:text-primary transition-colors cursor-pointer ${pathname.startsWith("/employer")?"text-primary font-bold":""}`}>Area Perusahaan</a>
          <Link href="/cara-kerja" className={`hover:text-primary transition-colors ${pathname==="/cara-kerja"?"text-primary font-bold":""}`}>Cara Kerja</Link>
          <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Masuk
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Mulai Sekarang
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-600 hidden lg:inline">Hi, {user?.name} <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full ml-1">{user?.role}</span></span>
              <Link
                href={user?.role==="worker"?"/worker/dashboard":user?.role==="employer"?"/employer/dashboard":"/admin/dashboard"}
                className="text-sm font-medium text-primary hover:underline"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-1.5">
                <LogOut className="w-4 h-4"/> Keluar
              </button>
            </>
          )}
        </div>

        <button onClick={()=>setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-600 hover:text-slate-900">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <Link href="/" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Beranda</Link>
          <a href="/worker/dashboard" onClick={(e)=>{setMobileOpen(false); handleAreaClick(e,"/worker/dashboard","worker")}} className="block text-sm font-medium text-slate-700">Area Pekerja (Login Wajib)</a>
          <a href="/employer/dashboard" onClick={(e)=>{setMobileOpen(false); handleAreaClick(e,"/employer/dashboard","employer")}} className="block text-sm font-medium text-slate-700">Area Perusahaan (Login Wajib)</a>
          <Link href="/cara-kerja" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Cara Kerja</Link>
          <Link href="/tentang" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Tentang Kami</Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={()=>setMobileOpen(false)} className="text-center text-sm font-medium border border-slate-200 rounded-lg py-2">Masuk</Link>
                <Link href="/register" onClick={()=>setMobileOpen(false)} className="text-center text-sm font-medium bg-primary text-white rounded-lg py-2">Mulai Sekarang</Link>
              </>
            ) : (
              <button onClick={()=>{setMobileOpen(false); handleLogout();}} className="text-center text-sm font-medium bg-slate-900 text-white rounded-lg py-2 flex items-center justify-center gap-2"><LogOut className="w-4 h-4"/> Keluar ({user?.role})</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
