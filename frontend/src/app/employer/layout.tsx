"use client";
import AuthGuard from "@/components/AuthGuard";
import EmployerSidebar from "@/components/EmployerSidebar";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowRoles={["employer"]}>
      <div className="flex flex-1 min-h-[calc(100vh-4rem)] bg-slate-50">
        <EmployerSidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
