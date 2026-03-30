const galleryItems = [
  { image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', title: 'Biotopo Amazónico 300L', desc: 'Acuario plantado estilo iwagumi' },
  { image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600&q=80', title: 'Cardumen de Neones', desc: 'Acuario comunitario 150L' },
  { image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&q=80', title: 'Acuario de Discos', desc: 'Especialidad de la casa — discos Heckel' },
  { image: 'https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?w=600&q=80', title: 'Mini Acuario Plantado', desc: 'Nano tank 30L — ideal para escritorio' },
  { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80', title: 'Acuario Marino', desc: 'Corales y peces de arrecife — 200L' },
  { image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&q=80', title: 'Betta Showcase', desc: 'Display individual con plantas naturales' },
]

export default function Gallery() {
  return (
    <section id="galeria" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Galería de Inspiración</h2>
          <p className="section-subtitle">Acuarios que hemos montado y mantenemos para nuestros clientes</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? 'md:col-span-1 md:row-span-2' : ''
              }`}
              style={{ minHeight: i === 0 ? '380px' : '180px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ height: i === 0 ? '380px' : '180px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-ocean-300 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '5491112345678'}?text=${encodeURIComponent('Hola! Me gustaría cotizar un acuario similar a los de la galería')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Quiero un acuario así</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
