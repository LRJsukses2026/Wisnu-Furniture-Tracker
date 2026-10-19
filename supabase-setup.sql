-- =====================================================================
--  GUDANG WISNU - pengaturan database Supabase
--  Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi
--  file ini > Run. Aman dijalankan ulang.
-- =====================================================================

-- 1) Tabel data bersama.
--    Setiap order, kelompok barang, foto progres, karyawan, absen harian,
--    stok, mutasi, hasil kerja, dan inventaris adalah SATU baris sendiri,
--    sehingga dua HP yang mengubah data berbeda tidak saling menimpa.
create table if not exists public.records (
  id         text primary key,
  kind       text not null,
  data       jsonb not null default '{}'::jsonb,
  deleted    boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

create index if not exists records_updated_idx on public.records (updated_at);
create index if not exists records_kind_idx    on public.records (kind);

-- 2) Waktu ubah dan pengubah diisi server (tidak bisa dipalsukan dari HP).
create or replace function public.records_touch()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists records_touch on public.records;
create trigger records_touch
  before insert or update on public.records
  for each row execute function public.records_touch();

-- 3) Keamanan: hanya pengguna yang sudah login yang boleh membaca dan menulis.
--    Tidak ada izin hapus permanen: penghapusan memakai kolom "deleted".
alter table public.records enable row level security;

drop policy if exists "tim baca"   on public.records;
drop policy if exists "tim tambah" on public.records;
drop policy if exists "tim ubah"   on public.records;

create policy "tim baca"   on public.records for select to authenticated using (true);
create policy "tim tambah" on public.records for insert to authenticated with check (true);
create policy "tim ubah"   on public.records for update to authenticated using (true) with check (true);

-- 4) Tempat foto (logo, foto karyawan, foto barang, foto progres).
--    Bucket dibuat publik agar foto bisa tampil langsung; nama file acak
--    sehingga tidak bisa ditebak, dan hanya pengguna login yang bisa unggah.
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

drop policy if exists "foto unggah" on storage.objects;
drop policy if exists "foto hapus"  on storage.objects;

create policy "foto unggah" on storage.objects
  for insert to authenticated with check (bucket_id = 'photos');

create policy "foto hapus" on storage.objects
  for delete to authenticated using (bucket_id = 'photos');
