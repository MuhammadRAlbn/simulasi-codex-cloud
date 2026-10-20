# Spesifikasi FocusFlow

Versi: 1.0

Status: **Disetujui pengguna untuk implementasi**

Tahap: Implementasi dan verifikasi berdasarkan persetujuan pengguna pada 20 Oktober 2026.

## 1. Tujuan

FocusFlow adalah produk produktivitas fiktif untuk eksperimen Spec-Driven Development (SDD). Landing page memperkenalkan manfaatnya: membantu pengguna menentukan prioritas, menjaga fokus, dan memahami progres.

Tujuan halaman adalah membuat pengunjung memahami nilai produk dan menjelajahi tiga fitur melalui CTA yang berfungsi. Keberhasilan dinilai melalui acceptance criteria, tanpa pelacakan pengunjung atau target konversi komersial.

## 2. Target pengguna

| Pengguna | Kebutuhan utama |
| --- | --- |
| Mahasiswa | Memilah tugas belajar dan menjaga fokus saat mengerjakan tugas. |
| Pekerja profesional | Menentukan pekerjaan penting di tengah banyak distraksi. |
| Pekerja lepas | Mengatur prioritas dan memahami kemajuan pekerjaan secara sederhana. |

Pengunjung dapat membuka halaman dari ponsel maupun komputer, termasuk menggunakan keyboard dan pembaca layar. Mereka tidak perlu memiliki akun.

## 3. Ruang lingkup

### Termasuk

- Satu halaman publik pada rute `/`, berbahasa Indonesia dan responsif.
- Hero, bagian berisi tepat tiga fitur, bagian CTA penutup, dan footer.
- CTA berupa tautan internal ke bagian fitur, sesuai spesifikasi yang disetujui.
- Konten statis, navigasi keyboard, dan markup semantik yang dapat diakses.

### Di luar ruang lingkup

- Backend, database, API aplikasi, autentikasi, pembayaran, formulir, dan pengumpulan data pengguna.
- Aplikasi produktivitas yang berfungsi, seperti pengelola tugas, timer fokus, atau dasbor progres.
- Halaman tambahan, blog, harga, analitik, integrasi pihak ketiga, dan pengiriman surel.

Implementasi menggunakan HTML dan CSS statis tanpa dependensi runtime atau proses build. Penyedia hosting belum dipilih; publikasi tidak termasuk pekerjaan ini.

## 4. Halaman dan section

Urutan konten pada `/` mengikuti tabel berikut. Seluruh konten utama berada dalam satu landmark `main`; footer berada sesudahnya.

| Bagian | Isi dan perilaku yang ditetapkan |
| --- | --- |
| Hero | Nama merek **FocusFlow**; satu H1 **“Fokus lebih jernih, tuntaskan yang penting.”**; deskripsi **“Tentukan prioritas, bangun sesi fokus, dan lihat progresmu dalam satu alur yang sederhana.”**; CTA **“Jelajahi fitur”** ke `#fitur`. |
| Fitur (`id="fitur"`) | H2 **“Tiga langkah menuju kerja lebih terarah”**; tepat tiga kartu fitur dengan judul dan deskripsi di bawah. Kartu berupa informasi, bukan kontrol aplikasi. |
| CTA penutup | H2 **“Siap menata fokusmu?”**; teks **“Kenali cara FocusFlow membantu membangun kebiasaan kerja yang lebih terarah.”**; CTA kedua **“Jelajahi fitur”** ke `#fitur`. |
| Footer | Teks **“© FocusFlow. Produk fiktif untuk eksperimen SDD.”** terlihat tanpa interaksi tambahan. Tidak memuat tautan kosong atau kontak rekaan. |

Konten tiga kartu fitur:

| Judul kartu (H3) | Deskripsi |
| --- | --- |
| Prioritas Harian | Pilih tugas terpenting agar energi tersalurkan ke pekerjaan yang paling berarti. |
| Sesi Fokus | Bangun kebiasaan bekerja dalam sesi terarah dengan jeda yang seimbang. |
| Ringkasan Progres | Pahami kemajuan harian untuk merencanakan langkah berikutnya. |

Teks di atas menjadi acuan yang disetujui. Perubahan pesan atau tujuan CTA perlu dicatat dalam spesifikasi sebelum diterapkan.

## 5. User stories

