"use client";
import AuthGuard from "@/components/AuthGuard";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard allowRoles={["employer"]}>{children}</AuthGuard>;
}
