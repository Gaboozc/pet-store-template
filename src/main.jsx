import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventoryProvider } from './context/InventoryContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <InventoryProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </InventoryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
