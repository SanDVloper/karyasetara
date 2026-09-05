import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KaryaSetara | Kemampuan Anda, Kesempatan Setara",
    template: "%s | KaryaSetara",
  },
  description: "Platform pencarian kerja inklusif untuk disabilitas dan lansia — Smart Matching bitmask + Haversine, Smart Ledger anti-eksploitasi.",
  keywords: ["KaryaSetara", "inklusif", "disabilitas", "lansia", "lowongan", "pekerjaan", "Smart Matching", "Smart Ledger"],
  authors: [{ name: "KaryaSetara" }],
  openGraph: {
    title: "KaryaSetara | Kemampuan Anda, Kesempatan Setara",
    description: "Platform gig-economy hyper-inklusif untuk Teman Tuli, Netra, Disabilitas Fisik & Lansia.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
