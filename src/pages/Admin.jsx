import { useState, useMemo } from 'react'
import { useInventory } from '../context/InventoryContext'
import { categories } from '../data/products'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
const SESSION_KEY = 'admin_auth'

const careLevels = ['fácil', 'medio', 'difícil']
const badges = ['', 'Nuevo', 'Oferta', 'Stock limitado']
const categoryOptions = categories.filter(c => c.id !== 'todos')

const emptyProduct = {
  name: '',
  category: 'peces',
  price: '',
  stock: '',
  careLevel: 'fácil',
  badge: '',
  image: '',
  description: '',
}

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onLogin()
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl">🔐</span>
          <h1 className="text-2xl font-bold text-white mt-4">Panel Administrativo</h1>
          <p className="text-gray-500 text-sm mt-1">Acceso restringido</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-deep-800 border border-ocean-900/40 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              placeholder="••••••••"
              autoFocus
              className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors"
            />
            {error && <p className="text-red-400 text-xs mt-1.5">Contraseña incorrecta</p>}
          </div>
          <button type="submit" className="w-full btn-primary py-3">
            Ingresar
          </button>
        </form>
        <p className="text-center text-gray-600 text-xs mt-4">
          La contraseña se configura en la variable <code className="text-ocean-500">VITE_ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  )
}

