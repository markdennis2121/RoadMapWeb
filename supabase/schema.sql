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

create index if not exists roadmap_items_user_id_created_at_idx on public.roadmap_items(user_id, created_at);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  lesson_complete boolean not null default false,
  exercise_complete boolean not null default false,
  exam_complete boolean not null default false,
  exam_score integer not null default 0 check (exam_score between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, item_key)
);

alter table public.learning_progress enable row level security;

create index if not exists learning_progress_user_id_idx on public.learning_progress(user_id);

drop policy if exists "Users can view their own learning progress" on public.learning_progress;
create policy "Users can view their own learning progress" on public.learning_progress for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can insert their own learning progress" on public.learning_progress;
create policy "Users can insert their own learning progress" on public.learning_progress for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update their own learning progress" on public.learning_progress;
create policy "Users can update their own learning progress" on public.learning_progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own learning progress" on public.learning_progress;
create policy "Users can delete their own learning progress" on public.learning_progress for delete to authenticated using (auth.uid() = user_id);

alter table public.roadmap_items enable row level security;

drop policy if exists "Users can view their own roadmap" on public.roadmap_items;
create policy "Users can view their own roadmap" on public.roadmap_items for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can insert their own roadmap" on public.roadmap_items;
create policy "Users can insert their own roadmap" on public.roadmap_items for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update their own roadmap" on public.roadmap_items;
create policy "Users can update their own roadmap" on public.roadmap_items for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own roadmap" on public.roadmap_items;
create policy "Users can delete their own roadmap" on public.roadmap_items for delete to authenticated using (auth.uid() = user_id);
