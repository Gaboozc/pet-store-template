const services = [
  {
    icon: '🔧',
    title: 'Mantenimiento de Acuarios',
    description: 'Servicio mensual o quincenal de limpieza, cambio de agua, control de parámetros y revisión de equipos. Tu acuario siempre impecable.',
    highlight: 'Desde $8.000/mes',
  },
  {
    icon: '🏗️',
    title: 'Instalación y Armado',
    description: 'Montamos tu acuario desde cero: plantación, decoración, ciclado del agua y selección de peces compatibles. Servicio integral.',
    highlight: 'Consulta sin cargo',
  },
  {
    icon: '🌿',
    title: 'Diseño de Acuarios Plantados',
    description: 'Creamos escapes naturales únicos usando técnicas iwagumi, dutch y biotopo. Diseños personalizados para cada espacio.',
    highlight: 'Arte acuático',
  },
  {
    icon: '🩺',
    title: 'Asesoría Veterinaria',
    description: 'Contamos con médico veterinario especializado en peces y animales exóticos para consultas presenciales y telefónicas.',
    highlight: 'Profesional especializado',
  },
  {
    icon: '🚚',
    title: 'Envíos a Todo el País',
    description: 'Enviamos peces vivos con embalaje especializado con oxígeno y temperatura controlada. Plantas y productos por correo estándar.',
    highlight: 'Peces vivos garantizados',
  },
  {
    icon: '📚',
    title: 'Talleres y Cursos',
    description: 'Clases grupales de acuarismo, mantenimiento básico y avanzado, selección de peces y cuidado de plantas acuáticas.',
    highlight: 'Próximo: sábado 10am',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-deep-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Servicios Especializados</h2>
          <p className="section-subtitle">Más que una tienda — somos tu equipo de soporte acuario</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service.title}
              className="group bg-deep-800/60 border border-ocean-900/30 rounded-2xl p-6 hover:border-ocean-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-ocean-900/30 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-ocean-400 text-sm font-semibold">{service.highlight}</span>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '5491112345678'}?text=${encodeURIComponent(`Hola! Me interesa el servicio de ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-ocean-400 transition-colors"
                >
                  Consultar →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
