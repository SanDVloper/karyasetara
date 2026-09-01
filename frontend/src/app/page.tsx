import Link from "next/link";
import { Search, Send, CheckCircle, ShieldCheck, Lock, Flag, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-50 pt-16 pb-24 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
              <Heart className="w-4 h-4" />
              Platform Pencarian Kerja Inklusif
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Kemampuan Anda,<br />
              Kesempatan <span className="text-primary">Setara.</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              KaryaSetara menghubungkan talenta berbakat dengan perusahaan yang membuka kesempatan untuk semua. Karena setiap kemampuan berharga.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4">
              <Link href="/register" className="bg-primary text-white text-center px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-blue-500/25">
                Mulai Sekarang &rarr;
              </Link>
              <Link href="/register" className="bg-white text-primary border border-slate-200 text-center px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
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
          
          <div className="relative h-[400px] md:h-[500px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center">
            {/* Placeholder for Hero Illustration */}
            <div className="text-slate-400 font-medium">Hero Illustration (Wheelchair & Puzzle)</div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Cara Kerja</h2>
          <p className="text-slate-600 mb-16">Langkah mudah untuk menemukan pekerjaan yang tepat.</p>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-200"></div>
            
            {[
              { icon: <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>, title: "Buat Profil", desc: "Daftarkan diri Anda dan tunjukkan kemampuan terbaik." },
              { icon: <Search className="w-6 h-6 text-primary" />, title: "Temukan Peluang", desc: "Jelajahi lowongan kerja yang sesuai dengan minat Anda." },
              { icon: <Send className="w-6 h-6 text-primary" />, title: "Lamar dengan Mudah", desc: "Kirim lamaran dan tunjukkan potensi Anda." },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: "Dapatkan Kesempatan", desc: "Terhubung dengan perusahaan yang inklusif dan suportif." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center bg-white">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Trust & Safety</h2>
          <p className="text-slate-600 mb-16 max-w-2xl mx-auto">Kami berkomitmen untuk menciptakan pengalaman yang aman, nyaman, dan adil bagi semua pengguna.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Verifikasi Perusahaan", desc: "Setiap perusahaan diverifikasi untuk memastikan kredibilitas." },
              { icon: <Heart className="w-6 h-6 text-primary" />, title: "Kesetaraan & Inklusi", desc: "Kami menjunjung tinggi kesetaraan dan menghargai keberagaman." },
              { icon: <Lock className="w-6 h-6 text-primary" />, title: "Privasi Terlindungi", desc: "Data pribadi Anda aman bersama kami. Tidak akan dibagikan tanpa izin." },
              { icon: <Flag className="w-6 h-6 text-primary" />, title: "Laporan & Moderasi", desc: "Laporkan konten atau perilaku yang tidak pantas dengan mudah." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
