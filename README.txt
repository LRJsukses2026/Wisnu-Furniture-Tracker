GUDANG WISNU - PANDUAN PASANG (SUPABASE, BANYAK HP)
====================================================

ISI FOLDER
- index.html           aplikasi utama
- config.js            TEMPAT MENGISI alamat proyek dan kunci Supabase (wajib diisi)
- supabase-setup.sql   skrip database (tempel sekali di Supabase)
- manifest.webmanifest, sw.js, icons/   agar bisa dipasang di layar utama dan jalan offline

LANGKAH 1 - SIAPKAN SUPABASE (sekali saja)
1. Masuk supabase.com > buka proyek Anda (atau buat proyek baru).
2. Menu "SQL Editor" > New query > tempel seluruh isi supabase-setup.sql > Run.
   Ini membuat tabel data, aturan keamanan, dan tempat foto.
3. Menu "Authentication" > "Users" > "Add user" > "Create new user".
   Isi email dan kata sandi, CENTANG "Auto Confirm User". Buat satu akun per orang
   atau per HP yang akan memakai aplikasi.
4. Authentication > Sign In / Providers (atau Settings) > matikan
   "Allow new users to sign up" agar orang luar tidak bisa mendaftar sendiri.
5. Project Settings > API: salin "Project URL" dan kunci "anon public".

LANGKAH 2 - ISI config.js
Buka config.js dengan Notepad, isi:
  SUPABASE_URL: "https://xxxx.supabase.co"
  SUPABASE_ANON_KEY: "kunci anon public"
Kunci "anon public" memang aman ada di aplikasi. JANGAN pakai kunci "service_role".
Jika config.js dibiarkan kosong, aplikasi berjalan sebagai MODE DEMO (data contoh, hanya di satu HP).

LANGKAH 3 - UPLOAD KE INTERNET (HTTPS)
Pilih salah satu:
- Netlify (termudah): buka app.netlify.com/drop, seret isi folder ini.
- GitHub Pages atau Vercel/Cloudflare Pages: upload semua file, termasuk folder icons.
Hasilnya sebuah alamat web. Bagikan alamat itu ke semua HP.

LANGKAH 4 - PASANG DI HP
- Android (Chrome): buka alamat > tombol "Pasang aplikasi" di Beranda, atau menu titik tiga > Pasang aplikasi.
- iPhone (Safari): Bagikan > Tambah ke Layar Utama.
Masuk dengan email dan kata sandi dari Langkah 1.

CARA KERJA DATA
- Semua HP melihat data yang sama. Perubahan saling muncul dalam sekitar 8 detik.
- Order, kelompok barang, foto progres, karyawan, absen harian, stok, catatan barang
  masuk/keluar, hasil kerja, dan inventaris disimpan sebagai catatan terpisah,
  jadi dua orang yang mengubah hal berbeda secara bersamaan tidak saling menimpa.
- Stok dihitung dari stok awal ditambah semua catatan masuk dan dikurangi catatan keluar,
  sehingga dua HP yang mencatat barang bersamaan tetap menghasilkan angka yang benar.
- Jika dua orang mengubah catatan YANG SAMA di saat yang sama, yang tersimpan terakhir yang dipakai.
- Tanpa internet aplikasi tetap bisa dipakai. Perubahan dikirim otomatis saat online
  (lihat penanda status di Beranda). Foto baru diunggah saat online.
- Hapus dan ubah: order, catatan barang, dan hasil kerja yang dihapus bisa dibatalkan
  lewat tombol "Urungkan" selama 8 detik.

LAPORAN PDF
- Per order: buka order > geser "Geser untuk unduh PDF".
- Per karyawan: menu Absen atau Output > "Laporan karyawan (PDF)". Pilih satu hari, minggu ini,
  bulan ini, atau rentang tanggal, untuk semua karyawan atau satu orang. Isinya kehadiran
  (hadir, setengah hari, izin, sakit, alpa, lembur) dan hasil kerja tiap karyawan.

CATATAN PENTING
- Foto disimpan di Supabase Storage (bucket "photos", publik dengan nama acak). Siapa pun yang
  memegang alamat foto bisa melihatnya, tetapi hanya pengguna login yang bisa mengunggah.
- Menghapus foto atau order di aplikasi tidak menghapus berkas fotonya dari Storage
  (hanya menyembunyikan). Bersihkan manual di dashboard Supabase bila perlu.
- Jangan hapus data situs di browser jika masih ada perubahan yang belum terkirim.
- Ikon di layar HP adalah file di folder icons. Ganti dengan logo Anda (persegi) sebelum upload
  bila ingin ikon sendiri. Logo di dalam aplikasi diunggah lewat Beranda.

MEMPERBARUI VERSI
Setelah mengganti file di hosting, ubah angka versi di sw.js (baris "var CACHE = 'gudang-wisnu-v4'",
misalnya jadi v5) agar HP mengambil versi baru.

MENGUJI SEBELUM DIPAKAI
Buka aplikasi di dua HP (atau satu HP dan satu komputer) dengan akun berbeda, tambah satu karyawan
di HP pertama, dan pastikan muncul di HP kedua dalam sekitar 10 detik.
