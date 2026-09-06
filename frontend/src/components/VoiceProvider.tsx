"use client";
import { useEffect } from "react";

export default function VoiceProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isEnabled = () => {
      try {
        const raw = localStorage.getItem("accessibility");
        if (raw) { const p = JSON.parse(raw); return !!p.voice_enabled; }
        return false;
      } catch { return false; }
    };
    const syncFromProfile = async () => {
      try {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        if (!token) return;
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
        const url = apiUrl.includes("localhost") && typeof window !== "undefined" && window.location.hostname !== "localhost"
          ? `${window.location.protocol}//${window.location.hostname}:8000`
          : apiUrl;
        const res = await fetch(`${url}/api/worker/profile`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
        if (res.ok) {
          const data = await res.json();
          const p = data.data || data;
          const pref = p.accessibility_preference;
          if (pref) {
            const ap = typeof pref === "string" ? JSON.parse(pref) : pref;
            localStorage.setItem("accessibility", JSON.stringify(ap));
          }
        }
      } catch {}
    };
    syncFromProfile();
    const handler = (e: MouseEvent) => {
      if (!isEnabled()) return;
      const target = e.target as HTMLElement;
      const el = target.closest('button, a, [role="button"], .speakable') as HTMLElement | null;
      if (!el) return;
      let text = el.getAttribute("aria-label") || el.getAttribute("data-speak") || el.innerText || "";
      text = text.trim().replace(/\s+/g, " ").slice(0, 120);
      if (!text || text.length < 2) return;
      try {
        if (!("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "id-ID";
        u.rate = 0.95;
        setTimeout(() => window.speechSynthesis.speak(u), 80);
      } catch {}
    };
    document.addEventListener("click", handler, true);
    const onStorage = () => {};
    window.addEventListener("storage", onStorage);
    window.addEventListener("accessibility-change", onStorage);
    return () => {
      document.removeEventListener("click", handler, true);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("accessibility-change", onStorage);
      try { window.speechSynthesis.cancel(); } catch {}
    };
  }, []);
  return <>{children}</>;
}
