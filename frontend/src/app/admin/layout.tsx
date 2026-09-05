"use client";
import AuthGuard from "@/components/AuthGuard";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowRoles={["admin"]}>
      <div className="flex flex-1 min-h-[calc(100vh-4rem)] bg-slate-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
