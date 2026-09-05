"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Flag, Users, Briefcase, BarChart3, HelpCircle, LogOut, PanelLeftClose, PanelLeftOpen, X, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleLogout = () => setLogoutConfirm(true);
  const confirmLogout = async () => { await logout(); setLogoutConfirm(false); router.push("/login"); };

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/reports", label: "Laporan", icon: Flag },
    { href: "/admin/users", label: "Pengguna", icon: Users },
    { href: "/admin/jobs", label: "Pekerjaan", icon: Briefcase },
    { href: "/admin/employers", label: "Employer", icon: Briefcase },
  ];

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-20 left-4 z-40 w-11 h-11 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center">
        <PanelLeftOpen className="w-5 h-5" />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-xl text-slate-100">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="font-bold flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-400"/> Admin</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-slate-800 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active ? "bg-white text-slate-900" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                    <item.icon className="w-5 h-5" /> {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-slate-800">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-300"><LogOut className="w-5 h-5" /> Keluar</button>
            </div>
          </aside>
        </div>
      )}

      <aside className={`hidden lg:flex bg-slate-900 text-slate-100 border-r border-slate-800 flex-col sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className={`flex items-center p-3 border-b border-slate-800 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Trust & Safety</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.label} href={item.href} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-white text-slate-900" : "text-slate-400 hover:bg-slate-800 hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
                <item.icon className="w-5 h-5 shrink-0" /> {!collapsed && <span>{item.label}</span>}
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
      <ConfirmModal open={logoutConfirm} title="Keluar dari sesi admin?" description="Anda akan keluar dari panel Trust & Safety." confirmText="Ya, Keluar" variant="danger" onConfirm={confirmLogout} onClose={()=>setLogoutConfirm(false)} />

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16 z-40">
        <Link href="/admin/dashboard" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/admin/dashboard") ? "text-white" : "text-slate-500"}`}><LayoutDashboard className="w-5 h-5" /><span className="text-[10px]">Dashboard</span></Link>
        <Link href="/admin/reports" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/admin/reports") ? "text-white" : "text-slate-500"}`}><Flag className="w-5 h-5" /><span className="text-[10px]">Laporan</span></Link>
        <Link href="/admin/jobs" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/admin/jobs") ? "text-white" : "text-slate-500"}`}><Briefcase className="w-5 h-5" /><span className="text-[10px]">Jobs</span></Link>
        <Link href="/admin/employers" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/admin/employers") ? "text-white" : "text-slate-500"}`}><Users className="w-5 h-5" /><span className="text-[10px]">Employer</span></Link>
      </nav>
    </>
  );
}
