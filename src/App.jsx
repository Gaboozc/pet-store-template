import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import CartDrawer from './components/cart/CartDrawer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Página no encontrada</h1>
        <p className="text-gray-400 mb-8">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn-primary px-8 py-3">Volver al inicio</Link>
      </div>
    </div>
  )
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  if (isAdmin) return <Admin />

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicLayout>
  )
}
