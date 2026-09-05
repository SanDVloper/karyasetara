import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar akun baru KaryaSetara — pilih role Worker atau Employer, mulai Smart Matching.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
