"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Briefcase, ClipboardCheck, History, Mail, Wallet, User, HelpCircle, LogOut, Accessibility, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";

export default function WorkerSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  // tutup drawer saat pindah halaman di mobile
  useEffect(() => { setMobileOpen(false); }, [pathname, statusParam]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const isNavActive = (item: { label: string; href: string }) => {
    if (item.label === "Riwayat") return pathname === "/worker/my-jobs" && statusParam === "completed";
    if (item.label === "Pekerjaan Aktif") return pathname === "/worker/my-jobs" && statusParam !== "completed" && !pathname.startsWith("/worker/my-jobs/");
    if (item.label === "Pembayaran") return pathname === "/worker/payments" || pathname.startsWith("/worker/payments/");
    return isActive(item.href);
  };

  const handleLogout = () => setLogoutConfirm(true);
  const confirmLogout = async () => {
    await logout();
    setLogoutConfirm(false);
    router.push("/login");
  };

  const nav = [
    { href: "/worker/dashboard", label: "Beranda", icon: Home },
    { href: "/worker/jobs", label: "Pekerjaan", icon: Briefcase },
    { href: "/worker/my-jobs", label: "Pekerjaan Aktif", icon: ClipboardCheck },
    { href: "/worker/my-jobs", label: "Riwayat", icon: History, query: "?status=completed" },
    { href: "/worker/reports", label: "Pesan", icon: Mail, badge: null },
    { href: "/worker/payments", label: "Pembayaran", icon: Wallet },
    { href: "/worker/profile", label: "Profil", icon: User },
    { href: "/worker/accessibility", label: "Aksesibilitas", icon: Accessibility },
    { href: "/tentang", label: "Bantuan", icon: HelpCircle },
  ];

  return (
    <>
      {/* Tombol hamburger untuk buka/tutup di mobile/tablet — trigger drawer */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-20 left-4 z-40 w-11 h-11 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-hover"
        aria-label="Buka sidebar"
      >
        <PanelLeftOpen className="w-5 h-5" />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-bold text-slate-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {nav.map((item) => {
                const active = isNavActive(item as any);
                const href = (item as any).query ? `${item.href}${(item as any).query}` : item.href;
                return (
                  <Link key={item.label} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active ? "bg-blue-50 text-primary border border-blue-100" : "text-slate-600 hover:bg-slate-50"}`}>
                    <item.icon className={`w-5 h-5 ${active ? "text-primary" : "text-slate-500"}`} /> {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-slate-100">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-5 h-5" /> Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar — collapsible */}
      <aside className={`hidden lg:flex bg-white border-r border-slate-200 flex-col sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className={`flex items-center p-3 border-b border-slate-100 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Menu</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900"
            aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
            title={collapsed ? "Buka sidebar" : "Tutup sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = isNavActive(item as any);
            const href = (item as any).query ? `${item.href}${(item as any).query}` : item.href;
            return (
              <Link
                key={item.label}
                href={href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-blue-50 text-primary border border-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-slate-500"}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-slate-100">
          <button
            onClick={handleLogout}
            title={collapsed ? "Keluar" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5 shrink-0" /> {!collapsed && "Keluar"}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav — seperti referensi versi mobile kanan */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-40 pb-safe">
        <Link href="/worker/dashboard" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/worker/dashboard") ? "text-primary" : "text-slate-500"}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Beranda</span>
        </Link>
        <Link href="/worker/jobs" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/worker/jobs") && !isActive("/worker/my-jobs") ? "text-primary" : "text-slate-500"}`}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-medium">Pekerjaan</span>
        </Link>
        <Link href="/worker/my-jobs" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/worker/my-jobs") ? "text-primary" : "text-slate-500"}`}>
          <ClipboardCheck className="w-5 h-5" />
          <span className="text-[10px] font-medium">Aktif</span>
        </Link>
        <Link href="/worker/reports" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/worker/reports") ? "text-primary" : "text-slate-500"}`}>
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-medium">Pesan</span>
        </Link>
        <Link href="/worker/profile" className={`flex flex-col items-center gap-1 py-2 px-3 ${isActive("/worker/profile") ? "text-primary" : "text-slate-500"}`}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </nav>
      <ConfirmModal open={logoutConfirm} title="Keluar dari sesi?" description="Anda akan keluar dan perlu login lagi untuk mengakses dashboard pekerja." confirmText="Ya, Keluar" variant="danger" onConfirm={confirmLogout} onClose={()=>setLogoutConfirm(false)} />
    </>
  );
}