| ID | Sebagai pengguna, saya ingin… | Kebutuhan terkait |
| --- | --- | --- |
| US-01 | Memahami manfaat FocusFlow dari hero agar dapat menilai relevansinya. | KF-01, KF-02 |
| US-02 | Membaca tiga fitur agar memahami konsep produk yang ditawarkan. | KF-03 |
| US-03 | Menggunakan CTA untuk langsung menuju penjelasan fitur tanpa mendaftar. | KF-04 |
| US-04 | Membaca dan menavigasi halaman dengan nyaman di ponsel maupun komputer. | KNF-01, KNF-02 |
| US-05 | Mengetahui bahwa ini produk fiktif dan tidak menyerahkan data pribadi. | KF-05, KF-06 |

## 6. Kebutuhan fungsional

| ID | Kebutuhan |
| --- | --- |
| KF-01 | Rute `/` menampilkan satu landing page lengkap dengan urutan hero, fitur, CTA penutup, dan footer. Judul dokumen adalah **“FocusFlow — Fokus pada yang penting”**. |
| KF-02 | Hero memuat merek, tepat satu H1 pada seluruh halaman, deskripsi, dan CTA sesuai bagian 4. |
| KF-03 | Bagian fitur memiliki target `#fitur` yang unik serta tepat tiga kartu dengan judul dan deskripsi sesuai bagian 4. Tidak ada kontrol tugas, timer, atau dasbor. |
| KF-04 | Kedua CTA menggunakan tautan internal dengan tujuan `#fitur`. Aktivasi melalui klik, sentuhan, atau tombol Enter membawa tampilan ke bagian fitur tanpa meninggalkan halaman atau mengirim data. Jika sudah berada di target, bagian fitur tetap terlihat. |
| KF-05 | Footer menampilkan nama FocusFlow dan pernyataan produk fiktif sesuai bagian 4. |
| KF-06 | Halaman dapat disajikan sebagai berkas statis tanpa backend atau database; tidak memerlukan kredensial. Halaman tidak menyediakan formulir, autentikasi, pelacakan, penyimpanan data pengguna, atau permintaan ke API. |

## 7. Kebutuhan nonfungsional

| ID | Kebutuhan dan cara ukur |
| --- | --- |
| KNF-01 | Responsif: pada viewport CSS 320 × 800, 768 × 1024, dan 1440 × 900 piksel, tidak ada gulir horizontal, konten terpotong, atau elemen saling menutupi. Semua bagian dapat dijangkau dengan gulir vertikal. Pada lebar 320 piksel, kartu tersusun satu kolom. |
| KNF-02 | Aksesibilitas: bahasa dokumen `id`; tepat satu H1, H2 untuk bagian fitur dan CTA, serta H3 untuk judul kartu; semua tautan dapat dijangkau dengan Tab dan diaktifkan dengan Enter; indikator fokus terlihat dan tidak tertutup. Kontras teks memenuhi WCAG 2.2 AA (4,5:1 untuk teks biasa, 3:1 untuk teks besar). Target interaksi CTA sekurangnya 44 × 44 piksel CSS. Pada pembesaran 200% di viewport 1440 × 900, konten dan CTA tetap terbaca serta dapat dioperasikan. |
| KNF-03 | Seluruh teks yang terlihat dan nama aksesibel menggunakan bahasa Indonesia, kecuali nama merek. Tidak ada teks pengisi seperti lorem ipsum atau klaim hasil yang tidak terbukti. |
| KNF-04 | Fungsi inti, termasuk konten dan navigasi kedua CTA, tetap bekerja ketika JavaScript dinonaktifkan. Jika animasi ditambahkan, pengaturan `prefers-reduced-motion: reduce` harus meniadakan gerakan nonesensial, termasuk gulir halus. Animasi tidak diwajibkan. |
| KNF-05 | Halaman tidak bergantung pada layanan atau aset pihak ketiga untuk menampilkan konten inti. Gunakan font sistem; aset lain, jika diperlukan, disajikan dari asal yang sama. Tidak ada permintaan jaringan pihak ketiga saat halaman dimuat atau CTA diaktifkan. |
| KNF-06 | Kompatibilitas: konten dan kedua CTA bekerja pada Chrome dan Firefox versi stabil yang tersedia saat verifikasi. Catat versi yang benar-benar diuji. Tidak ada galat konsol aplikasi atau permintaan aset yang gagal saat pengujian. |

