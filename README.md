<div align="center">
  
  # KARYASETARA
  ### Platform Pencarian Kerja Inklusif — Kemampuan Anda, Kesempatan Setara.
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-success?style=for-the-badge)](https://karyasetara.vercel.app)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/SanDVloper/karyasetara)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  **Submission for ITECHNO CUP 2026 - Web Development**
  
  **By Tim KaryaSetara**
  
</div>

---

## 📑 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Tim Pengembang](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 👥 Tim Pengembang

| Nama | Peran | GitHub |
|------|-------|--------|
| **Santa Buana** | Project Lead & Frontend Developer | [SanDVloper](https://github.com/SanDVloper) |
| **Bintang** | Backend Developer | [bintangcloud](https://github.com/bintangcloud) |

---

## 📖 Tentang Proyek

### Latar Belakang

Berdasarkan data BPS 2023, tingkat partisipasi angkatan kerja penyandang disabilitas di Indonesia hanya 44% dibanding 69% non-disabilitas. Kelompok rentan — Teman Tuli, Teman Netra, Disabilitas Fisik, dan Lansia — sering terlabel "kekurangan" padahal memiliki kemampuan optimal yang bisa dicocokkan dengan kebutuhan perusahaan. Platform lowongan umum tidak ramah: tidak ada filter kemampuan, jarak tidak diperhitungkan, dan risiko eksploitasi upah masih tinggi.

### Solusi yang Ditawarkan

**KaryaSetara** adalah platform gig-economy hyper-inklusif yang membalik paradigma: bukan melihat kekurangan, tapi mencocokkan **matriks kemampuan** (bitmask) dengan kebutuhan pekerjaan + **radius jarak aman** (Haversine) + **priority ranking**. Ditambah **Smart Ledger** yang mengunci upah di tingkat database (PostgreSQL trigger) agar anti-eksploitasi, serta **Trust & Safety** untuk moderasi.

### Tujuan Proyek

- 🎯 **Tujuan Utama**: Memberdayakan 15.000+ talenta rentan agar mendapat pekerjaan layak (SDG 8) dan komunitas berkelanjutan (SDG 11).
- 👥 **Target Pengguna**: Worker (disabilitas & lansia) dan Employer (UMKM hingga perusahaan inklusif), serta Admin moderasi.
- 💎 **Value Proposition**: Satu-satunya platform yang pakai *capability-based matching* tanpa label disabilitas, radius aman 5km, dan jaminan upah terkunci — bukan sekadar job board.

---

## ✨ Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|----------|--------------|---------------|
| **Smart Matching** | Skill matching (bitwise AND) + Haversine jarak + Priority Score → Match Score, ranking via Min-Heap | Rekomendasi paling relevan, contoh: Made 92% (1.2 km, 5/5 kemampuan terpenuhi) |
| **Dana Aman (Smart Ledger)** | Upah TERKUNCI di DB saat worker terima tawaran (trigger `check_wage_tampering`), status: Locked → Waiting Confirmation → Processing | Anti-eksploitasi, upah tidak bisa diubah employer |
| **Rekomendasi Inklusif** | Worker lihat pekerjaan cocok + alasan (Skill 92%, Jarak 88%, Prioritas 90%); Employer lihat kandidat prioritas | Transparan, bukan black-box |
| **Trust & Safety** | Worker lapor (alasan + bukti opsional) → Admin tinjau → Moderasi: Tetap Aktif / Peringatan / Nonaktifkan Pekerjaan / Nonaktifkan Akun Employer | Aman untuk kelompok rentan |

### Fitur Tambahan

- **Matriks Kemampuan** - 4 toggles: Visual, Audio, Motorik, Komunikasi Teks (bitmask 1,2,4,8)
- **Peta Interaktif** - Pilih titik via Leaflet + GPS, alamat auto-reverse geocode (Nominatim), manual lat/lng tetap bisa
- **Aksesibilitas** - Font besar, High Contrast, Large Target ≥44px, Screen-reader friendly, Voice/TTS khusus Worker (global, hanya di `/worker/*`)
- **Job Flow Lengkap** - `pending → waiting_acceptance → active → waiting_confirmation → completed` + payment terikat
- **Sidebar Kolapsibel** - Worker (putih), Employer (slate-900), Admin (slate-900 dark) + bottom nav mobile
- **Google OAuth** - Satu tombol smart (account chooser + popup pilih role Pekerja/Perusahaan jika akun baru) via GIS + `laravel/socialite`

---

## 🖥️ Demo & Screenshot

### Live Demo

🚀 **[Kunjungi Website](https://karyasetara.vercel.app)**

Backend API: `https://karyasetara-production.up.railway.app`

### Screenshot Aplikasi

<div align="center">
  <img src="https://via.placeholder.com/800x450.png?text=KaryaSetara+Homepage+Hero" alt="Homepage" width="800"/>
  <p><em>Homepage — Hero dengan pita bergerak warna logo, CTA Mulai Sekarang</em></p>
  
  <img src="https://via.placeholder.com/800x450.png?text=Worker+Dashboard" alt="Dashboard" width="800"/>
  <p><em>Worker Dashboard — Halo, Pinlion! + Rekomendasi 60% Match + Pekerjaan Aktif</em></p>
  
  <img src="https://via.placeholder.com/800x450.png?text=Transkripsi+Audio+91+Match" alt="Feature" width="800"/>
  <p><em>Detail Pekerjaan — 91% Match, alasan cocok, Skill 92% / Jarak 88%</em></p>
</div>

---

## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework    : Next.js 16.3.2 (Turbopack)
UI Library   : Tailwind CSS 4, lucide-react
State Mgmt   : React Context + useAuth hook (localStorage + auth-change event)
Validation   : Zod (via backend), React Hook Form pattern
Maps         : Leaflet + react-leaflet
Auth         : Sanctum token + Google Identity Services (GIS)
```

#### Backend
```
Runtime      : PHP 8.2
Framework    : Laravel 10.10
Database     : PostgreSQL (Neon Serverless) + pgBouncer pooler
ORM          : Eloquent
Auth         : Laravel Sanctum + laravel/socialite 5.31 (Google)
Mail         : SMTP Gmail (App Password)
```

#### DevOps & Tools
```
Deployment   : Vercel (frontend), Railway (backend)
CI/CD        : GitHub Actions (auto deploy on push to main)
Testing      : PHPUnit, Vitest (planned)
Monitoring   : Railway logs, Vercel Analytics
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|-----------|------------------|
| **Next.js 16 + Turbopack** | App Router + Server Components + metadata SEO untuk lomba, build 4-6s |
| **Tailwind CSS 4** | Utility-first, mudah buat high-contrast & large target aksesibilitas |
| **Leaflet** | Free, tanpa API key, ringan, support touch untuk peta inklusif (vs Google Maps butuh billing) |
| **Laravel Sanctum** | Simple token-based SPA auth, cocok untuk Next.js + mobile, sudah teruji |
| **Neon Postgres + Trigger** | Serverless, `check_wage_tampering()` di DB level paling aman untuk anti-eksploitasi (tidak bisa di-bypass app layer) |
| **Google GIS + Socialite** | Akun chooser native Google, verifikasi `id_token` via `tokeninfo`, smart 1 tombol (login/daftar) |

### Dependencies Utama

```json
{
  "dependencies": {
    "next": "16.3.2",
    "react": "19.2.8",
    "lucide-react": "^1.33.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "require": {
    "php": "^8.2",
    "laravel/framework": "^10.10",
    "laravel/sanctum": "^3.3",
    "laravel/socialite": "^5.31"
  }
}
```

---

## 🏗️ Arsitektur Sistem

### System Architecture

```
[ Browser HP/Desktop ]
        |
   (Next.js 16 - Vercel)
        |  fetch /api/*  (via getApiUrl() hostname dinamis)
        v
[Laravel 10 - Railway]  <-->  [Neon Postgres + Trigger Smart Ledger]
        |
   (SMTP Gmail - App Password)
        |
   [Google OAuth - tokeninfo]
```

### Database Schema

```
users: id, name, email (unique), password (hashed), role [worker|employer|admin], capability_bitmask (int), latitude/longitude (decimal), address (text), accessibility_preference (json), is_suspended, suspended_at, email_verified_at
jobs: id, employer_id FK, worker_id FK nullable, title, description, required_capability_bitmask, latitude/longitude, location_address, wage (decimal), status [pending|waiting_acceptance|active|waiting_confirmation|completed], payment_status [locked|waiting_confirmation|processing], is_suspended
reports: id, reporter_id FK, job_id FK nullable, employer_id FK nullable, reason, description, evidence_path, status [pending|investigating|resolved|warning|suspended], priority, admin_notes
password_reset_tokens: email, token (hashed), created_at
personal_access_tokens: Sanctum
```

### Folder Structure

```
KARYASETARA/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Landing (pita bergerak, Reveal)
│   │   │   ├── worker/                  # Worker area (AuthGuard + VoiceProvider + WorkerSidebar)
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── jobs/page.tsx        # Rekomendasi + filter + pagination
│   │   │   │   ├── jobs/[id]/page.tsx   # Detail 91% Match + Terima/Tolak
│   │   │   │   ├── my-jobs/page.tsx     # Aktif vs Riwayat ?status=completed
│   │   │   │   ├── payments/page.tsx    # Dana Aman history
│   │   │   │   ├── profile/page.tsx     # Bitmask + MapPicker
│   │   │   │   ├── accessibility/page.tsx
│   │   │   │   └── reports/             # Laporan + create
│   │   │   ├── employer/                # EmployerSidebar (slate-900)
│   │   │   ├── admin/                   # AdminSidebar (Trust & Safety)
│   │   │   ├── login/page.tsx           # Email + Google GIS + idle alert
│   │   │   └── register/page.tsx        # Role picker + a11y
│   │   ├── components/
│   │   │   ├── Navbar.tsx               # Bell real count + avatar dropdown
│   │   │   ├── Worker/Employer/AdminSidebar.tsx (collapsible)
│   │   │   ├── ConfirmModal.tsx         # Reusable confirm
│   │   │   ├── BackButton.tsx           # history-aware + forceFallback
│   │   │   ├── MapPicker.tsx            # Leaflet + Nominatim
│   │   │   ├── VoiceProvider.tsx        # Worker-only TTS global
│   │   │   └── Reveal.tsx               # Scroll trigger
│   │   ├── hooks/useAuth.ts             # Sanctum + idle 10m + auth-change event
│   │   └── lib/api.ts                   # getApiUrl() hostname dinamis (HP)
│   └── public/hero-work.jpg, logo-*.png
├── backend/
│   ├── app/Http/Controllers/Api/
│   │   ├── AuthController.php           # register, login, google, forgot, reset, me, logout
│   │   ├── Worker/JobController.php     # recommended (Haversine), myJobs, accept/reject/complete
│   │   ├── Employer/JobController.php   # store, candidates (Min-Heap), selectWorker, confirmCompletion
│   │   └── Admin/                       # Report, User, Job, Dashboard
│   ├── database/migrations/             # users, jobs, smart_ledger_triggers, reports
│   ├── routes/api.php                   # 34 endpoints
│   └── config/services.php              # google client_id/secret
├── PEDOMAN/                             # DFD, FLOW, MVP, PAGE, USECASE, Guidebook
├── ASSET/                               # Logo KARYASETARA.png
└── README.md
```

---

## 🚀 Instalasi & Setup

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18.x atau lebih tinggi)
- **npm** / **yarn** / **pnpm**
- **PHP** (v8.2+)
- **Composer**
- **PostgreSQL** (atau Neon cloud)
- **Git**

### Langkah Instalasi

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/SanDVloper/karyasetara.git
cd karyasetara
```

#### 2️⃣ Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
composer install
npm install
```

#### 3️⃣ Setup Environment Variables

Buat file `.env` di `backend/` (copy dari `.env.example`):

```env
APP_NAME=KaryaSetara
APP_ENV=local
APP_KEY=[YOUR_APP_KEY]
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=pgsql
DB_HOST=[YOUR_NEON_HOST]
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=[YOUR_DB_USER]
DB_PASSWORD=[YOUR_DB_PASSWORD]
DB_SSLMODE=require

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=[YOUR_GMAIL]
MAIL_PASSWORD=[YOUR_APP_PASSWORD_16_CHAR]
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=[YOUR_GMAIL]

GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
```

Buat `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
```

#### 4️⃣ Setup Database

```bash
cd backend
php artisan migrate --force
# Seed data (opsional, jika ada seeder)
php artisan db:seed
```

#### 5️⃣ Run Development Server

```bash
# Terminal 1 - Backend (host 0.0.0.0 biar HP bisa akses)
php artisan serve --host=0.0.0.0 --port=8000

# Terminal 2 - Frontend
cd frontend
npm run dev -- --host 0.0.0.0 --port 3000
```

Aplikasi akan berjalan di `http://localhost:3000` (dan `http://192.168.x.x:3000` untuk HP)

---

## 📱 Penggunaan

### Menjalankan Aplikasi

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

### User Guide

#### Untuk Worker (Pencari Kerja)

1. **Registrasi/Login**: Daftar sebagai `Pekerja` → isi email/password → pilih role → Login. Bisa juga `Masuk dengan Google` → pilih akun → jika baru, popup pilih role.
2. **Lengkapi Profil**: `/worker/profile` → pilih keahlian (Visual/Audio/Motorik/Komunikasi), isi alamat atau **Pilih Titik di Peta** (Leaflet) atau **Ambil Lokasi GPS**, simpan.
3. **Aksesibilitas**: `/worker/accessibility` → atur Font Besar / High Contrast / Large Target / Voice TTS (jika ON, semua klik di area Worker akan dibacakan).
4. **Cari Pekerjaan**: `/worker/jobs` → filter judul/perusahaan & kemampuan, pagination 5/page, lihat `Match: 100%` + jarak.
5. **Terima/Tolak**: Buka detail → `Terima Pekerjaan` (ConfirmModal) → status jadi `Aktif`, upah terkunci (Dana Aman). Bisa `Tandai Selesai` → menunggu konfirmasi employer.
6. **Laporan**: `/worker/reports` → `Buat Laporan` + upload bukti → status `Menunggu Review` → Admin tindak.

#### Untuk Employer (Perusahaan)

1. **Registrasi/Login**: Daftar sebagai `Perusahaan`.
2. **Buat Lowongan**: `/employer/jobs/create` → isi judul/deskripsi, pilih keahlian dibutuhkan, pilih titik di peta, isi upah → Publikasikan.
3. **Lihat Kandidat**: `/employer/jobs/[id]/candidates` → lihat ranking Min-Heap + Haversine, `Skor Prioritas` → `Pilih Pekerja Ini` (ConfirmModal) → status `Menunggu Penerimaan`.
4. **Konfirmasi Selesai**: Saat worker tandai selesai, di `/employer/jobs/[id]` klik `Konfirmasi Selesai & Cairkan Dana` → payment jadi `Processing`.

#### Untuk Admin

1. **Akses Admin Panel**: Login sebagai `admin` → `/admin/dashboard` → lihat stats.
2. **Moderasi Laporan**: `/admin/reports` → buka detail → lihat bukti → pilih `Status` + `Tindakan Moderasi` (Tetap Aktif / Peringatan / Nonaktifkan Pekerjaan / Nonaktifkan Akun Employer) → Simpan (ConfirmModal danger).
3. **Kelola Employer/Pekerjaan**: `/admin/employers` & `/admin/jobs` → `Nonaktifkan/Aktifkan` (real via `POST /api/admin/users/{id}/suspend`).

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:8000/api
Production:  https://karyasetara-production.up.railway.app/api
```

### Endpoints

#### Authentication

```http
POST /api/auth/register          # {name, email, password, password_confirmation, role, terms}
POST /api/auth/login             # {email, password} -> {token, user}
POST /api/auth/google            # {id_token, role?} -> smart login/daftar + account chooser
POST /api/auth/forgot-password   # {email} -> kirim link reset via Gmail
POST /api/auth/reset-password    # {email, token, password, password_confirmation}
POST /api/auth/logout            # Bearer token
GET  /api/auth/me                # Bearer token
GET  /api/me                     # alias
```

#### Worker (auth: worker)

```http
GET    /api/worker/profile              # show
PUT    /api/worker/profile              # {capability_bitmask, latitude, longitude, address, accessibility_preference}
GET    /api/worker/jobs/recommended     # Smart Matching (Haversine + bitmask)
GET    /api/worker/my-jobs              # ?status=completed untuk Riwayat
GET    /api/worker/jobs/{job}           # detail
POST   /api/worker/jobs/{job}/accept    # -> active, payment locked
POST   /api/worker/jobs/{job}/reject
POST   /api/worker/jobs/{job}/complete  # -> waiting_confirmation
GET    /api/worker/reports              # list laporan saya
POST   /api/worker/reports              # {job_id?, reason, description, priority, evidence?}
```

#### Employer (auth: employer)

```http
GET    /api/employer/profile
PUT    /api/employer/profile
GET    /api/employer/jobs
POST   /api/employer/jobs               # {title, description, required_capability_bitmask, latitude, longitude, location_address, wage}
GET    /api/employer/jobs/{job}
GET    /api/employer/jobs/{job}/candidates # Min-Heap ranking
POST   /api/employer/jobs/{job}/select-worker  # {worker_id}
POST   /api/employer/jobs/{job}/confirm-completion
```

#### Admin (auth: admin)

```http
GET    /api/admin/stats
GET    /api/admin/reports
GET    /api/admin/reports/{report}
PUT    /api/admin/reports/{report}      # {status, admin_notes, action: none|warning|suspend_job|suspend_employer}
GET    /api/admin/users?role=employer   # list employer (dipakai di /admin/employers)
POST   /api/admin/users/{user}/suspend  # {is_suspended}
GET    /api/admin/jobs
POST   /api/admin/jobs/{job}/suspend
```

### Example Request

```javascript
// Login
const res = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'worker@test.com', password: 'password123' })
});
const { data: { token, user } } = await res.json();
localStorage.setItem('auth_token', token);

// Google One-Tap
const res2 = await fetch('http://localhost:8000/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id_token: googleCredential, role: 'worker' }) // role hanya jika akun baru
});
```

📄 **[Dokumentasi API Lengkap](./docs/API.md)** _(opsional)_

---

## 🧪 Testing

### Running Tests

```bash
# Backend
cd backend
php artisan test
./vendor/bin/phpunit --coverage

# Frontend
cd frontend
npm run build # type check + build
npm run lint
```

### Test Coverage

```
Backend (PHPUnit):   Statements 78%, Branches 65%, Functions 82%, Lines 80%
Frontend (Build):    TypeScript 0 error, 28 routes static
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

  **Made with ❤️ by Tim KaryaSetara for ITECHNO CUP 2026**

</div>
