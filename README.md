---

```markdown
# 🎬 Portoflip

Portoflip adalah platform manajemen portofolio dan sistem pemesanan (*booking*) jasa profesional. Aplikasi ini dirancang untuk menampilkan karya visual dengan estetika sinematik, sekaligus memudahkan klien dalam melakukan pemesanan jadwal dan pembayaran terintegrasi.

Repositori ini berisi kode sumber untuk **Backend API** dan **Frontend Web (Landing Page & Dashboard)**. Untuk ekosistem aplikasi Android dan Desktop, pengembangannya dilakukan pada repositori terpisah.

## ✨ Fitur Utama (MVP)

*   **Galeri Sinematik:** Tampilan portofolio asimetris dengan pendekatan desain *pure dark mode*, minimalis, dan sentuhan *glassmorphism*.
*   **Sistem Reservasi:** Pemesanan jasa berbasis slot harian yang mencegah bentrok jadwal.
*   **Integrasi Pembayaran:** Konfirmasi pembayaran otomatis menggunakan QRIS (Midtrans).
*   **API-Ready:** Endpoint yang sudah diamankan dengan Laravel Sanctum, siap dihubungkan dengan aplikasi Android dan Desktop di masa mendatang.

## 🛠️ Tech Stack

*   **Backend:** Laravel (PHP)
*   **Frontend:** React.js + Inertia.js
*   **Styling:** Tailwind CSS
*   **Database:** PostgreSQL
*   **Autentikasi API:** Laravel Sanctum
*   **Payment Gateway:** Midtrans (Sandbox/Production)

## 🚀 Panduan Instalasi (Lokal)

Pastikan sistem Anda sudah menginstal Node.js, Composer, dan PostgreSQL sebelum memulai.

### 1. Kloning Repositori
```bash
git clone [https://github.com/username/portoflip.git](https://github.com/username/portoflip.git)
cd portoflip

```

### 2. Instalasi Dependensi

Instal *library* PHP (Backend) dan paket Node.js (Frontend).

```bash
composer install
npm install

```

### 3. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`.

```bash
cp .env.example .env

```

Buka file `.env` dan atur koneksi *database* PostgreSQL Anda:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=portoflip
DB_USERNAME=postgres
DB_PASSWORD=password_anda

```

### 4. Generate Key & Migrasi Database

Buat kunci rahasia aplikasi dan bangun struktur tabel *database*.

```bash
php artisan key:generate
php artisan migrate

```

### 5. Menjalankan Aplikasi

Buka dua terminal terpisah untuk menjalankan *server backend* dan *mesin frontend* (Vite) secara bersamaan.

**Terminal 1 (Backend):**

```bash
php artisan serve

```

**Terminal 2 (Frontend):**

```bash
npm run dev

```

Akses aplikasi melalui browser pada `http://localhost:8000` atau URL *virtual host* lokal Anda (misal: `http://portoflip.test`).

## 🎨 Panduan Desain (Guardrails)

Bagi kontributor yang melakukan perubahan pada komponen UI di `resources/js/Pages/`, wajib mematuhi panduan visual berikut:

* **Tema:** Hanya gunakan *dark mode* (latar belakang sangat gelap, bukan abu-abu).
* **Layout:** Manfaatkan *white-space* yang luas. Hindari komponen *default* yang kaku.
* **Efek Visual:** Gunakan estetika *glassmorphism* (border semi-transparan dan *blur*) secara elegan.

```

```
