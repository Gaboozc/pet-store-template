import { Link } from 'react-router-dom'

function Bubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${Math.random() * 20 + 8}px`,
            height: `${Math.random() * 20 + 8}px`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 8 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-deep-900/80 to-deep-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 via-transparent to-deep-950/30" />

      <Bubbles />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-ocean-400 text-sm font-semibold uppercase tracking-widest">Especialistas en acuarios</span>
            <div className="flex-1 h-px bg-ocean-400/30" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            El mundo
            <br />
            <span className="gradient-text">acuático</span>
            <br />
            en tu hogar
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Peces exóticos, acuarios de diseño, aves y pequeñas mascotas.
            Todo con asesoramiento experto para que tus compañeros estén perfectos.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/catalogo" className="btn-primary text-base">
              Ver Catálogo
            </Link>
            <a href="#servicios" className="btn-outline text-base">
              Nuestros Servicios
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">
            {[
              { value: '500+', label: 'Especies disponibles' },
              { value: '10+', label: 'Años de experiencia' },
              { value: '2000+', label: 'Clientes felices' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-400 text-xs">Explorar</span>
        <svg className="w-5 h-5 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
