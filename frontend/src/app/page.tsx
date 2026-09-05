import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Send, CheckCircle, ShieldCheck, Lock, Flag, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Beranda",
  description: "KaryaSetara menghubungkan talenta berbakat dengan perusahaan inklusif — Smart Matching & Smart Ledger. Bergabung 15.000+ talenta.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — dengan pita bergerak warna logo KARYASETARA.PNG */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 border-b border-slate-200">
        {/* Ribbon background — lebih curve & tidak terlalu banyak (4 pita utama) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
          {/* Teal — curve besar di atas */}
          <div className="ribbon ribbon-teal h-32 w-[150%] -left-[25%] top-[-6%] rotate-[-8deg] opacity-[0.14]" style={{animation:"ribbonDrift1 14s ease-in-out infinite", borderRadius:"999px 999px 60% 60% / 100%"}} />
          {/* Orange — curve tengah */}
          <div className="ribbon ribbon-orange h-28 w-[140%] -left-[20%] top-[32%] rotate-[-5deg] opacity-[0.16]" style={{animation:"ribbonDrift2 16s ease-in-out infinite", borderRadius:"60% 60% 999px 999px / 100%"}} />
          {/* Green — curve bawah */}
          <div className="ribbon ribbon-green h-28 w-[145%] -left-[22%] top-[58%] rotate-[6deg] opacity-[0.15]" style={{animation:"ribbonDrift3 15s ease-in-out infinite", borderRadius:"999px 60% 60% 999px / 100%"}} />
          {/* Purple — curve paling bawah */}
          <div className="ribbon ribbon-purple h-32 w-[150%] -left-[25%] bottom-[-10%] rotate-[4deg] opacity-[0.13]" style={{animation:"ribbonDrift2 18s ease-in-out infinite reverse", borderRadius:"60% 999px 999px 60% / 100%"}} />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-blue-100 animate-fadeInUp">
              <Heart className="w-4 h-4" />
              Platform Pencarian Kerja Inklusif
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight animate-fadeInUp" style={{animationDelay:"0.1s"}}>
              Kemampuan Anda,<br />
              Kesempatan <span className="text-primary">Setara.</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed animate-fadeInUp" style={{animationDelay:"0.2s"}}>
              KaryaSetara menghubungkan talenta berbakat dengan perusahaan yang membuka kesempatan untuk semua. Karena setiap kemampuan berharga.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4 animate-fadeInUp" style={{animationDelay:"0.3s"}}>
              <Link href="/register" className="bg-primary text-white text-center px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-blue-500/25 active-scale">
                Mulai Sekarang &rarr;
              </Link>
              <Link href="/register" className="bg-white text-primary border border-slate-200 text-center px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors active-scale">
                Untuk Perusahaan
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-xs text-white font-bold">+</div>
              </div>
              <p className="text-sm font-medium text-slate-600">
                Bergabung bersama 15.000+ talenta lainnya
              </p>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg animate-float">
            <Image src="/hero-work.jpg" alt="Ilustrasi Kolaborasi Kerja Inklusif — dari ASSET" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-white/10" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Image src="/logo-color.png" alt="Logo KaryaSetara" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-xs font-bold text-slate-900">KaryaSetara</span>
                <span className="text-xs text-slate-500">• Inklusif</span>
              </div>
              <div className="hidden md:flex bg-slate-900/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full">
                Wheelchair & Puzzle — Ilustrasi Kolaborasi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal><h2 className="text-3xl font-bold text-slate-900 mb-4">Cara Kerja</h2></Reveal>
          <Reveal delay={100}><p className="text-slate-600 mb-16">Langkah mudah untuk menemukan pekerjaan yang tepat.</p></Reveal>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-200"></div>
            
            {[
              { icon: <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>, title: "Buat Profil", desc: "Daftarkan diri Anda dan tunjukkan kemampuan terbaik." },
              { icon: <Search className="w-6 h-6 text-primary" />, title: "Temukan Peluang", desc: "Jelajahi lowongan kerja yang sesuai dengan minat Anda." },
              { icon: <Send className="w-6 h-6 text-primary" />, title: "Lamar dengan Mudah", desc: "Kirim lamaran dan tunjukkan potensi Anda." },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: "Dapatkan Kesempatan", desc: "Terhubung dengan perusahaan yang inklusif dan suportif." }
            ].map((step, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="relative z-10 flex flex-col items-center bg-white hover-lift p-4 rounded-2xl">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-5xl">
          <Reveal><h2 className="text-3xl font-bold text-slate-900 mb-4">Trust & Safety</h2></Reveal>
          <Reveal delay={100}><p className="text-slate-600 mb-16 max-w-2xl mx-auto">Kami berkomitmen untuk menciptakan pengalaman yang aman, nyaman, dan adil bagi semua pengguna.</p></Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Verifikasi Perusahaan", desc: "Setiap perusahaan diverifikasi untuk memastikan kredibilitas." },
              { icon: <Heart className="w-6 h-6 text-primary" />, title: "Kesetaraan & Inklusi", desc: "Kami menjunjung tinggi kesetaraan dan menghargai keberagaman." },
              { icon: <Lock className="w-6 h-6 text-primary" />, title: "Privasi Terlindungi", desc: "Data pribadi Anda aman bersama kami. Tidak akan dibagikan tanpa izin." },
              { icon: <Flag className="w-6 h-6 text-primary" />, title: "Laporan & Moderasi", desc: "Laporkan konten atau perilaku yang tidak pantas dengan mudah." }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
