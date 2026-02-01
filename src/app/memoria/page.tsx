import { allArchivoMemoria } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
    title: 'Memoria | Archivo Digital Pijao',
}

export default function MemoriaIndex() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Memoria', href: '/memoria' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Memoria / Archivo</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Repositorio de documentos, mapas y registros que sustentan la historia y la trayectoria legal del pueblo Pijao.
                </p>
            </header>

            {allArchivoMemoria.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allArchivoMemoria.map((doc) => (
                        <Link
                            key={doc.id}
                            href={doc.url}
                            className="group block p-6 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                                {doc.tipo_archivo} {doc.año && `| ${doc.año}`}
                            </div>
                            <h2 className="text-xl font-bold text-stone-900 group-hover:text-black transition-colors mb-4 leading-snug">
                                {doc.titulo}
                            </h2>
                            <div className="text-sm text-stone-500">
                                Fuente: {doc.fuente_original}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-12 border border-dashed border-stone-200 rounded-sm text-center text-stone-400">
                    Actualmente no hay documentos catalogados en esta sección.
                </div>
            )}
        </div>
    )
}
