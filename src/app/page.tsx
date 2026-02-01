import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="max-w-3xl">
        <h1 className="text-6xl font-serif font-bold text-stone-900 mb-8 leading-tight">
          Archivo Digital del <br /> Pueblo Pijao
        </h1>
        <p className="text-xl text-stone-600 mb-12 leading-relaxed">
          Plataforma de autoridad para la documentación del territorio, la memoria histórica y los procesos contemporáneos del pueblo Pijao en el sur del Tolima.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Territorio', href: '/territorio', desc: 'Resguardos, comunidades y la base geográfica de la soberanía.' },
            { title: 'Personas', href: '/personas', desc: 'Liderazgos, oficios y quienes construyen la memoria viva.' },
            { title: 'Procesos', href: '/procesos', desc: 'Trabajo productivo, proyectos y re-existencia comunitaria.' },
            { title: 'Memoria', href: '/memoria', desc: 'Archivo histórico, documentos y trazos del pasado.' }
          ].map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-8 border border-stone-200 hover:border-stone-900 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-100"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-stone-400 group-hover:text-stone-900 transition-colors uppercase">
                {item.title}
              </h2>
              <p className="text-stone-600 font-serif italic text-lg leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
