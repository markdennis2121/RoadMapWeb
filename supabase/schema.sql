create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  item_type text not null check (item_type in ('topic', 'project')),
  category_id text,
  category_name text,
  title text not null,
  status text not null default 'Not Started' check (status in ('Not Started', 'Currently Learning', 'Completed')),
  completed_date date,
  created_at timestamptz not null default now(),
  unique (user_id, item_key)
);

alter table public.roadmap_items enable row level security;

drop policy if exists "Users can view their own roadmap" on public.roadmap_items;
create policy "Users can view their own roadmap" on public.roadmap_items for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can insert their own roadmap" on public.roadmap_items;
create policy "Users can insert their own roadmap" on public.roadmap_items for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update their own roadmap" on public.roadmap_items;
create policy "Users can update their own roadmap" on public.roadmap_items for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own roadmap" on public.roadmap_items;
create policy "Users can delete their own roadmap" on public.roadmap_items for delete to authenticated using (auth.uid() = user_id);
