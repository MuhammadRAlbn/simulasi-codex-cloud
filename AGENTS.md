# Aturan pengembangan FocusFlow

## Sumber acuan dan batas tahap saat ini

- Ikuti instruksi pengguna dan aturan yang lebih tinggi; gunakan `docs/spec.md` sebagai acuan kebutuhan produk.
- Seluruh dokumentasi proyek dan teks antarmuka ditulis dalam bahasa Indonesia. Nama teknis, pengenal, dan merek boleh dipertahankan.
- Tahap dokumentasi telah selesai. Pengguna menyetujui spesifikasi dan mengizinkan implementasi melalui pesan “ya sudah sesuai dan lakukan !”; keputusan dicatat di `docs/spec.md`.
- Tahap saat ini mencakup implementasi landing page dan verifikasi acceptance criteria yang disetujui. Kode aplikasi serta pengujian yang relevan boleh dibuat.
- Gunakan HTML dan CSS statis tanpa dependensi runtime untuk memenuhi ruang lingkup. Jangan menambah framework atau layanan yang tidak dibutuhkan.
- Perubahan ruang lingkup berikutnya tetap mengikuti alur persetujuan spesifikasi di bawah.

## Alur pengembangan berbasis spesifikasi

1. Sebelum bekerja, baca dokumen ini, `docs/spec.md`, dan instruksi tambahan yang berlaku pada direktori terkait.
2. Tentukan kebutuhan dan acceptance criteria yang akan ditangani dengan merujuk ID-nya, misalnya `KF-03` dan `AC-04`.
3. Jika permintaan baru mengubah ruang lingkup, perbarui spesifikasi terlebih dahulu. Catat dampak, asumsi, dan pertanyaan yang belum terjawab; minta keputusan manusia untuk perubahan perilaku produk yang belum disepakati.
4. Setelah tahap implementasi diizinkan, buat perubahan sekecil yang diperlukan untuk memenuhi spesifikasi yang disetujui. Jangan menambahkan fitur di luar ruang lingkup.
5. Verifikasi acceptance criteria yang terdampak dengan pengujian yang sesuai. Jangan melonggarkan kriteria atau mengubah hasil yang diharapkan hanya agar pemeriksaan lolos.
6. Laporkan kebutuhan yang dipenuhi, berkas yang berubah, pemeriksaan yang benar-benar dijalankan, hasilnya, dan keterbatasannya. Bedakan lulus, gagal, belum diuji, dan terhalang.

## Menjaga spesifikasi

- Pertahankan ID kebutuhan dan acceptance criteria yang sudah ada. Tambahkan ID baru untuk kebutuhan baru dan tandai kebutuhan yang dibatalkan beserta alasannya.
- Kebutuhan harus menjelaskan perilaku yang dapat diamati. Acceptance criteria harus menyatakan kondisi, tindakan jika relevan, dan hasil yang dapat diperiksa.
- Bedakan kebutuhan yang disepakati, asumsi sementara, dan pertanyaan terbuka. Jangan menganggap asumsi sudah disetujui.
- Catat keputusan peninjauan dalam riwayat keputusan di `docs/spec.md`. Jangan mengubah status menjadi disetujui tanpa persetujuan eksplisit manusia.
- Jika kode dan spesifikasi berbeda, laporkan perbedaannya dan selesaikan berdasarkan kebutuhan yang disetujui. Jangan menyembunyikannya dengan mengubah spesifikasi secara sepihak.

## Batas produk dan mutu

- FocusFlow pada tahap produk ini adalah satu landing page untuk produk produktivitas fiktif.
- Tidak ada backend, database, autentikasi, formulir pendaftaran, penyimpanan data pengguna, atau integrasi layanan pihak ketiga.
- Kartu fitur menjelaskan konsep produk; kartu tersebut tidak menyediakan aplikasi pengelola tugas, timer, atau dasbor yang berfungsi.
- Pertahankan aksesibilitas, perilaku responsif, dan CTA yang jujur sesuai spesifikasi. Jangan menambahkan tautan kosong, statistik tanpa sumber, testimoni rekaan, atau klaim produk sudah tersedia.
- Pilihan teknologi dan dependensi harus sesuai ruang lingkup serta keputusan manusia; jangan menganggap framework tertentu sudah dipilih.

## Penyelesaian tahap

- Tahap dokumentasi selesai ketika seluruh bagian spesifikasi, acceptance criteria yang dapat diuji, asumsi, dan pertanyaan terbuka tersedia dan konsisten.
- Penyelesaian dokumen bukan bukti aplikasi sudah berjalan atau acceptance criteria implementasi sudah lulus.
- Pada tahap implementasi, sertakan pemetaan perubahan dan bukti pemeriksaan ke ID kebutuhan sebelum menyatakan pekerjaan selesai.
