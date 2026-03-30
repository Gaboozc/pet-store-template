import { useCart } from '../../context/CartContext'

const careLevelConfig = {
  'fácil': { color: 'bg-aqua-800/50 text-aqua-300 border-aqua-700/30', icon: '●' },
  'medio': { color: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/30', icon: '●●' },
  'difícil': { color: 'bg-red-900/50 text-red-300 border-red-700/30', icon: '●●●' },
}

const badgeConfig = {
  'Nuevo': 'bg-ocean-600 text-white',
  'Oferta': 'bg-coral-500 text-white',
  'Stock limitado': 'bg-yellow-600 text-white',
}

export default function ProductCard({ product }) {
  const { addItem, inventory } = useCart()
  const available = inventory[product.id] ?? 0
  const care = careLevelConfig[product.careLevel] || careLevelConfig['fácil']

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-transparent to-transparent" />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${badgeConfig[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {available === 0 && (
          <div className="absolute inset-0 bg-deep-900/80 flex items-center justify-center">
            <span className="text-white font-bold bg-deep-800/90 px-4 py-2 rounded-full text-sm">Sin stock</span>
          </div>
        )}
        {available > 0 && available <= 3 && (
          <span className="absolute bottom-3 right-3 text-xs bg-yellow-600/90 text-white px-2 py-0.5 rounded-full font-medium">
            ¡Últimas {available}!
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 flex-1">{product.name}</h3>
          <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${care.color}`}>
            {product.careLevel}
          </span>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold gradient-text">
              ${product.price.toLocaleString('es-MX')}
            </span>
            <p className="text-xs text-gray-500">
              {available > 0 ? `${available} disponibles` : 'Sin stock'}
            </p>
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={available === 0}
            className="flex items-center gap-1.5 bg-ocean-700 hover:bg-ocean-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-ocean-900/50 hover:-translate-y-0.5 disabled:transform-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
