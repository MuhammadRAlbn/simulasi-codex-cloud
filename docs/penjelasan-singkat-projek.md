# Penjelasan Singkat FocusFlow

FocusFlow adalah landing page berbahasa Indonesia untuk produk produktivitas fiktif. Proyek ini menjadi sarana belajar pengembangan berbasis spesifikasi (SDD): kebutuhan ditulis, ditinjau, dan disetujui sebelum kode dibuat.

Halaman memperkenalkan tiga konsep fitur:

- **Prioritas Harian:** membantu menentukan tugas terpenting.
- **Sesi Fokus:** membangun kebiasaan bekerja dengan jeda yang seimbang.
- **Ringkasan Progres:** membantu memahami kemajuan harian.

Ketiga fitur tersebut berupa penjelasan konsep. Tombol “Jelajahi fitur” mengarahkan pengunjung ke bagian fitur pada halaman yang sama. Footer menjelaskan bahwa FocusFlow adalah produk fiktif.

Implementasi menggunakan HTML, CSS, dan SVG statis, tanpa JavaScript, backend, database, atau dependensi runtime. Tata letaknya menyesuaikan layar ponsel dan komputer.

Untuk melihat halaman, buka `index.html` di browser. Pertahankan posisi `styles.css` dan folder `assets/` sesuai struktur repositori. Tidak diperlukan `npm run dev`.

Untuk menjalankan server statis, gunakan perintah berikut dari direktori repositori:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Rincian kebutuhan tersedia di [spesifikasi proyek](spec.md), sedangkan hasil pemeriksaan tercatat di [laporan verifikasi](validation.md).

## Glosarium Git Singkat

- **Branch:** jalur pengembangan terpisah, misalnya `main` atau `test/penjelasan-singkat-projek`.
- **Commit:** catatan perubahan yang disimpan dalam riwayat Git lokal.
- **Push:** mengirim commit dari repositori lokal ke repositori di GitHub.
- **Fetch:** mengambil pembaruan dari GitHub tanpa langsung menggabungkannya ke branch aktif.
- **Pull:** mengambil pembaruan, lalu mengintegrasikannya ke branch aktif sesuai konfigurasi Git.
- **Merge:** memasukkan perubahan dari satu branch ke branch yang sedang aktif.