// ─── Modal de producto ────────────────────────────────────────────────────────
function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || emptyProduct)
  const isNew = !product

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      badge: form.badge || null,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-deep-800 border border-ocean-700/40 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-ocean-900/40 sticky top-0 bg-deep-800 z-10">
          <h2 className="text-lg font-bold text-white">{isNew ? '+ Nuevo producto' : 'Editar producto'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-ocean-900/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5">Nombre del producto *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="ej. Betta Macho Premium"
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors" />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Categoría *</label>
              <select required value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ocean-500 transition-colors">
                {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>

            {/* Nivel de cuidado */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nivel de cuidado *</label>
              <select value={form.careLevel} onChange={e => set('careLevel', e.target.value)}
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ocean-500 transition-colors">
                {careLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Precio (MXN) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input required type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl pl-7 pr-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors" />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Stock disponible *</label>
              <input required type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)}
                placeholder="0"
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors" />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Badge</label>
              <select value={form.badge || ''} onChange={e => set('badge', e.target.value)}
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ocean-500 transition-colors">
                {badges.map(b => <option key={b} value={b}>{b || '— Sin badge —'}</option>)}
              </select>
            </div>

            {/* Imagen */}
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5">URL de imagen</label>
              <input type="url" value={form.image} onChange={e => set('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors" />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg opacity-70" />
              )}
            </div>

            {/* Descripción */}
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5">Descripción corta</label>
              <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Descripción que verá el cliente en la tarjeta del producto..."
                className="w-full bg-deep-900 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors resize-none" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-outline py-2.5 text-sm">
              Cancelar
            </button>
            <button type="submit" className="flex-1 btn-primary py-2.5 text-sm">
              {isNew ? 'Agregar producto' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Panel principal ──────────────────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const { products, updateProduct, addProduct, deleteProduct, resetToDefault } = useInventory()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('todos')
  const [editingProduct, setEditingProduct] = useState(null) // null | false | product
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = useMemo(() => products.filter(p => {
    const matchCat = filterCat === 'todos' || p.category === filterCat
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }), [products, filterCat, search])

  // Stats
  const stats = useMemo(() => ({
    total: products.length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 3).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  }), [products])

  const handleSave = async (data) => {
    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, data)
        showToast('Producto actualizado correctamente')
      } else {
        await addProduct(data)
        showToast('Producto agregado al catálogo')
      }
      setEditingProduct(null)
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      showToast('Producto eliminado del catálogo')
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    }
    setConfirmDelete(null)
  }

  const handleReset = async () => {
    try {
      await resetToDefault()
      showToast('Inventario restaurado al estado original')
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error')
    }
    setConfirmReset(false)
  }

  const careLevelColor = {
    'fácil': 'text-aqua-300 bg-aqua-900/30',
    'medio': 'text-yellow-300 bg-yellow-900/30',
    'difícil': 'text-red-300 bg-red-900/30',
  }

  return (
    <div className="min-h-screen bg-deep-950">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in ${
          toast.type === 'error' ? 'bg-red-900 text-red-200' : 'bg-aqua-800 text-aqua-100'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-deep-900 border-b border-ocean-900/40 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🐠</span>
            <div>
              <span className="text-white font-bold text-sm">Panel Admin</span>
              <span className="text-ocean-500 text-xs ml-2">Inventario</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-ocean-400 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver tienda
            </a>
            <button onClick={onLogout}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total productos', value: stats.total, icon: '📦', color: 'text-ocean-400' },
            { label: 'Stock bajo (≤3)', value: stats.lowStock, icon: '⚠️', color: 'text-yellow-400' },
            { label: 'Sin stock', value: stats.outOfStock, icon: '🚫', color: 'text-red-400' },
            { label: 'Valor inventario', value: `$${stats.totalValue.toLocaleString('es-MX')}`, icon: '💰', color: 'text-aqua-400' },
          ].map(s => (
            <div key={s.label} className="bg-deep-800 border border-ocean-900/30 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{s.label}</span>
                <span>{s.icon}</span>
              </div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-deep-800 border border-ocean-900/30 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 transition-colors" />
          </div>

          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="bg-deep-800 border border-ocean-900/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-ocean-500 transition-colors">
            <option value="todos">Todas las categorías</option>
            {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>

          <button onClick={() => setEditingProduct(false)}
            className="flex items-center gap-2 bg-ocean-700 hover:bg-ocean-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo producto
          </button>
        </div>

        {/* Table */}
        <div className="bg-deep-800 border border-ocean-900/30 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ocean-900/40 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">Producto</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Categoría</th>
                  <th className="text-right px-4 py-3 font-medium">Precio</th>
                  <th className="text-center px-4 py-3 font-medium">Stock</th>
                  <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">Nivel</th>
                  <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">Badge</th>
                  <th className="text-center px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-900/20">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">No hay productos con esos filtros</td>
                  </tr>
                )}
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-ocean-900/10 transition-colors group">
                    {/* Nombre + imagen */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image
                          ? <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 opacity-80" />
                          : <div className="w-10 h-10 rounded-lg bg-ocean-900/30 flex items-center justify-center text-lg flex-shrink-0">📦</div>
                        }
                        <span className="text-white font-medium leading-tight line-clamp-2 max-w-[180px]">{p.name}</span>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-gray-400 text-xs">
                        {categoryOptions.find(c => c.id === p.category)?.icon} {categoryOptions.find(c => c.id === p.category)?.label}
                      </span>
                    </td>

                    {/* Precio inline editable */}
                    <td className="px-4 py-3 text-right">
                      <InlineEdit
                        value={p.price}
                        type="number"
                        format={v => `$${Number(v).toLocaleString('es-MX')}`}
                        onSave={v => updateProduct(p.id, { price: Number(v) }).catch(console.error)}
                      />
                    </td>

                    {/* Stock inline editable */}
                    <td className="px-4 py-3 text-center">
                      <InlineEdit
                        value={p.stock}
                        type="number"
                        format={v => (
                          <span className={`font-semibold ${Number(v) === 0 ? 'text-red-400' : Number(v) <= 3 ? 'text-yellow-400' : 'text-aqua-400'}`}>
                            {v}
                          </span>
                        )}
                        onSave={v => updateProduct(p.id, { stock: Number(v) }).catch(console.error)}
                      />
                    </td>

                    {/* Nivel */}
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${careLevelColor[p.careLevel] || ''}`}>
                        {p.careLevel}
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      {p.badge
                        ? <span className="text-xs bg-ocean-800 text-ocean-300 px-2 py-0.5 rounded-full">{p.badge}</span>
                        : <span className="text-gray-600 text-xs">—</span>
                      }
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setEditingProduct(p)}
                          className="p-1.5 text-gray-400 hover:text-ocean-400 transition-colors rounded-lg hover:bg-ocean-900/20"
                          title="Editar">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setConfirmDelete(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-900/20"
                          title="Eliminar">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-ocean-900/20 flex items-center justify-between">
            <span className="text-xs text-gray-500">{filtered.length} producto{filtered.length !== 1 ? 's' : ''} mostrado{filtered.length !== 1 ? 's' : ''}</span>
            <button onClick={() => setConfirmReset(true)}
              className="text-xs text-gray-600 hover:text-red-400 transition-colors">
              Restaurar inventario original
            </button>
          </div>
        </div>
      </main>

      {/* Modal editar/crear */}
      {(editingProduct !== null) && (
        <ProductModal
          product={editingProduct || null}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <ConfirmDialog
          message="¿Eliminar este producto? Esta acción no se puede deshacer."
          confirmLabel="Sí, eliminar"
          confirmClass="bg-red-700 hover:bg-red-600"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Confirm reset */}
      {confirmReset && (
        <ConfirmDialog
          message="¿Restaurar el inventario original? Se perderán todos los cambios que hayas hecho desde el panel."
          confirmLabel="Sí, restaurar"
          confirmClass="bg-red-700 hover:bg-red-600"
          onConfirm={handleReset}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </div>
  )
}

// ─── Edición inline de celda ──────────────────────────────────────────────────
function InlineEdit({ value, type, format, onSave }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)

  const commit = () => {
    onSave(val)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        type={type}
        value={val}
        autoFocus
        onChange={e => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setVal(value); setEditing(false) } }}
        className="w-20 bg-deep-900 border border-ocean-500 rounded px-2 py-0.5 text-sm text-white text-right focus:outline-none"
      />
    )
  }

  return (
    <button onClick={() => { setVal(value); setEditing(true) }}
      className="text-gray-300 hover:text-ocean-400 transition-colors cursor-pointer" title="Clic para editar">
      {typeof format === 'function' ? format(value) : value}
    </button>
  )
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ message, confirmLabel, confirmClass, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-deep-800 border border-ocean-700/40 rounded-2xl p-6 w-full max-w-sm animate-fade-in">
        <p className="text-white text-sm mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-outline py-2 text-sm">Cancelar</button>
          <button onClick={onConfirm} className={`flex-1 text-white font-semibold py-2 rounded-full text-sm transition-colors ${confirmClass}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Export: decides login vs panel ──────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />
  return <AdminPanel onLogout={handleLogout} />
}
