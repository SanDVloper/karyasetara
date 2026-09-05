export function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // Jika diakses via HP (192.168.x.x), pakai host yang sama untuk backend
    // Jika di localhost, tetap localhost:8000
    const protocol = window.location.protocol === "https:" ? "https:" : "http:";
    return `${protocol}//${host}:8000`;
  }
  return "http://localhost:8000";
}
