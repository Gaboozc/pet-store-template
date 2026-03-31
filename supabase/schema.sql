-- ============================================================
--  Schema para [NOMBRE DE LA TIENDA] — Supabase
--  Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Tabla principal de productos
create table if not exists products (
  id          bigint generated always as identity primary key,
  name        text        not null,
  category    text        not null,
  price       numeric     not null check (price >= 0),
  stock       integer     not null default 0 check (stock >= 0),
  care_level  text        not null check (care_level in ('fácil', 'medio', 'difícil')),
  badge       text        check (badge in ('Nuevo', 'Oferta', 'Stock limitado')),
  image       text,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger: updated_at se actualiza automáticamente en cada UPDATE
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
before update on products
for each row execute procedure set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table products enable row level security;

-- Lectura pública: el catálogo es visible sin autenticación
create policy "public_read" on products
  for select
  using (true);

-- Escritura solo con service_role key (usada desde el panel admin en un
-- backend seguro). Si el admin opera directo desde el browser (sin backend),
-- usar autenticación Supabase Auth y reemplazar esta policy.
create policy "service_write" on products
  for all
  using (auth.role() = 'service_role');

-- ─── Índices ──────────────────────────────────────────────────────────────────
create index if not exists products_category_idx on products (category);
create index if not exists products_stock_idx    on products (stock);

-- ─── Datos iniciales (seed) ───────────────────────────────────────────────────
-- Para cargar el catálogo inicial, ejecutar desde el proyecto:
--   node supabase/seed.js
-- O pegar los inserts manualmente aquí.
