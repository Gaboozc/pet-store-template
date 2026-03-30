import { useState } from 'react'

export default function Contact() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '5491112345678'
  const storeName = import.meta.env.VITE_STORE_NAME || '[NOMBRE DE LA TIENDA]'

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hola! Soy ${form.name}.\n\nAsunto: ${form.subject}\n\n${form.message}\n\nEmail de contacto: ${form.email}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="section-title mb-3">Contactanos</h1>
          <p className="section-subtitle">Estamos para ayudarte con cualquier consulta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Información de la tienda</h2>
              <div className="space-y-4">
                {[
                  { icon: '📍', label: 'Dirección', value: 'Av. Principal 1234, Local 5\nCiudad, Provincia' },
                  { icon: '🕐', label: 'Horarios', value: 'Lun–Vie: 10:00 a 19:00\nSáb: 10:00 a 14:00\nDom: Cerrado' },
                  { icon: '📱', label: 'WhatsApp', value: `+${number}` },
                  { icon: '📧', label: 'Email', value: 'info@[nombredelatienda].com' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4 p-4 bg-deep-800/40 rounded-xl border border-ocean-900/20">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-ocean-400 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-deep-800/40 border border-ocean-900/20 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-gray-500 text-sm">Mapa de ubicación</p>
                <p className="text-gray-600 text-xs mt-1">Integrar Google Maps aquí</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Envianos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'name', label: 'Tu nombre', type: 'text', placeholder: 'Juan García' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'juan@email.com' },
                { id: 'subject', label: 'Asunto', type: 'text', placeholder: 'Consulta sobre acuarios' },
              ].map(field => (
                <div key={field.id}>
                  <label className="block text-sm text-gray-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id]}
                    onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                    className="w-full bg-deep-800/60 border border-ocean-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Mensaje</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Contanos en qué podemos ayudarte..."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-deep-800/60 border border-ocean-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-ocean-500 transition-colors resize-none"
                />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
