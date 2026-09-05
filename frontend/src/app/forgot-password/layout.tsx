import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Password",
  description: "Reset password KaryaSetara — masukkan email untuk menerima link reset.",
};

export default function ForgotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
