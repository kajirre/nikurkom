import { allTerritorioPijaos, allPersonaPijaos, allProyectoTrabajos } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/Mdx'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const generateStaticParams = async () => allProyectoTrabajos.map((p) => ({ slug: p._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = allProyectoTrabajos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)
    if (!post) return {}

    return {
        title: post.titulo,
        description: `Detalles del proceso: ${post.titulo}. Categoría: ${post.categoria}. Estado: ${post.estado_actual}.`,
        openGraph: {
            title: `${post.titulo} | Procesos Pijao`,
            description: `Información sobre el trabajo comunitario y productivo: ${post.titulo}.`,
        }
    }
}

export default async function ProcesoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = allProyectoTrabajos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)

    if (!post) notFound()

    // Navegación Contextual
    const territorio = allTerritorioPijaos.find((t) => t.id === post.territorio_relacion)
    const personasRelacionadas = allPersonaPijaos.filter((p) => post.actores_clave?.includes(p.id))

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <Breadcrumbs items={[
                { name: 'Procesos', href: '/procesos' },
                { name: post.titulo, href: post.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-5xl font-serif font-bold text-stone-900 leading-tight">
                            {post.titulo}
                        </h1>
                        <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-stone-200 rounded-full ${post.estado_actual === 'Activo' ? 'text-green-600 border-green-100 bg-green-50/30' : 'text-stone-400'
                            }`}>
                            {post.estado_actual}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Territorio</span>
                            {territorio ? (
                                <Link href={territorio.url} className="text-stone-900 font-bold underline underline-offset-4 decoration-stone-200 hover:decoration-stone-400 decoration-2 transition-all">
                                    {territorio.nombre_oficial}
                                </Link>
                            ) : <span className="text-stone-700 font-medium">No especificado</span>}
                        </div>
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Categoría</span>
                            <span className="text-stone-700 font-medium">{post.categoria}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Conocimiento</span>
                            <span className="text-stone-700 font-medium">{post.tipos_de_conocimiento.join(', ')}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                    <Mdx code={post.body.code} />
                </div>

                {/* Navegación Contextual */}
                <section className="mt-20 border-t border-stone-100 pt-12">
                    {personasRelacionadas.length > 0 && (
                        <div>
                            <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Actores Clave</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {personasRelacionadas.map((persona) => (
                                    <li key={persona.id}>
                                        <Link href={persona.url} className="group block p-4 border border-stone-100 rounded-sm hover:border-stone-200 hover:bg-stone-50 transition-all">
                                            <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{persona.nombre_completo}</span>
                                            <span className="text-xs text-stone-500 uppercase tracking-wider">{persona.oficio_principal?.join(', ')}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                <footer className="mt-20 pt-8 border-t border-stone-100 text-[11px] text-stone-400 tracking-wide uppercase leading-loose">
                    <p className="mb-2">Reportado por: {post.metadatos_origen.reportado_por} • Registro: {post.metadatos_origen.fecha_registro}</p>
                    <p>
                        Validación: {post.validacion.nombre} ({post.validacion.tipo_de_validador})
                        {post.validacion.fecha_validacion && ` • ${post.validacion.fecha_validacion}`}
                        {post.validacion.nota_validacion && ` • ${post.validacion.nota_validacion}`}
                    </p>
                </footer>
            </article>
        </div>
    )
}
