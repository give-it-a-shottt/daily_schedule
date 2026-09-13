-- Accio_Schedule DB schema
-- Supabase SQL Editor에서 이 파일 전체를 그대로 실행하세요.

create table study_sources (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  source_type    text not null check (source_type in ('book', 'lecture')),
  total_units    integer not null check (total_units > 0),
  unit_label     text not null default '페이지',
  start_date     date not null,
  period_days    integer not null check (period_days > 0),
  end_date       date not null,
  created_at     timestamptz not null default now()
);

create table schedule_items (
  id               uuid primary key default gen_random_uuid(),
  date             date not null,
  title            text not null,
  time             time null,
  memo             text null,
  kind             text not null check (kind in ('simple', 'study')),
  study_source_id  uuid null references study_sources(id) on delete cascade,
  unit_from        integer null,
  unit_to          integer null,
  completed        boolean not null default false,
  completed_at     timestamptz null,
  created_at       timestamptz not null default now(),
  constraint schedule_items_kind_consistency check (
    (kind = 'simple' and study_source_id is null and unit_from is null and unit_to is null)
    or
    (kind = 'study' and study_source_id is not null and unit_from is not null and unit_to is not null)
  )
);

create index schedule_items_date_idx on schedule_items (date);
create index schedule_items_study_source_idx on schedule_items (study_source_id);

-- 로그인 없이 프론트엔드에서 anon key로 직접 접근하는 개인용 앱이므로
-- RLS는 켜두되 전체 허용 정책을 둔다. (URL/anon key를 외부에 공유하지 않는 것으로 보호)
alter table study_sources enable row level security;
alter table schedule_items enable row level security;

create policy "public full access" on study_sources for all using (true) with check (true);
create policy "public full access" on schedule_items for all using (true) with check (true);
