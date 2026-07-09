# AI Implementation Guardrails

## Tujuan

Dokumen ini berisi pagar pembatas implementasi agar AI dan developer tidak menyimpang dari visi produk, tidak menambah fitur liar, dan tidak membuat asumsi teknis yang terlalu jauh dari PRD.

## Aturan Inti

1. Selalu cek `PRD.md` sebelum merancang fitur besar, skema data, atau arsitektur baru.
2. Jika kebutuhan belum tertulis jelas, tulis sebagai **asumsi** atau **opsi**, bukan sebagai fakta.
3. Semua usulan implementasi harus mendukung MVP lebih dulu sebelum membahas V2.0.
4. Jangan memperluas scope tanpa alasan produk yang jelas.
5. Jangan membuat keputusan yang bertentangan dengan pengalaman visual sinematik dan minimalis.

## Batasan Produk

- Produk ini adalah platform booking dan portofolio kreatif lintas perangkat.
- Fokus klien adalah eksplorasi karya, booking, dan pembayaran DP via QRIS.
- Fokus admin adalah pengelolaan karya, transaksi, dan jadwal.
- Backend adalah pusat data utama untuk semua client.

## Batasan Teknis

- Backend utama menggunakan Laravel.
- Database utama menggunakan PostgreSQL.
- Infrastruktur target menggunakan Docker dan Docker Compose.
- Frontend web menggunakan React.js + Inertia.js + Tailwind CSS.
- Android app menggunakan React Native dengan Expo.
- Payment gateway yang direncanakan adalah Midtrans.

## Aturan Saat Menulis Kode

- Jangan menambah package atau service baru bila stack yang sudah dipilih masih memadai.
- Jangan mengubah koneksi database utama ke selain PostgreSQL tanpa persetujuan.
- Jangan menulis integrasi pembayaran palsu seolah-olah sudah siap produksi.
- Jangan menyatakan webhook, callback, atau settlement flow Midtrans sudah final bila belum dibuat.
- Jangan menganggap kebutuhan admin desktop sama dengan dashboard web admin.

## Aturan Saat Mendesain Data

- Model data harus minimal mendukung portofolio, booking, jadwal, transaksi, dan pengguna.
- Jangan menambahkan tabel yang tidak punya hubungan jelas dengan MVP.
- Jika ada relasi yang belum pasti, dokumentasikan dulu sebelum diimplementasikan.
- Status transaksi dan booking harus eksplisit, tidak boleh ambigu.

## Aturan Saat Mendesain API

- Gunakan satu backend API untuk semua platform jika memungkinkan.
- Bedakan endpoint publik klien dan endpoint admin bila hak akses berbeda.
- Jangan mengarang kontrak API final tanpa dokumen atau implementasi pendukung.
- Semua endpoint pembayaran harus dirancang dengan mempertimbangkan keamanan dan idempotensi.

## Aturan Saat Mendesain UI

- UI klien harus mengedepankan dark mode, fokus visual, dan minim distraksi.
- UI admin boleh lebih utilitarian, tetapi tetap rapi dan efisien.
- Jangan mengisi layar dengan terlalu banyak kontrol pada pengalaman klien.
- Galeri dan showreel harus menjadi pusat pengalaman, bukan form.

## Aturan Saat Menulis Dokumentasi atau Jawaban AI

- Sebutkan bagian yang pasti, asumsi, dan keputusan terbuka secara terpisah bila perlu.
- Gunakan istilah yang konsisten: Portoflip, Klien, Admin, DP, QRIS.
- Jika repo belum memiliki implementasi, katakan "belum ada" atau "belum terlihat di repo".
- Jangan memakai bahasa yang terlalu yakin untuk hal yang belum diverifikasi.

## Checklist Anti-Halusinasi

Sebelum menjawab atau mengimplementasikan sesuatu, pastikan:

- Apakah ini tertulis di `PRD.md`?
- Apakah ini masih dalam scope MVP?
- Apakah ini sesuai stack yang sudah dipilih?
- Apakah ini benar-benar ada di repo, atau hanya asumsi?
- Apakah ini perlu dikonfirmasi ke user?

## Format Rekomendasi Saat AI Menjawab

- Fakta dari PRD
- Fakta dari repository
- Asumsi yang dipakai
- Rekomendasi implementasi
- Hal yang masih perlu keputusan user
