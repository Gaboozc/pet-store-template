import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, itemCount, sendWhatsApp } = useCart()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-deep-900 border-l border-ocean-900/50 z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ocean-900/50">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-lg font-bold text-white">Tu Carrito</h2>
            {itemCount > 0 && (
              <span className="bg-ocean-700 text-ocean-200 text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-ocean-900/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-6xl">🛒</span>
              <p className="text-gray-400">Tu carrito está vacío</p>
              <button onClick={closeCart} className="btn-secondary text-sm">
                Explorar productos
              </button>
            </div>
          ) : (
            items.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-ocean-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Total del pedido</span>
              <span className="text-2xl font-bold gradient-text">
                ${total.toLocaleString('es-MX')}
              </span>
            </div>
            <button
              onClick={sendWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-900/40 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <p className="text-xs text-gray-500 text-center">
              Al enviar, se abrirá WhatsApp con tu pedido prellenado. El pago se coordina directamente con la tienda.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
