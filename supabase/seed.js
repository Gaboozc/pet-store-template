/**
 * seed.js — carga el catálogo inicial en Supabase.
 *
 * Uso:
 *   1. Instala dependencias: npm install @supabase/supabase-js dotenv
 *   2. Asegúrate de tener .env con VITE_SUPABASE_URL y VITE_SUPABASE_SERVICE_KEY
 *   3. Ejecuta: node supabase/seed.js
 *
 * Nota: usa la SERVICE_ROLE key (no la anon key) para saltear RLS.
 * Nunca expongas la service key en el frontend.
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { products } from '../src/data/products.js'

config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY,   // service_role key, no anon key
)

const rows = products.map(({ id: _id, careLevel, badge, ...rest }) => ({
  ...rest,
  care_level: careLevel,
  badge: badge || null,
}))

const { data, error } = await supabase.from('products').insert(rows).select()

if (error) {
  console.error('Error al cargar el seed:', error.message)
  process.exit(1)
}

console.log(`✅ ${data.length} productos cargados en Supabase.`)
