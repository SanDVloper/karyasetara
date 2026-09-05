"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "worker" | "employer" | "admin";
  capability_bitmask?: number;
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
};

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token") || localStorage.getItem("token");
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

const IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 menit

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  // sinkronisasi antar tab/komponen: jika login/logout di komponen lain, update state
  useEffect(() => {
    const sync = () => {
      setToken(getStoredToken());
      setUser(getStoredUser());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth-change", sync);
    };
  }, []);

  useEffect(() => {
    const t = getStoredToken();
    const u = getStoredUser();
    // hanya update jika belum ada (init sudah dari useState), tapi tetap sync jika berubah
    if (t !== token) setToken(t);
    if (JSON.stringify(u) !== JSON.stringify(user)) setUser(u);
    // optional: validate with backend — dengan timeout 3 detik biar tidak bikin loading lama
    if (t) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      fetch(`${apiUrl}/api/me`, {
        headers: { Authorization: `Bearer ${t}`, Accept: "application/json" },
        signal: controller.signal,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("invalid token");
          const json = await res.json();
          const fresh = json.data || json;
          if (fresh?.role) {
            setUser(fresh);
            localStorage.setItem("user", JSON.stringify(fresh));
          }
        })
        .catch(() => {
          // ignore error / timeout — tetap anggap authenticated dari localStorage, biar tidak loading terus
        })
        .finally(() => {
          clearTimeout(timeout);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!token && !!user;

  const updateActivity = useCallback(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      localStorage.setItem("last_activity", Date.now().toString());
    }
  }, [isAuthenticated]);

  const logout = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const t = getStoredToken();
    if (t) {
      try {
        await fetch(`${apiUrl}/api/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${t}`, Accept: "application/json" },
        });
      } catch {}
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("user");
    localStorage.removeItem("last_activity");
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  }, []);

  // idle 10 menit — auto logout jika tidak ada aktivitas
  useEffect(() => {
    if (!isAuthenticated) return;

    // init last_activity jika belum ada
    if (!localStorage.getItem("last_activity")) {
      updateActivity();
    } else {
      // cek langsung saat load: jika sudah lewat 10 menit, logout
      const last = parseInt(localStorage.getItem("last_activity") || "0", 10);
      if (Date.now() - last > IDLE_TIMEOUT_MS) {
        logout().then(() => router.push("/login?reason=idle"));
        return;
      }
    }

    const events: (keyof WindowEventMap)[] = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handler = () => updateActivity();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));

    const interval = setInterval(() => {
      const last = parseInt(localStorage.getItem("last_activity") || "0", 10);
      if (Date.now() - last > IDLE_TIMEOUT_MS) {
        clearInterval(interval);
        logout().then(() => {
          router.push("/login?reason=idle");
        });
      }
    }, 30_000); // cek tiap 30 detik

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      clearInterval(interval);
    };
  }, [isAuthenticated, updateActivity, router, logout]);

  return { token, user, loading, isAuthenticated, logout, setUser, setToken, updateActivity };
}
