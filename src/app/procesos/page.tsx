import { allProyectoTrabajos } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
    title: 'Procesos | Archivo Digital Pijao',
}

export default function ProcesosIndex() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Procesos', href: '/procesos' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Procesos</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Iniciativas, trabajos colectivos y proyectos productivos que impulsan la soberanía y el desarrollo comunitario.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProyectoTrabajos.map((proyecto) => (
                    <Link
                        key={proyecto.id}
                        href={proyecto.url}
                        className="group block p-6 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-bold text-stone-900 group-hover:text-black transition-colors">
                                {proyecto.titulo}
                            </h2>
                        </div>
                        <div className="text-sm text-stone-500 mb-4">
                            Categoría: {proyecto.categoria}
                        </div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest inline-block px-2 py-1 rounded-full ${proyecto.estado_actual === 'Activo' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-600'
                            }`}>
                            {proyecto.estado_actual}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