Pemeriksaan aksesibilitas ini mencakup persyaratan halaman di atas; hasil pemeriksaan tersebut tidak boleh dilaporkan sebagai audit penuh WCAG.

## 8. Acceptance criteria yang dapat diuji

Kriteria berikut digunakan untuk memverifikasi implementasi. Status dan bukti hasil dicatat terpisah di `docs/validation.md`; persetujuan spesifikasi bukan bukti kelulusan. Pemeriksaan dilakukan pada halaman yang disajikan melalui HTTP lokal menggunakan server berkas statis; server tersebut hanya alat pengembangan, bukan backend aplikasi.

| ID | Kebutuhan | Kondisi, tindakan, dan hasil yang diharapkan |
| --- | --- | --- |
| AC-01 | KF-01 | Ketika `/` dibuka, halaman berhasil dimuat; judul tab sesuai KF-01; hero, fitur, CTA penutup, dan footer tampil dalam urutan yang ditetapkan. |
| AC-02 | KF-02 | Saat struktur dan tampilan hero diperiksa, merek, H1, deskripsi, serta CTA cocok dengan bagian 4; jumlah H1 di seluruh dokumen tepat satu. |
| AC-03 | KF-03 | Saat bagian fitur diperiksa, hanya ada satu target `id="fitur"` dan tepat tiga kartu; setiap judul dan deskripsi cocok dengan bagian 4. Tidak ada kontrol yang menjalankan fungsi aplikasi produktivitas. |
| AC-04 | KF-04 | Dari posisi hero, aktifkan CTA pertama melalui klik dan Enter dalam pengujian terpisah; ulangi untuk CTA kedua dari bagian penutup. Setiap aktivasi menampilkan awal bagian fitur dalam viewport, mempertahankan rute `/`, menggunakan fragmen `#fitur`, dan tidak memicu permintaan data. Pada viewport sentuh 320 × 800, kedua CTA memberikan hasil yang sama saat disentuh. |
| AC-05 | KF-05 | Saat halaman digulir sampai bawah, teks footer pada bagian 4 dapat dibaca tanpa membuka menu atau melakukan interaksi tambahan. |
| AC-06 | KF-06 | Sajikan hasil halaman melalui server statis saja, tanpa layanan aplikasi, database, atau kredensial. Halaman dan CTA tetap bekerja; pemeriksaan antarmuka, sumber proyek, dan jaringan tidak menemukan formulir, autentikasi, API, pelacakan, atau mekanisme penyimpanan data pengguna. |
| AC-07 | KNF-01 | Pada masing-masing viewport 320 × 800, 768 × 1024, dan 1440 × 900, periksa seluruh halaman: lebar gulir dokumen tidak melebihi lebar viewport; tidak ada konten terpotong atau tumpang tindih; semua bagian terjangkau. Pada 320 piksel, kartu tampil satu kolom. |
| AC-08 | KNF-02 | Inspeksi DOM atau pohon aksesibilitas menunjukkan `lang="id"`, satu landmark `main`, footer, dan hierarki heading sesuai KNF-02. Navigasi Tab mengikuti urutan baca, kedua CTA memiliki nama “Jelajahi fitur”, fokus terlihat, dan Enter berfungsi tanpa jebakan keyboard. |
| AC-09 | KNF-02 | Ukur pasangan warna teks dan latar dengan pemeriksa kontras: hasil memenuhi ambang KNF-02. Ukur kotak interaksi setiap CTA: minimal 44 × 44 piksel CSS. Pada zoom browser 200% di viewport 1440 × 900, tidak ada konten atau kontrol yang hilang atau saling menutupi. |
| AC-10 | KNF-03 | Tinjau semua teks terlihat dan nama aksesibel: sesuai bahasa dan konten bagian 4, tanpa lorem ipsum, teks antarmuka bahasa lain selain merek, atau klaim manfaat terukur tanpa bukti. |
| AC-11 | KNF-04 | Nonaktifkan JavaScript dan muat ulang halaman: semua konten inti dan kedua CTA tetap berfungsi. Jika terdapat animasi, aktifkan preferensi pengurangan gerakan dan pastikan gerakan nonesensial berhenti. Jika tidak ada animasi, catat bagian pemeriksaan gerakan sebagai tidak berlaku. |
| AC-12 | KNF-05 | Dengan cache kosong, pantau jaringan saat memuat halaman dan mengaktifkan kedua CTA: semua aset berasal dari asal halaman yang sama dan tidak ada permintaan pihak ketiga. Font tetap terbaca dengan font sistem. |
| AC-13 | KNF-06 | Jalankan AC-01 sampai AC-05 pada Chrome dan Firefox stabil serta catat versinya. Periksa konsol dan jaringan pada kedua browser: tidak ada galat aplikasi, aset gagal dimuat, atau perilaku CTA yang berbeda. |

