// Konfigurasi Koneksi Supabase Gudang Wisnu
const SUPABASE_URL = "https://gtfprsfeoyiupjarlibv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZnByc2Zlb3lpdXBqYXJsaWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNzE0OTAsImV4cCI6MjEwNzk0NzQ5MH0.h6kI7XkqXZYgbxgtD8AJ6pXrNSm6WzXJ6OWHtw8c88Q";

// Inisialisasi Supabase Client
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;