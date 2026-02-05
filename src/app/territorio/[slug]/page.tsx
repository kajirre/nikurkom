import { allTerritorioPijaos, allPersonaPijaos, allProyectoTrabajos, allSaberPropios, allActualidads } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const generateStaticParams = async () => allTerritorioPijaos.map((p) => ({ slug: p._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = allTerritorioPijaos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)
    if (!post) return {}

    return {
        title: post.nombre_oficial,
        description: `Detalles sobre ${post.nombre_oficial}, municipio de ${post.municipio}. Estatus legal: ${post.estatus_legal}.`,
        openGraph: {
            title: `${post.nombre_oficial} | Archivo Pijao`,
            description: `Información oficial y comunitaria sobre el territorio de ${post.nombre_oficial}.`,
        }
    }
}

export default async function TerritorioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = allTerritorioPijaos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)

    if (!post) notFound()

    // Navegación Contextual
    const personasRelacionadas = allPersonaPijaos.filter((p) => p.territorio_id === post.id)
    const procesosRelacionados = allProyectoTrabajos.filter((p) => p.territorio_relacion === post.id)
    const saberesRelacionados = allSaberPropios.filter((s) => s.territorios_relacionados?.includes(post.id))
    const actualidadRelacionada = allActualidads.filter((a) => a.territorio_relacion === post.id)

    const MDXContent = useMDXComponent(post.body.code)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AdministrativeArea",
        "name": post.nombre_oficial,
        "alternateName": post.nombre_comunitario,
        "description": `Territorio indígena Pijao ubicado en ${post.municipio}. Estatus: ${post.estatus_legal}.`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": post.municipio,
            "addressRegion": "Tolima",
            "addressCountry": "CO"
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={[
                { name: 'Territorio', href: '/territorio' },
                { name: post.nombre_oficial, href: post.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight text-balance">
                        {post.nombre_oficial}
                    </h1>
                    {post.nombre_comunitario && (
                        <p className="text-xl text-stone-500 italic mb-4">"{post.nombre_comunitario}"</p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Municipio</span>
                            <span className="text-stone-700 font-medium">{post.municipio}</span>
                        </div>
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Estatus Legal</span>
                            <span className="text-stone-700 font-medium">{post.estatus_legal}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Conocimiento</span>
                            <span className="text-stone-700 font-medium">{post.tipos_de_conocimiento.join(', ')}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                    <MDXContent />
                </div>

                {/* Navegación Contextual */}
                <section className="mt-20 border-t border-stone-100 pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {personasRelacionadas.length > 0 && (
                            <div>
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Personas Vinculadas</h3>
                                <ul className="space-y-4">
                                    {personasRelacionadas.map((persona) => (
                                        <li key={persona.id}>
                                            <Link href={persona.url} className="group">
                                                <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{persona.nombre_completo}</span>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider">{persona.oficio_principal?.join(', ')}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {procesosRelacionados.length > 0 && (
                            <div>
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Procesos en el Territorio</h3>
                                <ul className="space-y-4">
                                    {procesosRelacionados.map((proceso) => (
                                        <li key={proceso.id}>
                                            <Link href={proceso.url} className="group">
                                                <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{proceso.titulo}</span>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider">{proceso.categoria} • {proceso.estado_actual}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {saberesRelacionados.length > 0 && (
                            <div>
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Saberes del Territorio</h3>
                                <ul className="space-y-4">
                                    {saberesRelacionados.map((saber) => (
                                        <li key={saber.id}>
                                            <Link href={saber.url} className="group">
                                                <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{saber.titulo}</span>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider">Saber {saber.categoria}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {actualidadRelacionada.length > 0 && (
                            <div>
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Noticias Recientes</h3>
                                <ul className="space-y-4">
                                    {actualidadRelacionada.map((item) => (
                                        <li key={item.id}>
                                            <Link href={item.url} className="group">
                                                <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{item.titulo}</span>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider">{item.fecha}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                <footer className="mt-20 pt-8 border-t border-stone-100 text-[11px] text-stone-400 tracking-wide uppercase leading-loose">
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
