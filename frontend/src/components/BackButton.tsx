"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  fallbackHref = "/",
  label = "Kembali",
  className = "",
  forceFallback = false,
}: {
  fallbackHref?: string;
  label?: string;
  className?: string;
  forceFallback?: boolean;
}) {
  const router = useRouter();
  const handleBack = () => {
    if (forceFallback) {
      router.push(fallbackHref);
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };
  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2 rounded-xl border border-transparent hover:border-slate-200 transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