Saat implementasi diuji, catat versi revisi aplikasi, perintah atau langkah pemeriksaan, browser, viewport, serta hasil per ID. Kriteria yang tidak dijalankan harus tetap ditandai belum diuji, bukan lulus.

## 9. Asumsi yang disetujui

Asumsi berikut diajukan pada versi 0.1 dan diterima sebagai dasar implementasi melalui persetujuan pengguna. Perubahan tetap memerlukan peninjauan dampak.

| ID | Asumsi | Dampak jika berubah |
| --- | --- | --- |
| A-01 | CTA mengarahkan pengunjung ke fitur karena belum ada tujuan pendaftaran atau produk nyata. | Tujuan halaman, teks, KF-04, dan AC-04 perlu ditinjau ulang. |
| A-02 | Tiga konsep fitur dan seluruh teks usulan pada bagian 4 sesuai arah produk. | Konten, user stories, dan kriteria konten perlu diselaraskan. |
| A-03 | Gaya visual sederhana, bersih, dan mudah dibaca; belum ada logo, warna merek, ilustrasi, atau aset wajib. | Arahan visual dan pemeriksaan kontras perlu diperbarui jika aset ditetapkan. |
| A-04 | Browser modern, tiga viewport uji, font sistem, dan target CTA 44 × 44 piksel memadai untuk tahap pertama produk. | Matriks kompatibilitas dan kriteria aksesibilitas/responsif dapat bertambah. |
| A-05 | Cakupan satu halaman statis tanpa pengumpulan data cukup; tidak diperlukan menu navigasi, tautan eksternal, atau halaman tambahan. | Penambahan alur atau halaman memerlukan revisi ruang lingkup sebelum implementasi. |

## 10. Hasil klarifikasi

Pengguna menyatakan spesifikasi sudah sesuai dan meminta pelaksanaan. Dasar implementasi untuk pertanyaan yang diajukan adalah:

| Topik | Keputusan |
| --- | --- |
| Tujuan CTA | Dua tautan “Jelajahi fitur” menuju `#fitur`. |
| Konten dan audiens | Tiga fitur, naskah, dan target pengguna pada spesifikasi diterapkan. |
| Identitas visual | Gaya sederhana dengan font sistem; tidak ada aset merek wajib yang diberikan. |
| Teknologi dan publikasi | Tidak ada stack wajib yang disebutkan. HTML/CSS statis dipilih sebagai keputusan implementasi; hosting belum ditentukan. |
| Cakupan pengujian | Tiga viewport dan Chrome/Firefox sesuai KNF-01 dan KNF-06 tetap menjadi target. |

## 11. Tinjauan manusia dan gerbang implementasi

Gerbang implementasi telah dipenuhi oleh persetujuan eksplisit pengguna. Riwayat keputusan:

| Tanggal | Peninjau | Keputusan dan bagian yang terdampak |
| --- | --- | --- |
| 20 Oktober 2026 | Pengguna | “ya sudah sesuai dan lakukan !” — menyetujui spesifikasi dan mengizinkan implementasi. Versi 1.0 mempertahankan KF-01–KF-06, KNF-01–KNF-06, dan AC-01–AC-13. |
| 20 Oktober 2026 | Pelaksana | Memilih HTML/CSS statis tanpa dependensi runtime; hasil pengujian dilaporkan terpisah. |

Tahap dokumentasi sebelumnya menghasilkan `AGENTS.md` dan `docs/spec.md`, lalu berhenti untuk tinjauan manusia. Tahap yang sekarang diizinkan menghasilkan landing page beserta bukti verifikasi. Kelulusan hanya dinyatakan berdasarkan pemeriksaan yang benar-benar dijalankan.
