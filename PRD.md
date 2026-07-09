# PRD Portoflip

## 1. Informasi Meta

- **Nama Proyek:** Portoflip
- **Project Lead:** Burhan Abdur Rahman
- **Status & Versi:** Draft / MVP V1.0 (Cross-Platform)
- **Tanggal:** 9 Juli 2026

## 2. Ringkasan Produk

Portoflip adalah ekosistem lintas perangkat untuk bisnis kreatif berbasis portofolio, booking, dan transaksi. Produk ini dirancang agar klien dapat melakukan eksplorasi karya dan booking dengan cepat melalui Android atau Web, sementara admin dapat mengelola aset visual berukuran besar, transaksi, dan jadwal dari dashboard yang stabil dan terpusat.

Fokus utama produk adalah pengalaman visual sinematik dan minimalis di sisi klien, serta workflow operasional yang rapi, konsisten, dan mudah dipindahkan antar perangkat kerja di sisi admin melalui backend ter-container.

## 3. Latar Belakang

Saat ini terdapat dua kebutuhan utama:

1. Klien membutuhkan proses booking yang mudah dari perangkat mobile atau web, dengan alur eksplorasi karya yang nyaman dan checkout yang cepat.
2. Admin atau freelancer membutuhkan dashboard desktop atau web yang kuat untuk mengelola aset besar seperti video dan desain, memantau transaksi, serta menjaga konsistensi environment server tanpa setup ulang yang merepotkan.

## 4. Tujuan Proyek

Membangun ekosistem Portoflip lintas perangkat dengan antarmuka sinematik dan minimalis, didukung oleh backend terpusat yang di-containerisasi menggunakan Docker agar:

- booking dapat dilakukan dari Android dan Web,
- pembayaran DP via QRIS dapat tercatat otomatis,
- admin dapat mengelola portofolio, transaksi, dan timeline proyek dari satu pusat data,
- proses deployment dan perpindahan environment kerja menjadi konsisten dan scalable.

## 5. Pengguna Utama

### 5.1 Admin

- Menggunakan Desktop App atau Web.
- Mengelola portofolio resolusi tinggi.
- Memonitor transaksi Midtrans.
- Mengatur timeline proyek dan status booking.
- Memerlukan antarmuka yang produktif, stabil, dan cocok untuk pengelolaan aset besar.

### 5.2 Klien

- Menggunakan Android App atau Web.
- Menjelajahi showreel dan galeri portofolio.
- Memilih jadwal kosong.
- Melakukan booking dan pembayaran DP via QRIS.
- Memerlukan checkout yang cepat, jelas, dan minim friksi.

## 6. User Stories Inti

### 6.1 Portofolio Visual

Sebagai klien (Mobile/Web), saya ingin melihat portofolio dengan UI dark mode yang bersih, sehingga saya dapat fokus sepenuhnya pada kualitas karya visual yang ditampilkan.

### 6.2 Pembayaran DP

Sebagai klien (Mobile/Web), saya ingin membayar DP langsung lewat aplikasi menggunakan QRIS, sehingga pesanan saya otomatis masuk ke sistem tanpa konfirmasi manual.

### 6.3 Konsistensi Environment

Sebagai developer/admin, saya ingin menjalankan stack server dengan Docker, sehingga saya tidak perlu repot mengatur ulang versi PHP atau PostgreSQL ketika berpindah perangkat kerja.

## 7. Ruang Lingkup Fungsional

### 7.1 Fitur Klien

- Melihat galeri atau showreel portofolio.
- Menjelajahi konten dengan pengalaman visual dark mode.
- Infinite scroll untuk eksplorasi karya.
- Memilih slot jadwal yang tersedia.
- Checkout booking.
- Pembayaran DP menggunakan QRIS.
- Mendapatkan tiket atau invoice digital setelah transaksi berhasil.

### 7.2 Fitur Admin

- Login aman menggunakan token.
- Mengakses dashboard manajemen.
- Mengunggah dan mengelola karya.
- Mengelola data booking.
- Mengubah status booking atau progres proyek.
- Memantau transaksi yang masuk dari Midtrans.

### 7.3 Fitur Platform dan Infrastruktur

