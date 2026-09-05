"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase, PlusCircle, Users, User, HelpCircle, LogOut, PanelLeftClose, PanelLeftOpen, X, Building2, Wallet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function EmployerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isNavActive = (item: { href: string; label: string }) => {
    if (item.href === "/employer/jobs/create") return pathname === "/employer/jobs/create";
    if (item.href === "/employer/jobs") return pathname === "/employer/jobs" || (pathname.startsWith("/employer/jobs/") && !pathname.startsWith("/employer/jobs/create"));
    return isActive(item.href);
  };

  const handleLogout = () => setLogoutConfirm(true);
  const confirmLogout = async () => { await logout(); setLogoutConfirm(false); router.push("/login"); };

  const nav = [
    { href: "/employer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employer/jobs/create", label: "Buat Pekerjaan", icon: PlusCircle },
    { href: "/employer/jobs", label: "Pekerjaan Saya", icon: Briefcase },
    { href: "/employer/profile", label: "Profil Perusahaan", icon: Building2 },
    { href: "/cara-kerja", label: "Bantuan", icon: HelpCircle },
  ];

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-20 left-4 z-40 w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center">
        <PanelLeftOpen className="w-5 h-5" />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-bold flex items-center gap-2"><Building2 className="w-5 h-5 text-primary"/> Perusahaan</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {nav.map((item) => {
                const active = isNavActive(item as any);
                return (
                  <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                    <item.icon className={`w-5 h-5 ${active ? "text-white" : ""}`} /> {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-slate-100">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"><LogOut className="w-5 h-5" /> Keluar</button>
            </div>
          </aside>
        </div>
      )}

      <aside className={`hidden lg:flex bg-slate-900 text-slate-100 border-r border-slate-800 flex-col sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className={`flex items-center p-3 border-b border-slate-800 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Perusahaan</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = isNavActive(item as any);
            return (
              <Link key={item.label} href={item.href} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-white text-slate-900" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
                <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-slate-900" : ""}`} /> {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-slate-800">
          <button onClick={handleLogout} title={collapsed ? "Keluar" : undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-colors ${collapsed ? "justify-center" : ""}`}>
            <LogOut className="w-5 h-5 shrink-0" /> {!collapsed && "Keluar"}
          </button>
        </div>
      </aside>
      <ConfirmModal open={logoutConfirm} title="Keluar dari sesi?" description="Anda akan keluar dari area perusahaan dan perlu login lagi." confirmText="Ya, Keluar" variant="danger" onConfirm={confirmLogout} onClose={()=>setLogoutConfirm(false)} />

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-40">
        <Link href="/employer/dashboard" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/employer/dashboard") ? "text-slate-900" : "text-slate-500"}`}><LayoutDashboard className="w-5 h-5" /><span className="text-[10px]">Dashboard</span></Link>
        <Link href="/employer/jobs" className={`flex flex-col items-center gap-1 py-2 px-3 ${pathname === "/employer/jobs" || (pathname.startsWith("/employer/jobs/") && pathname !== "/employer/jobs/create") ? "text-slate-900" : "text-slate-500"}`}><Briefcase className="w-5 h-5" /><span className="text-[10px]">Pekerjaan</span></Link>
        <Link href="/employer/jobs/create" className={`flex flex-col items-center gap-1 py-2 px-3 ${pathname === "/employer/jobs/create" ? "text-slate-900" : "text-slate-500"}`}><PlusCircle className="w-5 h-5" /><span className="text-[10px]">Buat</span></Link>
        <Link href="/employer/profile" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/employer/profile") ? "text-slate-900" : "text-slate-500"}`}><Building2 className="w-5 h-5" /><span className="text-[10px]">Profil</span></Link>
      </nav>
    </>
  );
}
