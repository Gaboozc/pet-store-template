import { useCart } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { removeItem, updateQty, inventory } = useCart()
  const available = inventory[item.id] ?? 0

  return (
    <div className="flex gap-3 bg-deep-800 rounded-xl p-3 border border-ocean-900/30">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white leading-tight truncate">{item.name}</h4>
        <p className="text-ocean-400 font-bold text-sm mt-0.5">
          ${item.price.toLocaleString('es-MX')}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-7 h-7 rounded-lg bg-ocean-900/50 text-white hover:bg-ocean-700 transition-colors flex items-center justify-center text-sm font-bold"
            >
              −
            </button>
            <span className="text-white font-semibold text-sm w-6 text-center">{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              disabled={available === 0}
              className="w-7 h-7 rounded-lg bg-ocean-900/50 text-white hover:bg-ocean-700 transition-colors flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">
              ${(item.price * item.qty).toLocaleString('es-MX')}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-500 hover:text-red-400 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        {available === 0 && (
          <p className="text-xs text-coral-400 mt-1">Stock máximo alcanzado</p>
        )}
      </div>
    </div>
  )
}
