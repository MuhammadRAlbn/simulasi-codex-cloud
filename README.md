# FocusFlow

Landing page berbahasa Indonesia untuk produk produktivitas fiktif. Implementasi menggunakan HTML dan CSS statis, tanpa JavaScript, backend, database, dependensi runtime, atau proses build.

## Menjalankan halaman

Dari direktori repositori:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Server berkas statis tersebut hanya alat pengembangan. Berkas `index.html`, `styles.css`, dan direktori `assets/` dapat disajikan oleh hosting statis mana pun. Tidak diperlukan variabel lingkungan atau kredensial.

## Pengujian browser

Jalankan server di atas pada terminal pertama. Pada terminal kedua, dari direktori repositori, siapkan dependensi pengujian terpisah dari aplikasi:

```sh
npm install --prefix /tmp/focusflow-qa --cache /tmp/focusflow-npm-cache --no-save --package-lock=false playwright@1.58.2
```

Pada lingkungan ini Google Chrome stabil tersedia di lokasi berikut. Jalankan:

```sh
CHROME_BIN=/tmp/focusflow-qa/chrome/opt/google/chrome/chrome node tests/browser-checks.mjs
```

Pada mesin lain, arahkan `CHROME_BIN` ke biner Google Chrome stabil yang dipasang dari sumber resmi. `PLAYWRIGHT_MODULE` dapat menunjuk lokasi lain dari `playwright/index.mjs`, dan `BASE_URL` dapat mengganti alamat server uji. Pengujian tidak memerlukan dependensi runtime atau JavaScript pada halaman.

Hasil JSON dan tangkapan layar ditulis ke `/tmp/focusflow-qa/results/` secara default; gunakan `QA_OUTPUT` untuk mengganti direktori keluaran. Skrip mengembalikan status gagal jika salah satu pemeriksaannya gagal. Skrip ini menguji bagian Chrome; kelulusan skrip saja **tidak** membuktikan kelulusan pemeriksaan Firefox pada AC-13.

Gunakan `node tests/browser-checks.mjs --zoom-only` untuk mengulang hanya pemeriksaan zoom browser 200% dengan pengaturan Chrome yang sama.

## Dokumen pengembangan

- [Aturan SDD](AGENTS.md)
- [Spesifikasi yang disetujui](docs/spec.md)
- [Hasil verifikasi acceptance criteria](docs/validation.md)

Perubahan perilaku produk harus mengikuti spesifikasi dan alur persetujuan dalam `AGENTS.md`.
