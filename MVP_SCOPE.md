# MVP Scope Portoflip

## Tujuan Dokumen

Dokumen ini memecah PRD menjadi ruang lingkup implementasi MVP yang lebih operasional agar AI dan developer dapat menentukan prioritas dengan cepat.

## Sasaran MVP

MVP harus cukup untuk:

- menampilkan portofolio kepada klien,
- menerima booking,
- menerima pembayaran DP via QRIS,
- mencatat transaksi otomatis ke sistem,
- memberi admin dashboard dasar untuk pengelolaan.

## Deliverables MVP

### 1. Infrastruktur

- `docker-compose.yml` untuk service aplikasi Laravel dan PostgreSQL
- konfigurasi environment yang konsisten untuk local development
- isolasi jaringan internal untuk database

### 2. Backend API

- endpoint dasar portofolio publik
- endpoint booking
- endpoint transaksi atau pembayaran
- endpoint admin dasar untuk pengelolaan data
- auth yang sesuai untuk admin dan client yang membutuhkan login

### 3. Web atau Mobile Client

- halaman galeri portofolio
- infinite scroll atau pola eksplorasi konten setara
- pemilihan jadwal
- checkout
- pembayaran DP via QRIS
- tampilan invoice atau tiket digital

### 4. Dashboard Admin Dasar

- login
- daftar booking
- daftar transaksi
- upload atau kelola karya
- update status booking atau proyek

## Acceptance Criteria MVP

MVP dianggap siap bila:

- environment lokal bisa dijalankan konsisten lewat Docker
- data portofolio dapat diambil dari backend
- klien dapat membuat booking melalui aplikasi web atau mobile
- sistem dapat memulai alur pembayaran DP via QRIS
- hasil transaksi dapat tercatat ke backend
- admin dapat melihat dan mengelola data inti dari dashboard dasar

## Prioritas Implementasi

Urutan pengerjaan yang direkomendasikan:

1. Setup Docker + PostgreSQL
2. Skema data inti dan migration
3. Backend API portofolio, booking, transaksi
4. Integrasi pembayaran Midtrans/QRIS
5. Client klien untuk eksplorasi dan checkout
6. Dashboard admin dasar

## Bukan Prioritas MVP

- Desktop App production-ready
- Push notification Android
- Integrasi AWS S3
- Fitur analitik lanjutan
- Workflow editing proyek yang kompleks

## Risiko Awal

- Integrasi Midtrans membutuhkan definisi flow callback yang jelas.
- Aset visual berukuran besar dapat memengaruhi performa jika optimasi belum dibuat.
- Perbedaan kebutuhan auth antar web, android, dan desktop perlu diputuskan sejak awal.
- Scope mudah melebar bila fitur admin desktop dimasukkan terlalu cepat.

## Aturan Prioritas

- Jika ada fitur baru, tanyakan dulu apakah fitur itu mendukung outcome MVP.
- Jika tidak langsung membantu booking, transaksi, atau pengelolaan inti admin, fitur tersebut tidak diprioritaskan.
- Jika ada konflik teknis, pilih solusi yang paling sederhana tetapi tetap aman dan mudah dipelihara.
