import Link from 'next/link'

export default function Home() {
  const sections = [
    { title: 'Territorio', href: '/territorio', desc: 'Resguardos, comunidades y la base geográfica de la sobreanía.' },
    { title: 'Personas', href: '/personas', desc: 'Liderazgos, oficios y quienes construyen la memoria viva.' },
    { title: 'Procesos', href: '/procesos', desc: 'Trabajo productivo, proyectos y re-existencia comunitaria.' },
    { title: 'Memoria', href: '/memoria', desc: 'Archivo histórico, documentos y trazos del pasado.' }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-3xl mb-16 lg:mb-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 lg:mb-8 leading-tight tracking-tight">
          Archivo Digital del <br className="hidden md:block" /> Pueblo Pijao
        </h1>
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl border-l border-stone-200 pl-6 py-2">
          Plataforma de autoridad para la documentación del territorio, la memoria histórica y los procesos contemporáneos del pueblo Pijao en el Tolima.
        </p>
      </div>

      {/* Navegación por tarjetas: Carrusel en móvil, Grid en desktop */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-4 md:space-x-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible snap-x snap-mandatory hide-scrollbar">
          {sections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-shrink-0 w-[85%] md:w-full snap-center group p-8 bg-white border border-stone-200 hover:border-stone-900 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>

              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-stone-400 group-hover:text-stone-600 transition-colors">
                {item.title}
              </h2>
              <p className="text-stone-800 font-serif italic text-lg leading-snug">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Indicadores visuales discretos para móvil */}
        <div className="flex md:hidden justify-center space-x-2 mt-4">
          {sections.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-stone-200" />
          ))}
        </div>
      </div>
    </div>
  )
}
