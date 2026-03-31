import Hero from '../components/sections/Hero'
import Categories from '../components/sections/Categories'
import Services from '../components/sections/Services'
import Gallery from '../components/sections/Gallery'
import FAQ from '../components/sections/FAQ'
import { useInventory } from '../context/InventoryContext'
import ProductCard from '../components/catalog/ProductCard'
import { Link } from 'react-router-dom'

export default function Home() {
  const { products } = useInventory()
  const featured = products.filter(p => p.badge === 'Nuevo').slice(0, 3)

  return (
    <>
      <Hero />
      <Categories />

      {/* Featured products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Novedades</h2>
            <p className="section-subtitle">Productos recién llegados a la tienda</p>
          </div>
          <Link to="/catalogo" className="text-ocean-400 hover:text-ocean-300 text-sm font-medium transition-colors flex items-center gap-1">
            Ver todo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <Services />
      <Gallery />
      <FAQ />

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-ocean-900 to-deep-800 rounded-3xl p-10 md:p-16 text-center border border-ocean-700/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=40')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="relative">
            <span className="text-5xl mb-4 block">🐠</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Necesitás asesoramiento personalizado?
            </h2>
            <p className="text-ocean-300 mb-8 text-lg">
              Chateá con nuestros expertos por WhatsApp. Te ayudamos a elegir los peces correctos, armar tu acuario o resolver cualquier duda.
            </p>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '5491112345678'}?text=${encodeURIComponent('Hola! Necesito asesoramiento para mi acuario 🐠')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
