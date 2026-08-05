-- AgriPulse waitlist table
-- Run this once in the Supabase SQL Editor of your AgriPulse project.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  town text not null,
  email text
);

-- One signup per phone number
create unique index if not exists waitlist_phone_key on public.waitlist (phone);

-- One signup per email address too (when an email is given)
create unique index if not exists waitlist_email_key
  on public.waitlist (lower(email))
  where email is not null and email <> '';

alter table public.waitlist enable row level security;

-- Anyone (anon) may join the waitlist…
create policy "anyone can join waitlist"
  on public.waitlist for insert
  to anon
  with check (true);

-- …but nobody can read it with the anon key (no select policy).
-- View signups in the Supabase dashboard (Table Editor) or with the service key.
