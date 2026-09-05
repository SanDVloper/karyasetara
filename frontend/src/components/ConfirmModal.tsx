"use client";
import { useEffect } from "react";
import { AlertTriangle, CheckCircle, ShieldAlert, LogOut, X } from "lucide-react";

type Variant = "primary" | "danger" | "warning" | "success";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "primary",
  loading = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onEsc); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const variantMap: Record<Variant, { bg: string; iconBg: string; btn: string; Icon: any }> = {
    primary: { bg: "bg-blue-50", iconBg: "bg-primary text-white", btn: "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-blue-500/20", Icon: CheckCircle },
    danger:  { bg: "bg-red-50", iconBg: "bg-red-600 text-white", btn: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20", Icon: ShieldAlert },
    warning: { bg: "bg-amber-50", iconBg: "bg-amber-500 text-white", btn: "bg-amber-600 hover:bg-amber-700 text-white", Icon: AlertTriangle },
    success: { bg: "bg-green-50", iconBg: "bg-green-600 text-white", btn: "bg-green-600 hover:bg-green-700 text-white", Icon: CheckCircle },
  };
  const v = variantMap[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in">
        <button onClick={onClose} className="absolute right-4 top-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-500">
          <X className="w-5 h-5" />
        </button>
        <div className={`p-6 pb-4 flex gap-4 ${v.bg} border-b border-slate-100`}>
          <div className={`w-12 h-12 rounded-2xl ${v.iconBg} flex items-center justify-center shrink-0`}>
            <v.Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="p-6 flex gap-3">
          <button onClick={onClose} disabled={loading} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-sm hover:bg-slate-50 disabled:opacity-50">
            {cancelText}
          </button>
          <button onClick={onConfirm} disabled={loading} className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 ${v.btn}`}>
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {confirmText}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 pb-4">Tekan Esc atau klik di luar untuk batal</p>
      </div>
    </div>
  );
}
