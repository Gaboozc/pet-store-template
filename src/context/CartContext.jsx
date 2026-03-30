import { createContext, useContext, useReducer, useCallback } from 'react'
import { products as initialProducts } from '../data/products'

const CartContext = createContext(null)

const initialState = {
  items: [],
  isOpen: false,
  inventory: initialProducts.reduce((acc, p) => {
    acc[p.id] = p.stock
    return acc
  }, {}),
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'ADD_ITEM': {
      const { product } = action
      const available = state.inventory[product.id] ?? 0
      if (available <= 0) return state
      const existing = state.items.find(i => i.id === product.id)
      const newItems = existing
        ? state.items.map(i =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...product, qty: 1 }]
      return {
        ...state,
        items: newItems,
        inventory: { ...state.inventory, [product.id]: available - 1 },
        isOpen: true,
      }
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(i => i.id === action.id)
      if (!item) return state
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        inventory: {
          ...state.inventory,
          [action.id]: (state.inventory[action.id] ?? 0) + item.qty,
        },
      }
    }

    case 'UPDATE_QTY': {
      const { id, qty } = action
      if (qty <= 0) {
        const item = state.items.find(i => i.id === id)
        return {
          ...state,
          items: state.items.filter(i => i.id !== id),
          inventory: {
            ...state.inventory,
            [id]: (state.inventory[id] ?? 0) + (item?.qty ?? 0),
          },
        }
      }
      const existing = state.items.find(i => i.id === id)
      if (!existing) return state
      const diff = qty - existing.qty
      const available = state.inventory[id] ?? 0
      if (diff > 0 && available < diff) return state
      return {
        ...state,
        items: state.items.map(i => (i.id === id ? { ...i, qty } : i)),
        inventory: { ...state.inventory, [id]: available - diff },
      }
    }

    case 'CLEAR_CART': {
      // Restore all stock
      const restoredInventory = { ...state.inventory }
      state.items.forEach(item => {
        restoredInventory[item.id] = (restoredInventory[item.id] ?? 0) + item.qty
      })
      return { ...state, items: [], isOpen: false, inventory: restoredInventory }
    }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = useCallback((product) => dispatch({ type: 'ADD_ITEM', product }), [])
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', id }), [])
  const updateQty = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)

  const sendWhatsApp = useCallback(() => {
    if (state.items.length === 0) return
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '5491112345678'
    const lines = state.items.map(i =>
      `• ${i.name} x${i.qty} — $${(i.price * i.qty).toLocaleString('es-MX')}`
    )
    const msg = [
      '🐠 *Hola! Quiero hacer el siguiente pedido:*',
      '',
      ...lines,
      '',
      `*Total: $${total.toLocaleString('es-MX')}*`,
      '',
      '¿Pueden confirmarme disponibilidad y forma de pago? ¡Gracias! 🙏',
    ].join('\n')
    const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    clearCart()
  }, [state.items, total, clearCart])

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      inventory: state.inventory,
      total,
      itemCount,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
      openCart,
      sendWhatsApp,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
