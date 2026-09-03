-- Leads captured through the conversational contact flow.
-- Run this in the Supabase SQL editor (or via `supabase db push`) for your project.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_type text not null check (
    project_type in (
      'sitio-web',
      'app-movil',
      'sistema-interno',
      'ia-custom',
      'otro'
    )
  ),
  message text not null,
  contact_channel text not null check (contact_channel in ('email', 'whatsapp')),
  contact_value text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'archived')),
  notified_at timestamptz
);

alter table public.leads enable row level security;

-- No public policies are defined on purpose: only the service-role key
-- (used exclusively from the Next.js server action) can read/write this
-- table. Do not add anon/public insert policies here.
