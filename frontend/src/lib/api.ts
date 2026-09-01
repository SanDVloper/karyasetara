// Centralized API helper for KaryaSetara
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token") || localStorage.getItem("token");
}

export function setAuth(token: string, user: any, tokenType: string = "Bearer") {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("token", token);
  localStorage.setItem("token_type", tokenType);
  if (user) localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("user");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string,string> || {}),
  };
  if (!(options.body instanceof FormData) && !headers["Content-Type"] && options.method !== "GET") {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  return res;
}
