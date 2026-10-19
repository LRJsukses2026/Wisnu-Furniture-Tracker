/*
  KONFIGURASI SUPABASE
  Isi dua baris di bawah dengan data dari:
  Supabase > Project Settings > API
    - Project URL      -> contoh: https://abcdefghijk.supabase.co
    - anon public key  -> kunci panjang berlabel "anon" / "public"

  PENTING: gunakan kunci "anon public". JANGAN pernah memakai "service_role".

  Jika dua baris ini dikosongkan, aplikasi berjalan dalam MODE DEMO
  (data contoh, tersimpan hanya di HP ini).
*/
window.GW_CONFIG = {
  SUPABASE_URL: "https://gtfprsfeoyiupjarlibv.supabase.co",
SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZnByc2Zlb3lpdXBqYXJsaWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3M1YxMTQxMTksImV4cCI6MjA0NzY5MDE1OX0.W8YjdVQ0TMSDYY8QxAwYFVgR0SUhW0hH1qAlvYawp6o"
};