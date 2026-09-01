"use client";
import AuthGuard from "@/components/AuthGuard";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard allowRoles={["worker"]}>{children}</AuthGuard>;
}
