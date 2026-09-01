"use client";
import { useState, useEffect } from "react";

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

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getStoredToken();
    const u = getStoredUser();
    setToken(t);
    setUser(u);
    // optional: validate with backend
    if (t) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      fetch(`${apiUrl}/api/me`, {
        headers: { Authorization: `Bearer ${t}`, Accept: "application/json" },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("invalid token");
          const json = await res.json();
          const fresh = json.data || json;
          // sync fresh user if role present
          if (fresh?.role) {
            setUser(fresh);
            localStorage.setItem("user", JSON.stringify(fresh));
          }
        })
        .catch(() => {
          // token invalid -> clear
          // don't auto-clear to avoid loop, but we mark as unauthenticated if 401
          // keep as is; guard will handle redirect
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!token && !!user;
  const logout = async () => {
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
    setToken(null);
    setUser(null);
  };

  return { token, user, loading, isAuthenticated, logout, setUser, setToken };
}
