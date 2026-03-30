import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import FilterBar from '../components/catalog/FilterBar'
import ProductGrid from '../components/catalog/ProductGrid'

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('categoria') || 'todos',
    careLevel: 'todos',
    minPrice: '',
    maxPrice: '',
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat) setFilters(prev => ({ ...prev, category: cat }))
  }, [searchParams])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.category !== 'todos' && p.category !== filters.category) return false
      if (filters.careLevel !== 'todos' && p.careLevel !== filters.careLevel) return false
      if (filters.minPrice !== '' && p.price < filters.minPrice) return false
      if (filters.maxPrice !== '' && p.price > filters.maxPrice) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [filters, search])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title mb-2">Catálogo completo</h1>
          <p className="text-gray-400">{filtered.length} productos encontrados</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-deep-800/60 border border-ocean-900/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <FilterBar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  )
}
