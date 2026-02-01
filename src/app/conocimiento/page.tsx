import { allSaberPropios } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
    title: 'Conocimiento | Archivo Digital Pijao',
}

export default function ConocimientoIndex() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Conocimiento', href: '/conocimiento' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Conocimiento y Saberes</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Saberes propios, técnicas ancestrales, sistemas de pensamiento y pedagogía comunitaria del pueblo Pijao.
                </p>
            </header>

            {allSaberPropios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allSaberPropios.map((saber) => (
                        <Link
                            key={saber.id}
                            href={saber.url}
                            className="group block p-8 border border-stone-200 rounded-sm hover:border-stone-900 transition-all bg-white"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">
                                {saber.categoria}
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-black transition-colors mb-4 leading-tight">
                                {saber.titulo}
                            </h2>
                            <div className="text-sm text-stone-500 italic">
                                {saber.tipos_de_conocimiento.join(' • ')}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-12 border border-dashed border-stone-200 rounded-sm text-center text-stone-400">
                    Actualmente no hay saberes sistematizados en esta sección.
                </div>
            )}
        </div>
    )
}
