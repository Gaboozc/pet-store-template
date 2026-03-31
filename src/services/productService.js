/**
 * productService — capa de acceso a datos para productos.
 *
 * Expone una interfaz async uniforme. El contexto (InventoryContext) consume
 * únicamente este servicio y no sabe nada del origen real de los datos.
 *
 * Para migrar a Supabase:
 *   1. Sigue los pasos en src/lib/supabase.js
 *   2. Cambia la línea:  const SUPABASE_ENABLED = false  →  true
 *   3. Listo. El contexto y los componentes no cambian.
 *
 * Nota sobre el campo `care_level`:
 *   En localStorage se guarda como careLevel (camelCase).
 *   En Supabase se guarda como care_level (snake_case).
 *   El servicio normaliza la conversión en ambas direcciones.
 */

import { supabase } from '../lib/supabase'
import { products as defaultProducts } from '../data/products'

// ─── Configuración ─────────────────────────────────────────────────────────────
const SUPABASE_ENABLED = false   // ← cambiar a true cuando Supabase esté listo
const STORAGE_KEY = 'admin_products'
// ──────────────────────────────────────────────────────────────────────────────

// Convierte fila de Supabase (snake_case) → objeto de la app (camelCase)
function fromRow(row) {
  return {
    id:          row.id,
    name:        row.name,
    category:    row.category,
    price:       Number(row.price),
    stock:       row.stock,
    careLevel:   row.care_level,
    badge:       row.badge ?? null,
    image:       row.image ?? '',
    description: row.description ?? '',
  }
}

// Convierte objeto de la app → payload para Supabase (snake_case)
function toRow(product) {
  const { careLevel, badge, ...rest } = product
  return {
    ...rest,
    care_level: careLevel,
    badge: badge || null,
  }
}

// ─── Implementación localStorage ──────────────────────────────────────────────
const localService = {
  async getAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch {}
    return defaultProducts
  },

  async create(data) {
    const all = await localService.getAll()
    const newProduct = { ...data, id: Math.max(0, ...all.map(p => p.id)) + 1 }
    await localService._save([...all, newProduct])
    return newProduct
  },

  async update(id, changes) {
    const all = await localService.getAll()
    const updated = all.map(p => p.id === id ? { ...p, ...changes } : p)
    await localService._save(updated)
    return updated.find(p => p.id === id)
  },

  async delete(id) {
    const all = await localService.getAll()
    await localService._save(all.filter(p => p.id !== id))
  },

  async reset() {
    await localService._save(defaultProducts)
    return defaultProducts
  },

  async _save(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  },
}

// ─── Implementación Supabase ───────────────────────────────────────────────────
const supabaseService = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id')
    if (error) throw error
    return data.map(fromRow)
  },

  async create(data) {
    const { id: _id, ...payload } = toRow(data)   // deja que Supabase genere el id
    const { data: row, error } = await supabase
      .from('products')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return fromRow(row)
  },

  async update(id, changes) {
    const { id: _id, ...payload } = toRow({ ...changes, id })
    const { data: row, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return fromRow(row)
  },

  async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async reset() {
    // En producción con Supabase el "reset" no tiene sentido de la misma forma.
    // Puedes reimplementarlo como una llamada a una Edge Function o simplemente
    // deshabilitar el botón en el panel admin cuando SUPABASE_ENABLED = true.
    throw new Error('reset() no está soportado en modo Supabase')
  },
}

// ─── Export: selecciona la implementación activa ──────────────────────────────
export const productService = SUPABASE_ENABLED ? supabaseService : localService
