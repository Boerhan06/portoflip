# AI Project Context

## Tujuan Dokumen

Dokumen ini adalah ringkasan kerja untuk AI, copilot, atau developer agar tetap konsisten dengan PRD awal dan tidak berhalusinasi saat membuat keputusan implementasi.

Jika ada konflik antara dokumen ini dan `PRD.md`, maka `PRD.md` menjadi sumber kebenaran utama.

## Identitas Proyek

- **Nama Produk:** Portoflip
- **Jenis Produk:** Ekosistem booking dan portofolio lintas perangkat
- **Owner / Lead:** Burhan Abdur Rahman
- **Fase Saat Ini:** Draft menuju MVP V1.0

## Masalah yang Diselesaikan

- Klien membutuhkan proses booking dari HP Android atau Web yang cepat dan nyaman.
- Admin membutuhkan dashboard yang kuat untuk mengelola aset visual besar, booking, dan transaksi.
- Developer membutuhkan environment backend yang konsisten antar perangkat kerja.

## Outcome Utama

- Klien dapat menjelajahi portofolio dan melakukan booking.
- Pembayaran DP via QRIS dapat tercatat otomatis.
- Admin memiliki pusat kontrol untuk portofolio, transaksi, dan timeline proyek.
- Backend mudah dijalankan ulang lewat Docker tanpa setup environment manual yang rentan berbeda.

## Pengguna

### Klien

- Platform: Android App dan Web
- Tujuan: eksplorasi karya, booking, bayar DP via QRIS
- Kebutuhan utama: cepat, visual kuat, checkout minim friksi

### Admin

- Platform: Web sekarang, Desktop App pada tahap lanjutan
- Tujuan: mengelola karya, jadwal, booking, dan transaksi
- Kebutuhan utama: stabil, efisien, cocok untuk aset resolusi tinggi

## Prinsip Produk

- Visual-first: karya harus lebih menonjol daripada elemen UI.
- Minimalis: antarmuka tidak boleh penuh gangguan.
- Konsisten: satu sumber data dan alur backend untuk semua platform.
- Praktis: booking dan pembayaran harus terasa instan.
- Portable: stack backend harus bisa dipindahkan antar mesin dengan hambatan rendah.

## In-Scope MVP

- Docker Compose untuk Laravel + PostgreSQL
- Backend API untuk portofolio dan transaksi
- Web atau Android client untuk booking dan QRIS
- Dashboard web dasar untuk admin

## Out of Scope Sementara

- Fitur desktop admin penuh sebagai fitur wajib MVP
- Cloud storage video production-grade
- Push notification Android
- Fitur tambahan yang belum disebut di PRD

## Sumber Kebenaran

Saat AI atau developer perlu mengambil keputusan, urutan referensi adalah:

1. `PRD.md`
2. `AI_IMPLEMENTATION_GUARDRAILS.md`
3. `MVP_SCOPE.md`
4. Kode yang sudah ada di repository

## Istilah yang Harus Konsisten

- Gunakan nama **Portoflip** sebagai nama proyek utama.
- Gunakan istilah **Klien** untuk pengguna pemesan jasa.
- Gunakan istilah **Admin** untuk pengelola sistem dan aset.
- Gunakan istilah **DP** untuk pembayaran uang muka.
- Gunakan istilah **QRIS** sebagai metode pembayaran utama dalam MVP.

## Larangan untuk AI

- Jangan mengarang endpoint API yang belum didefinisikan.
- Jangan menganggap desktop app sudah pasti bagian MVP wajib.
- Jangan mengubah stack inti tanpa alasan kuat dan persetujuan.
- Jangan menambahkan fitur produk baru yang tidak ada di PRD tanpa menandainya sebagai usulan.
- Jangan menyamakan kebutuhan klien dan admin; alurnya berbeda.

## Pertanyaan Terbuka

Topik berikut belum final dan harus diperlakukan sebagai keputusan terbuka:

- Apakah auth non-web menggunakan Sanctum token, JWT murni, atau pola token lain yang setara
- Apakah desktop admin akan memakai Electron atau Tauri
- Bagaimana struktur ERD final untuk booking, transaksi, portofolio, dan jadwal
- Bagaimana detail webhook atau callback Midtrans akan diimplementasikan
- Format tiket atau invoice digital yang final

## Aturan Saat Mengusulkan Solusi

- Selalu utamakan implementasi yang mendukung MVP.
- Jika requirement belum jelas, tandai sebagai asumsi.
- Jika ada lebih dari satu opsi, rekomendasikan satu opsi dan jelaskan trade-off singkat.
- Jangan menyebut sesuatu "sudah ada" bila belum terlihat di repo atau dokumen.
