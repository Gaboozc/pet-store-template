import { Link } from 'react-router-dom'

const cats = [
  {
    id: 'peces',
    label: 'Peces & Acuarios',
    icon: '🐠',
    description: 'Peces tropicales, de agua fría, equipos de filtración, iluminación y todo para montar tu acuario ideal.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    featured: true,
    count: '120+ productos',
  },
  {
    id: 'aves',
    label: 'Aves',
    icon: '🦜',
    description: 'Canarios, periquitos, agapornies y ninfas. Jaulas premium y alimentos especializados.',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80',
    featured: false,
    count: '45+ productos',
  },
  {
    id: 'reptiles',
    label: 'Reptiles',
    icon: '🦎',
    description: 'Geckos leopardo, dragones barbudos, serpientes del maíz y tortugas. Terarios y equipo especializado.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    featured: false,
    count: '30+ productos',
  },
  {
    id: 'pequeñas-mascotas',
    label: 'Pequeñas Mascotas',
    icon: '🐰',
    description: 'Hámsters, conejos, cobayas y chinchillas. Todo para que vivan felices y saludables.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    featured: false,
    count: '60+ productos',
  },
]

export default function Categories() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="section-title">Encuentra tu mascota ideal</h2>
        <p className="section-subtitle">Contamos con una selección curada de los mejores ejemplares y equipos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cats.map(cat => (
          <Link
            key={cat.id}
            to={`/catalogo?categoria=${cat.id}`}
            className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
              cat.featured
                ? 'md:col-span-2 min-h-[380px] border-ocean-600/40 hover:border-ocean-400/60 hover:shadow-ocean-900/50'
                : 'min-h-[260px] border-ocean-900/30 hover:border-ocean-700/40'
            }`}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              cat.featured
                ? 'from-deep-950/95 via-deep-950/60 to-transparent'
                : 'from-deep-950/90 via-deep-950/50 to-transparent'
            }`} />

            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <span className="text-4xl mb-3 drop-shadow-lg">{cat.icon}</span>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{cat.label}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-ocean-400 text-xs font-medium">{cat.count}</span>
                <span className="flex items-center gap-1 text-ocean-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Ver todo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              {cat.featured && (
                <span className="absolute top-4 right-4 bg-ocean-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ⭐ Especialidad
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
