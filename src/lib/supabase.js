/**
 * Supabase client — actualmente DESHABILITADO (modo frontend/localStorage).
 *
 * Para activar Supabase:
 *   1. Instala el SDK:          npm install @supabase/supabase-js
 *   2. Crea el proyecto en      https://supabase.com
 *   3. Agrega las variables en  .env  (ver .env.example)
 *   4. Descomenta el bloque de abajo y elimina el export null.
 *   5. En src/services/productService.js activa SUPABASE_ENABLED = true
 *
 * Schema SQL requerido — ejecutar en el SQL Editor de Supabase:
 * (también disponible en /supabase/schema.sql)
 *
 *   create table products (
 *     id          bigint generated always as identity primary key,
 *     name        text        not null,
 *     category    text        not null,
 *     price       numeric     not null check (price >= 0),
 *     stock       integer     not null check (stock >= 0),
 *     care_level  text        not null,
 *     badge       text,
 *     image       text,
 *     description text,
 *     created_at  timestamptz default now(),
 *     updated_at  timestamptz default now()
 *   );
 *
 *   -- Trigger para actualizar updated_at automáticamente
 *   create or replace function set_updated_at()
 *   returns trigger as $$
 *   begin new.updated_at = now(); return new; end;
 *   $$ language plpgsql;
 *
 *   create trigger products_updated_at
 *   before update on products
 *   for each row execute procedure set_updated_at();
 *
 *   -- Row Level Security (recomendado)
 *   alter table products enable row level security;
 *
 *   -- Lectura pública (catálogo visible sin login)
 *   create policy "public_read" on products
 *     for select using (true);
 *
 *   -- Escritura solo con service_role key (desde el admin)
 *   create policy "service_write" on products
 *     for all using (auth.role() = 'service_role');
 */

// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY
//
// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env')
// }
//
// export const supabase = createClient(supabaseUrl, supabaseKey)

export const supabase = null
