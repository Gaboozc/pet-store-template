import { useState } from 'react'

const faqs = [
  {
    category: 'Peces & Acuarios',
    icon: '🐠',
    questions: [
      {
        q: '¿Cuánto tiempo tarda en ciclarse un acuario nuevo?',
        a: 'El ciclo del nitrógeno tarda entre 4 y 6 semanas en un acuario nuevo. Puedes acelerarlo usando bacterias nitrificantes de frasco, sustrato de un acuario maduro o esponjas de filtro usadas. Te asesoramos en todo el proceso.',
      },
      {
        q: '¿Qué peces son mejores para principiantes?',
        a: 'Recomendamos peces robustos y fáciles: Guppies, Platys, Mollies, Danios y Corydoras. Todos toleran variaciones de parámetros y son sociables. Evitá los Discus y Peces Ángel al principio.',
      },
      {
        q: '¿Puedo mezclar peces tropicales con peces de agua fría?',
        a: 'No es recomendable. Los peces tropicales necesitan 24-28°C y los de agua fría viven entre 15-22°C. Mezclarlos compromete la salud de ambos grupos. Elegí uno de los dos tipos para tu acuario.',
      },
    ],
  },
  {
    category: 'Aves',
    icon: '🦜',
    questions: [
      {
        q: '¿Los periquitos pueden vivir solos?',
        a: 'Pueden, pero son aves muy sociables. Un periquito solo necesita mucha interacción humana diaria. Si no vas a poder dedicarle varias horas al día, es mejor tenerlos en pareja para evitar el estrés y la depresión.',
      },
      {
        q: '¿Cómo enseño a hablar a mi loro?',
        a: 'Repetición, paciencia y recompensa. Elige palabras cortas y simples, díselas con tono entusiasta varias veces al día. Los loros aprenden mejor de niños jóvenes y palabras asociadas a momentos específicos (saludos, comida).',
      },
    ],
  },
  {
    category: 'Pequeñas Mascotas',
    icon: '🐰',
    questions: [
      {
        q: '¿Qué espacio necesita un conejo enano?',
        a: 'Mínimo 1m² de jaula pero necesitan varias horas diarias de ejercicio libre en casa. Los conejos son activos y curiosos, necesitan espacio para correr, explorar y hacer ejercicio. Un departamento pequeño está bien si hay supervisión.',
      },
      {
        q: '¿Los hámsters son nocturnos? ¿Me van a despertar?',
        a: 'Sí, los hámsters son crepusculares/nocturnos y son activos de noche. Una rueda de calidad silenciosa resuelve el problema del ruido. No pongas la jaula en el dormitorio si eres sensible al sonido.',
      },
    ],
  },
  {
    category: 'Reptiles',
    icon: '🦎',
    questions: [
      {
        q: '¿Qué reptil me recomiendan para empezar?',
        a: 'El Gecko Leopardo es ideal para principiantes: dócil, resistente, no necesita lámpara UVB y come cada 2-3 días. El segundo mejor es la Serpiente del Maíz: come ratones congelados una vez por semana y su manejo es muy sencillo.',
      },
      {
        q: '¿Los reptiles necesitan luz UVB?',
        a: 'Depende de la especie. Los reptiles diurnos como el Dragón Barbudo y las tortugas necesitan UVB obligatoriamente para sintetizar vitamina D3. Los nocturnos como el Gecko Leopardo y las serpientes no la requieren, aunque un ciclo de luz/oscuridad sigue siendo importante.',
      },
      {
        q: '¿Las serpientes son peligrosas como mascotas?',
        a: 'Las especies que vendemos (Corn Snake y Ball Python) son completamente no venenosas y de temperamento tranquilo. Con un manejo regular desde jóvenes se vuelven muy dóciles. No representan ningún peligro para adultos ni niños mayores supervisados.',
      },
    ],
  },
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null)

  return (
    <section className="py-20 bg-deep-800/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <p className="section-subtitle">Respondemos las dudas más comunes de nuestros clientes</p>
        </div>

        <div className="space-y-8">
          {faqs.map(section => (
            <div key={section.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-ocean-400 font-bold text-lg">{section.category}</h3>
              </div>
              <div className="space-y-3">
                {section.questions.map((faq, i) => {
                  const key = `${section.category}-${i}`
                  const isOpen = openItem === key
                  return (
                    <div
                      key={i}
                      className="bg-deep-800/60 border border-ocean-900/30 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-ocean-900/20 transition-colors"
                      >
                        <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-5 h-5 text-ocean-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed animate-fade-in border-t border-ocean-900/20 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
