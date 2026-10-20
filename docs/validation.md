# Hasil verifikasi FocusFlow

Tanggal: 20 Oktober 2026 (Asia/Jakarta).

Acuan: spesifikasi versi 1.0 yang disetujui pengguna di `docs/spec.md`.

## Ringkasan

Implementasi tersedia sebagai HTML/CSS statis. **17 pemeriksaan otomatis lulus, 0 gagal pada Google Chrome stabil 155.0.8059.84.** Angka tersebut adalah jumlah pemeriksaan, bukan jumlah acceptance criteria: beberapa kriteria memiliki lebih dari satu pemeriksaan.

AC-01–AC-12 lulus berdasarkan pengujian Chrome dan pemeriksaan sumber. **AC-13 masih parsial**, karena bagian Firefox belum diuji. Tidak ada kegagalan aplikasi yang ditemukan pada pemeriksaan yang telah dijalankan.

## Lingkungan dan pelaksanaan

- Aplikasi disajikan melalui `python3 -m http.server 4173 --bind 127.0.0.1` dari direktori repositori, tanpa backend/database aplikasi atau kredensial.
- Pengujian dijalankan melalui `node tests/browser-checks.mjs`, dengan Playwright 1.58.2 dan Google Chrome stabil 155.0.8059.84. Proses terakhir selesai dengan kode keluar 0.
- Setelah metode tangkapan layar zoom disesuaikan ke ukuran native CDP, pemeriksaan terkait saja diulang dengan `node tests/browser-checks.mjs --zoom-only`: 1 lulus, 0 gagal, kode keluar 0. Tidak ada perubahan berkas aplikasi. Hasil tambahan tersimpan dalam `chrome-zoom-results.json`; tangkapan layar zoom lengkap berukuran 1440 × 3896 piksel.
- Dependensi dan browser pengujian berada di `/tmp/focusflow-qa`, terpisah dari berkas aplikasi.
- Paket Chrome diunduh melalui HTTPS dari `dl.google.com`; SHA256 cocok dengan metadata paket resmi. Chromium 154.0.8037.57 yang tersedia di mesin juga digunakan untuk inspeksi visual tambahan, dan tidak dilaporkan sebagai Google Chrome.
- Inspeksi visual mencakup desktop dan ponsel. Pemeriksaan otomatis mencakup ketiga viewport yang ditetapkan, serta pembesaran browser nyata 200%.
- Bukti JSON dan tangkapan layar dari eksekusi saat ini tersedia sementara di `/tmp/focusflow-qa/results/`. Jalankan ulang perintah dalam `README.md` untuk menghasilkan bukti baru.

## Hasil per acceptance criterion

| ID | Status | Bukti yang diamati |
| --- | --- | --- |
| AC-01 | Lulus | Rute `/` memberi HTTP 200; judul dokumen dan urutan hero, fitur, CTA, footer sesuai. |
| AC-02 | Lulus | Satu H1, merek, deskripsi hero, dan naskah cocok dengan spesifikasi. |
| AC-03 | Lulus | Satu target `#fitur`, tepat tiga kartu dengan judul/deskripsi sesuai, tanpa kontrol aplikasi. |
| AC-04 | Lulus | Kedua CTA bekerja melalui klik, Enter, dan sentuhan pada 320 × 800; awal bagian fitur terlihat dan rute tetap `/` dengan fragmen `#fitur`. Tidak ada pengiriman data atau navigasi dokumen baru. |
| AC-05 | Lulus | Footer terlihat setelah digulir ke bawah dan memuat teks produk fiktif yang ditentukan. |
| AC-06 | Lulus | Sumber hanya HTML/CSS/SVG; tidak ada skrip runtime, formulir, autentikasi, API, pelacakan, atau penyimpanan pengguna. Pemeriksaan browser tidak menemukan cookie maupun isi local/session storage. |
| AC-07 | Lulus | Viewport 320 × 800, 768 × 1024, dan 1440 × 900 memiliki lebar gulir sama dengan viewport, tanpa konten di luar batas atau section bertumpang tindih. Pada 320 piksel, kartu tersusun satu kolom. |
| AC-08 | Lulus | `lang="id"`, satu `main`, footer, dan hierarki H1/H2/H3 benar. Tab mengikuti urutan baca; fokus terlihat dan Enter mengaktifkan tautan. |
| AC-09 | Lulus | Kontras teks minimum yang diukur 6,08:1; kedua CTA sekitar 168,47 × 53 piksel CSS. Pada zoom browser 200%, konten dan kedua CTA tetap berfungsi tanpa gulir horizontal. |
| AC-10 | Lulus | Naskah dan nama tautan sesuai bahasa Indonesia dalam spesifikasi; tidak ada teks pengisi atau klaim hasil terukur. |
| AC-11 | Lulus | Semua konten dan kedua CTA bekerja saat JavaScript dinonaktifkan. Preferensi pengurangan gerakan menghapus transisi; tidak ada animasi gerak atau gulir halus yang perlu dinonaktifkan. |
| AC-12 | Lulus | Seluruh permintaan aplikasi menuju asal yang sama; font sistem; tidak ada permintaan pihak ketiga, API, atau pengiriman data. |
| AC-13 | Parsial | AC-01–AC-05 dan pemeriksaan galat lulus di Google Chrome 155.0.8059.84. Tidak ada galat konsol, permintaan gagal, atau aset gagal dimuat. Firefox belum diuji. |

