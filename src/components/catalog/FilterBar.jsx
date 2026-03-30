import { categories, careLevels } from '../../data/products'

export default function FilterBar({ filters, setFilters }) {
  const handlePriceChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value === '' ? '' : Number(value) }))
  }

  return (
    <div className="bg-deep-800/60 backdrop-blur border border-ocean-900/30 rounded-2xl p-5 space-y-5">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-ocean-400 uppercase tracking-wider mb-3">Categoría</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.category === cat.id
                  ? 'bg-ocean-600 text-white shadow-lg shadow-ocean-900/50'
                  : 'bg-deep-900/60 text-gray-400 hover:text-white hover:bg-ocean-900/50 border border-ocean-900/30'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Care level */}
      <div>
        <h3 className="text-sm font-semibold text-ocean-400 uppercase tracking-wider mb-3">Nivel de cuidado</h3>
        <div className="flex flex-wrap gap-2">
          {careLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setFilters(prev => ({ ...prev, careLevel: level.id }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.careLevel === level.id
                  ? 'bg-aqua-700 text-white'
                  : 'bg-deep-900/60 text-gray-400 hover:text-white hover:bg-ocean-900/50 border border-ocean-900/30'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-semibold text-ocean-400 uppercase tracking-wider mb-3">Rango de precio</h3>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={e => handlePriceChange('minPrice', e.target.value)}
            className="flex-1 bg-deep-900/60 border border-ocean-900/30 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors"
          />
          <span className="text-gray-500">—</span>
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={e => handlePriceChange('maxPrice', e.target.value)}
            className="flex-1 bg-deep-900/60 border border-ocean-900/30 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors"
          />
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => setFilters({ category: 'todos', careLevel: 'todos', minPrice: '', maxPrice: '' })}
        className="w-full text-sm text-gray-500 hover:text-ocean-400 transition-colors py-1"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
