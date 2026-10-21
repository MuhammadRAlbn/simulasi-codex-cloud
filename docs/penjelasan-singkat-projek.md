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