- Satu backend API dipakai bersama oleh Web, Android, dan Desktop.
- Lingkungan backend dijalankan dengan Docker dan Docker Compose.
- Database utama menggunakan PostgreSQL.
- Otentikasi aman untuk Android dan Desktop.
- Aset visual dioptimasi sebelum dikirim ke Android.

## 8. Tech Stack

- **Backend & API:** Laravel (PHP)
- **Authentication:** Laravel Sanctum untuk basis auth web; token/JWT aman untuk klien non-web sesuai implementasi final
- **Web Frontend:** React.js + Inertia.js + Tailwind CSS
- **Android App:** React Native (Expo)
- **Desktop App:** Electron.js + React, atau Tauri sebagai alternatif yang akan diputuskan kemudian
- **Database:** PostgreSQL
- **Infrastructure:** Docker & Docker Compose
- **Payment Gateway:** Midtrans API

## 9. Performa dan Keamanan

- Container Docker harus diisolasi, terutama database berada di jaringan internal.
- Android dan Desktop wajib menggunakan token yang aman.
- Aset visual perlu dikompresi sebelum disajikan ke aplikasi Android.
- Sistem harus menjaga konsistensi data transaksi dan booking.
- Endpoint pembayaran tidak boleh mengandalkan verifikasi manual setelah pembayaran berhasil.

## 10. User Flow

### 10.1 Arsitektur Flow Umum

Android, Web, dan Desktop memanggil endpoint API yang sama sebagai sumber data terpusat.

### 10.2 Flow Klien

1. Buka aplikasi atau website.
2. Eksplorasi galeri portofolio dengan infinite scroll.
3. Pilih jadwal kosong.
4. Lanjut ke checkout.
5. Bayar DP via QRIS.
6. Sistem membuat tiket atau invoice digital.

### 10.3 Flow Admin

1. Login menggunakan token.
2. Membuka dashboard manajemen.
3. Upload atau kelola karya.
4. Memantau booking dan transaksi.
5. Mengubah status booking atau progres proyek.

## 11. Arahan Desain

- Visual harus sinematik dan minimalis.
- Default experience klien mengarah ke dark mode.
- Elemen UI dibuat tersembunyi atau minimal bila memungkinkan.
- Interaksi Android mengutamakan gesture.
- Tata letak galeri bersifat asimetris.
- Desain harus menonjolkan karya visual, bukan ornamen UI.

## 12. Referensi dan Artefak

- Figma: belum diisi
- Skema Docker: belum diisi
- ERD: belum diisi

Semua tautan referensi di atas harus ditambahkan ketika artefak desain dan arsitektur telah tersedia.

## 13. Prioritas MVP

Fitur yang wajib ada agar produk dapat mulai beroperasi:

1. `docker-compose.yml` untuk Laravel + PostgreSQL
2. Backend API untuk portofolio dan transaksi
3. Web/Android client untuk booking dan QRIS
4. Dashboard Web dasar untuk admin

## 14. Rencana Lanjutan V2.0

- Aplikasi Desktop khusus Admin berbasis Electron atau Tauri
- Push notification Android saat proyek selesai diedit
- Integrasi Cloud Storage seperti AWS S3 untuk file video

## 15. Batasan dan Keputusan Saat Ini

- Nama proyek yang dipakai di dokumen ini adalah **Portoflip** agar konsisten dengan nama folder project saat ini.
- Desktop App belum menjadi bagian MVP wajib.
- Detail ERD, struktur endpoint final, dan status transaksi final belum didefinisikan penuh dalam brief awal.
- Jika ada implementasi teknis yang belum tertulis di PRD ini, keputusan harus diturunkan dari prioritas MVP dan tidak boleh bertentangan dengan pengalaman produk yang sinematik, minimalis, dan lintas perangkat.

## 16. Kriteria Sukses MVP

MVP dianggap berhasil jika:

- klien dapat melihat portofolio dari web atau mobile,
- klien dapat melakukan booking dan membayar DP via QRIS,
- transaksi masuk ke sistem tanpa konfirmasi manual,
- admin dapat mengelola karya dan booking dari dashboard dasar,
- environment backend dapat dijalankan konsisten melalui Docker tanpa setup manual yang berulang.
