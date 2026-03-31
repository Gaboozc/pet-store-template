import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { productService } from '../services/productService'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carga inicial
  useEffect(() => {
    productService.getAll()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const addProduct = useCallback(async (data) => {
    const created = await productService.create(data)
    setProducts(prev => [...prev, created])
    return created
  }, [])

  const updateProduct = useCallback(async (id, changes) => {
    const updated = await productService.update(id, changes)
    setProducts(prev => prev.map(p => p.id === id ? updated : p))
    return updated
  }, [])

  const deleteProduct = useCallback(async (id) => {
    await productService.delete(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const resetToDefault = useCallback(async () => {
    const defaults = await productService.reset()
    setProducts(defaults)
  }, [])

  return (
    <InventoryContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefault,
    }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}
