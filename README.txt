GUDANG WISNU - PANDUAN PASANG DI HP
====================================

ISI FOLDER
- index.html            : aplikasi utama
- manifest.webmanifest  : data agar bisa dipasang di layar utama
- sw.js                 : agar aplikasi cepat dibuka dan tetap jalan tanpa internet
- icons/                : ikon aplikasi

PENTING
Aplikasi harus dibuka lewat alamat web HTTPS (bukan file yang dibuka langsung dari
penyimpanan HP), supaya tombol "Pasang aplikasi" muncul. Upload seluruh isi folder
ini ke hosting statis gratis. Pilih salah satu:

CARA 1 - NETLIFY (paling mudah)
1. Buka app.netlify.com/drop
2. Seret folder ini (seluruh isinya) ke halaman tersebut
3. Anda mendapat alamat seperti https://nama-acak.netlify.app
4. Buka alamat itu di HP

CARA 2 - GITHUB PAGES
1. Buat repository baru, upload semua file (termasuk folder icons)
2. Settings > Pages > pilih branch main > Save
3. Buka alamat https://namaakun.github.io/namarepo

CARA 3 - VERCEL / CLOUDFLARE PAGES
Upload folder ini sebagai proyek statis (tanpa perintah build).

PASANG DI LAYAR UTAMA
- Android (Chrome): buka alamatnya, ketuk tombol "Pasang aplikasi" di Beranda,
  atau menu titik tiga > Pasang aplikasi.
- iPhone (Safari): ketuk tombol Bagikan > Tambah ke Layar Utama.
Setelah terpasang, aplikasi terbuka layar penuh seperti aplikasi biasa.

DATA
- Data tersimpan di HP yang dipakai (penyimpanan browser). Data di HP lain tidak ikut.
- Untuk dipakai bersama banyak orang di banyak HP, diperlukan database online
  (misalnya Supabase atau Firebase). Ini bisa ditambahkan di tahap berikutnya.
- Jangan hapus data browser/situs jika tidak ingin data hilang.
- Foto besar memakan memori. Foto otomatis dikecilkan saat diunggah.

LOGO DAN IKON
- Logo yang diunggah di Beranda tampil di dalam aplikasi dan di laporan PDF.
- Ikon di layar utama HP adalah file di folder icons. Ganti icon-192.png,
  icon-512.png, icon-maskable-512.png, dan apple-touch-icon.png dengan logo Anda
  (ukuran persegi) sebelum diupload jika ingin ikon sendiri.

MEMPERBARUI VERSI
Jika Anda mengganti file index.html di hosting, ubah angka versi pada baris
"var CACHE = 'gudang-wisnu-v2'" di sw.js (misalnya jadi v3) agar HP mengambil versi baru.
