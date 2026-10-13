-- Milestone 0: prove the database connection works.
-- Run this in the Supabase SQL editor (Dashboard → SQL).

create table if not exists public.health (
  id integer primary key,
  status text not null,
  checked_at timestamptz not null default now()
);

insert into public.health (id, status)
values (1, 'ok')
on conflict (id) do nothing;

alter table public.health enable row level security;
