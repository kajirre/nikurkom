import { allPersonaPijaos } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
    title: 'Personas | Archivo Digital Pijao',
}

export default function PersonasIndex() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Personas', href: '/personas' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Personas</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Integrantes del pueblo Pijao, sus oficios, roles y contribuciones a la memoria y el trabajo territorial.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPersonaPijaos.map((persona) => (
                    <Link
                        key={persona.id}
                        href={persona.url}
                        className="group block p-6 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors"
                    >
                        <h2 className="text-xl font-bold text-stone-900 group-hover:text-black transition-colors mb-2">
                            {persona.nombre_completo}
                        </h2>
                        <div className="text-sm text-stone-500 mb-4">
                            {persona.oficio_principal && persona.oficio_principal.join(', ')}
                        </div>
                        <div className="text-xs text-stone-400 font-medium uppercase tracking-widest">
                            {persona.rol_comunitario && persona.rol_comunitario[0]}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
