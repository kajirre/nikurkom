import { allArchivoMemoria, allTerritorioPijaos, allPersonaPijaos } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/Mdx'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const generateStaticParams = async () => allArchivoMemoria.map((p: any) => ({ slug: p._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const doc = allArchivoMemoria.find((p: any) => p._raw.flattenedPath.split('/').pop() === slug)
    if (!doc) return {}

    return {
        title: doc.titulo,
        description: `Documento histórico/memoria: ${doc.titulo}. Fuente: ${doc.fuente_original}. Año: ${doc.año || 'Sin fecha'}.`,
        openGraph: {
            title: `${doc.titulo} | Archivo de Memoria Pijao`,
            description: `Registro documental del Archivo Digital Pijao: ${doc.titulo}.`,
        }
    }
}

export default async function MemoriaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const doc = allArchivoMemoria.find((p: any) => p._raw.flattenedPath.split('/').pop() === slug)

    if (!doc) notFound()

    const territorio = doc.territorio_relacion ? allTerritorioPijaos.find((t) => t.id === doc.territorio_relacion) : null
    const persona = doc.persona_relacion ? allPersonaPijaos.find((p) => p.id === doc.persona_relacion) : null

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <Breadcrumbs items={[
                { name: 'Memoria', href: '/memoria' },
                { name: doc.titulo, href: doc.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 px-2 py-0.5 border border-stone-100 rounded-sm">
                        {doc.tipo_archivo}
                    </span>
                    <h1 className="text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                        {doc.titulo}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Año / Época</span>
                            <span className="text-stone-700 font-medium">{doc.año || 'Sin especificar'}</span>
                        </div>
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Fuente Original</span>
                            <span className="text-stone-700 font-medium">{doc.fuente_original}</span>
                        </div>
                        {(territorio || persona) && (
                            <div>
                                <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Relación</span>
                                <div className="flex flex-col gap-1 font-medium text-stone-900 underline underline-offset-4 decoration-stone-200">
                                    {territorio && <Link href={territorio.url}>{territorio.nombre_oficial}</Link>}
                                    {persona && <Link href={persona.url}>{persona.nombre_completo}</Link>}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                    <Mdx code={doc.body.code} />
                </div>

                {doc.url_archivo && (
                    <div className="mt-12 p-6 bg-stone-50 border border-stone-200 rounded-sm flex items-center justify-between">
                        <div className="text-stone-600 text-sm">
                            Existe una copia digital disponible de este documento.
                        </div>
                        <a
                            href={doc.url_archivo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                        >
                            Ver Archivo
                        </a>
                    </div>
                )}

                <footer className="mt-20 pt-8 border-t border-stone-100 text-[11px] text-stone-400 tracking-wide uppercase leading-loose">
                    <p>
                        Validación de Archivo: {doc.validacion.nombre} ({doc.validacion.tipo_de_validador})
                        {doc.validacion.nota_validacion && ` • ${doc.validacion.nota_validacion}`}
                    </p>
                </footer>
            </article>
        </div>
    )
}
