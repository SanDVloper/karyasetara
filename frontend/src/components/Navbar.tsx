"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut, Bell, ChevronDown, User, Building2, Shield } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";

function BellWithCount({ dashboardHref }: { dashboardHref: string }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (!isAuthenticated) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (!token) return;
    const url = user?.role === "worker" ? `${apiUrl}/api/worker/my-jobs` : user?.role === "employer" ? `${apiUrl}/api/employer/jobs` : `${apiUrl}/api/admin/reports`;
    fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })
      .then(r => r.json().then(d => ({ok:r.ok, d})))
      .then(({ok, d}) => {
        if (!ok) return;
        const data = d.data || d;
        const arr = Array.isArray(data) ? data : data.data || [];
        let c = 0;
        if (user?.role === "worker") c = arr.filter((j:any) => j.status === "waiting_acceptance" || j.status === "waiting_confirmation").length;
        else if (user?.role === "employer") c = arr.filter((j:any) => j.status === "waiting_confirmation" || j.status === "pending").length;
        else if (user?.role === "admin") c = arr.filter((r:any) => r.status === "pending").length;
        setCount(c);
      }).catch(()=>{});
  }, [isAuthenticated, user?.role]);
  if (count === 0) {
    return (
      <button onClick={()=>router.push(dashboardHref)} className="relative p-2.5 text-slate-600 hover:bg-slate-50 rounded-full transition-colors" aria-label="Notifikasi">
        <Bell className="w-5 h-5" />
      </button>
    );
  }
  return (
    <button onClick={()=>router.push(dashboardHref)} className="relative p-2.5 text-slate-600 hover:bg-slate-50 rounded-full transition-colors" aria-label="Notifikasi">
      <Bell className="w-5 h-5" />
      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{count > 9 ? "9+" : count}</span>
    </button>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleAreaClick = (e: React.MouseEvent, href: string, needRole: "worker" | "employer") => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push(`/login?next=${encodeURIComponent(href)}`);
      return;
    }
    if (user?.role !== needRole) {
      e.preventDefault();
      if (user?.role === "worker") router.push("/worker/dashboard");
      else if (user?.role === "employer") router.push("/employer/dashboard");
      else router.push(href);
    }
  };

  const handleLogout = async () => {
    setLogoutConfirm(true);
  };
  const confirmLogout = async () => {
    await logout();
    setLogoutConfirm(false);
    setProfileOpen(false);
    setMobileOpen(false);
    router.push("/login");
  };

  const dashboardHref = user?.role === "worker" ? "/worker/dashboard" : user?.role === "employer" ? "/employer/dashboard" : user?.role === "admin" ? "/admin/dashboard" : "/";
  const roleLabel = user?.role === "worker" ? "Pekerja" : user?.role === "employer" ? "Perusahaan" : user?.role === "admin" ? "Admin" : "";
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  // Jika sudah login tapi masih di halaman public (/, /tentang, /cara-kerja), jangan tampilkan nav publik lengkap
  // — tampilkan versi ringkas seperti referensi 22.21.58: logo kiri, bell + avatar kanan
  const isPublicPath = pathname === "/" || pathname === "/tentang" || pathname === "/cara-kerja";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      router.push(dashboardHref);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href={isAuthenticated ? dashboardHref : "/"} onClick={handleLogoClick} className="flex items-center gap-3">
          <Image src="/logo-blue.png" alt="KaryaSetara Logo" width={40} height={40} className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Karya<span className="text-primary">Setara</span>
          </span>
        </Link>
        
        {/* Desktop Nav — hanya tampil full jika BELUM login */}
        {!isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className={`hover:text-primary transition-colors ${pathname==="/"?"text-primary font-bold":""}`}>Beranda</Link>
            <a href="/worker/dashboard" onClick={(e)=>handleAreaClick(e,"/worker/dashboard","worker")} className={`hover:text-primary transition-colors cursor-pointer ${pathname.startsWith("/worker")?"text-primary font-bold":""}`}>Area Pekerja</a>
            <a href="/employer/dashboard" onClick={(e)=>handleAreaClick(e,"/employer/dashboard","employer")} className={`hover:text-primary transition-colors cursor-pointer ${pathname.startsWith("/employer")?"text-primary font-bold":""}`}>Area Perusahaan</a>
            <Link href="/cara-kerja" className={`hover:text-primary transition-colors ${pathname==="/cara-kerja"?"text-primary font-bold":""}`}>Cara Kerja</Link>
            <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
          </nav>
        ) : (
          // Saat sudah login, kalau di halaman public tampilkan breadcrumb ringkas (opsional) — biarkan center kosong biar clean seperti referensi
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            {/* Di area dashboard (/worker, /employer, /admin) nav center dikosongkan karena sudah ada sidebar/layout */}
            {!pathname.startsWith("/worker") && !pathname.startsWith("/employer") && !pathname.startsWith("/admin") && (
              <>
                <Link href="/" className={`hover:text-primary ${pathname==="/"?"text-primary font-bold":""}`}>Beranda</Link>
                <Link href="/cara-kerja" className="hover:text-primary">Cara Kerja</Link>
                <Link href="/tentang" className="hover:text-primary">Tentang Kami</Link>
              </>
            )}
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
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
              {/* Bell — sekarang hit real dari API, fallback 0 */}
              <BellWithCount dashboardHref={dashboardHref} />

              {/* Avatar + Dropdown seperti referensi: foto bulat + Nama + Pekerja + chevron */}
              <div className="relative">
                <button
                  onClick={()=>setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {initial}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
                    <p className="text-xs text-slate-500 leading-none mt-0.5">{roleLabel}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${profileOpen?"rotate-180":""}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                        {user?.role==="worker" && <User className="w-3 h-3 text-primary"/>}
                        {user?.role==="employer" && <Building2 className="w-3 h-3 text-primary"/>}
                        {user?.role==="admin" && <Shield className="w-3 h-3 text-primary"/>}
                        {roleLabel} • {user?.role}
                      </span>
                    </div>
                    <div className="p-2">
                      <Link
                        href={dashboardHref}
                        onClick={()=>setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700"
                      >
                        <User className="w-4 h-4 text-slate-500"/> Dashboard
                      </Link>
                      <Link
                        href={user?.role==="worker" ? "/worker/profile" : user?.role==="employer" ? "/employer/profile" : "/admin/dashboard"}
                        onClick={()=>setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700"
                      >
                        <User className="w-4 h-4 text-slate-500"/> Profil Saya
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm font-medium text-red-600">
                        <LogOut className="w-4 h-4"/> Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button onClick={()=>setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-600 hover:text-slate-900">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {!isAuthenticated ? (
            <>
              <Link href="/" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Beranda</Link>
              <a href="/worker/dashboard" onClick={(e)=>{setMobileOpen(false); handleAreaClick(e,"/worker/dashboard","worker")}} className="block text-sm font-medium text-slate-700">Area Pekerja (Login Wajib)</a>
              <a href="/employer/dashboard" onClick={(e)=>{setMobileOpen(false); handleAreaClick(e,"/employer/dashboard","employer")}} className="block text-sm font-medium text-slate-700">Area Perusahaan (Login Wajib)</a>
              <Link href="/cara-kerja" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Cara Kerja</Link>
              <Link href="/tentang" onClick={()=>setMobileOpen(false)} className="block text-sm font-medium text-slate-700">Tentang Kami</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">{initial}</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{roleLabel} • {user?.email}</p>
                </div>
              </div>
              <Link href={dashboardHref} onClick={()=>setMobileOpen(false)} className="block text-sm font-medium bg-primary text-white rounded-xl py-2.5 text-center">Dashboard</Link>
              <Link href={user?.role==="worker" ? "/worker/profile" : user?.role==="employer" ? "/employer/profile" : "/admin/dashboard"} onClick={()=>setMobileOpen(false)} className="block text-sm font-medium border border-slate-200 rounded-xl py-2.5 text-center">Profil</Link>
            </>
          )}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={()=>setMobileOpen(false)} className="text-center text-sm font-medium border border-slate-200 rounded-lg py-2">Masuk</Link>
                <Link href="/register" onClick={()=>setMobileOpen(false)} className="text-center text-sm font-medium bg-primary text-white rounded-lg py-2">Mulai Sekarang</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-center text-sm font-medium bg-slate-900 text-white rounded-lg py-2 flex items-center justify-center gap-2"><LogOut className="w-4 h-4"/> Keluar ({user?.role})</button>
            )}
          </div>
        </div>
      )}
      <ConfirmModal open={logoutConfirm} title="Keluar dari sesi?" description="Anda akan keluar dan perlu login lagi untuk mengakses dashboard. Yakin ingin keluar?" confirmText="Ya, Keluar" variant="danger" onConfirm={confirmLogout} onClose={()=>setLogoutConfirm(false)} />
    </header>
  );
}
