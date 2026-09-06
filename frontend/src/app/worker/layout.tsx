"use client";
import AuthGuard from "@/components/AuthGuard";
import WorkerSidebar from "@/components/WorkerSidebar";
import VoiceProvider from "@/components/VoiceProvider";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowRoles={["worker"]}>
      <VoiceProvider>
        <div className="flex flex-1 min-h-[calc(100vh-4rem)] bg-slate-50">
          <WorkerSidebar />
          <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
            {children}
          </div>
        </div>
      </VoiceProvider>
    </AuthGuard>
  );
}
