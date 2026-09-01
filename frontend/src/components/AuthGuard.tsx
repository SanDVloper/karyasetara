"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  allowRoles?: ("worker" | "employer" | "admin")[];
  redirectTo?: string;
};

export default function AuthGuard({ children, allowRoles, redirectTo = "/login" }: Props) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      const next = typeof window !== "undefined" ? window.location.pathname : "";
      router.replace(`${redirectTo}?next=${encodeURIComponent(next)}`);
      return;
    }

    if (allowRoles && user && !allowRoles.includes(user.role)) {
      // strict role: redirect to correct dashboard
      if (user.role === "worker") router.replace("/worker/dashboard");
      else if (user.role === "employer") router.replace("/employer/dashboard");
      else if (user.role === "admin") router.replace("/admin/dashboard");
      else router.replace("/login");
    }
  }, [loading, isAuthenticated, user, allowRoles, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-slate-500">Memeriksa sesi login...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-slate-500">Mengalihkan ke login...</p>
      </div>
    );
  }

  if (allowRoles && user && !allowRoles.includes(user.role)) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-amber-800">Akses Ditolak</p>
          <p className="text-sm text-amber-700 mt-2">
            Halaman ini khusus untuk role <b>{allowRoles.join(", ")}</b>. Akun Anda adalah <b>{user.role}</b>.
          </p>
          <p className="text-xs text-amber-600 mt-3">Mengalihkan ke dashboard Anda...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