Chrome dapat melakukan revalidasi berkas favicon setelah perubahan fragmen. Pengujian membolehkan GET untuk favicon lokal tersebut, sambil tetap menolak pengiriman data, permintaan API, dan navigasi dokumen baru saat CTA diaktifkan.

Pembesaran 200% menggunakan preferensi zoom browser, bukan `CSS zoom`, pengubahan ukuran font, atau emulasi pinch. Pada area konten fisik 1440 × 900, hasil pengukuran menunjukkan `devicePixelRatio = 2`, viewport efektif 720 × 450, dan lebar gulir dokumen 720 piksel CSS.

## Batasan dan langkah berikutnya

- Unduhan resmi Firefox dari `download.mozilla.org`, `archive.mozilla.org`, dan `download-installer.cdn.mozilla.net` ditolak proxy dengan HTTP 403. Unduhan Playwright Firefox dari CDN-nya juga ditolak.
- Alternatif paket Firefox 158.0-1 dari Debian berhasil diperoleh. Tanda tangan metadata diverifikasi dengan `sqv` dan keyring sistem Debian; SHA256 indeks dan paket juga cocok. Paket tersebut membutuhkan GLIBC 2.43 serta pustaka lain yang lebih baru daripada mesin ini, sehingga tidak dapat dijalankan. Pustaka sistem tidak diubah untuk memaksanya berjalan.
- Untuk menyelesaikan AC-13, diperlukan Firefox stabil yang kompatibel. Salah satu jalurnya adalah mengizinkan tiga domain resmi Mozilla di atas melalui pengaturan jaringan lingkungan, lalu memasang Firefox dari sumber resmi dan menjalankan AC-01–AC-05 beserta pemeriksaan konsol/aset di browser tersebut. Konfigurasi jaringan belum diubah oleh pekerjaan ini.
- Hasil aksesibilitas mencakup pemeriksaan yang ditetapkan dalam spesifikasi, bukan audit penuh WCAG atau pengujian pembaca layar menyeluruh.
- Halaman belum dipublikasikan ke hosting. Server lokal saat pengujian adalah alat pengembangan, bukan bukti deployment.

## Identitas berkas aplikasi yang diuji

Repositori belum memiliki commit; SHA256 berikut mengidentifikasi isi berkas pada pengujian ini.

| Berkas | SHA256 |
| --- | --- |
| `index.html` | `1e7fbf1dd506846ced5900325fa4bb63b2157da94d3fa3d5531ba31634a187b3` |
| `styles.css` | `b683640123871a4ccbf54a3f18bd312f89de4585924fff209ecaf38dd22ca392` |
| `assets/favicon.svg` | `e46c9e058769d6c313e788001c9495586b60524fb0038fb00b0fabd98c879599` |
