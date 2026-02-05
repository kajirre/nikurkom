import { allTerritorioPijaos, allPersonaPijaos, allProyectoTrabajos, allSaberPropios } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const generateStaticParams = async () => allPersonaPijaos.map((p) => ({ slug: p._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = allPersonaPijaos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)
    if (!post) return {}

    return {
        title: post.nombre_completo,
        description: `Perfil de autoridad y saberes de ${post.nombre_completo}. Oficio: ${post.oficio_principal?.join(', ')}.`,
        openGraph: {
            title: `${post.nombre_completo} | Sabedora/or Pijao`,
            description: `Contribución y roles comunitarios de ${post.nombre_completo} en el territorio Pijao.`,
        }
    }
}

export default async function PersonaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = allPersonaPijaos.find((p) => p._raw.flattenedPath.split('/').pop() === slug)

    if (!post) notFound()

    // Navegación Contextual
    const territorio = allTerritorioPijaos.find((t) => t.id === post.territorio_id)
    const procesosRelacionados = allProyectoTrabajos.filter((p) => p.actores_clave?.includes(post.id))
    const saberesRelacionados = allSaberPropios.filter((s) => s.personas_relacionadas?.includes(post.id))

    const MDXContent = useMDXComponent(post.body.code)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": post.nombre_completo,
        "jobTitle": post.oficio_principal?.join(', '),
        "description": `Integrante y autoridad del pueblo Pijao. Rol: ${post.rol_comunitario?.join(', ')}.`,
        "memberOf": {
            "@type": "Organization",
            "name": "Pueblo Pijao"
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={[
                { name: 'Personas', href: '/personas' },
                { name: post.nombre_completo, href: post.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                        {post.nombre_completo}
                    </h1>
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
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Oficio</span>
                            <span className="text-stone-700 font-medium">{post.oficio_principal?.join(', ')}</span>
                        </div>
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Rol Comunitario</span>
                            <span className="text-stone-700 font-medium">{post.rol_comunitario?.join(', ')}</span>
                        </div>
                        <div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {procesosRelacionados.length > 0 && (
                            <div>
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Procesos Vinculados</h3>
                                <ul className="space-y-4">
                                    {procesosRelacionados.map((proceso) => (
                                        <li key={proceso.id}>
                                            <Link href={proceso.url} className="group block p-4 border border-stone-100 rounded-sm hover:border-stone-200 hover:bg-stone-50 transition-all">
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
                                <h3 className="text-stone-400 font-bold uppercase text-xs tracking-[0.2em] mb-6 whitespace-nowrap">Saberes que Custodia</h3>
                                <ul className="space-y-4">
                                    {saberesRelacionados.map((saber) => (
                                        <li key={saber.id}>
                                            <Link href={saber.url} className="group block p-4 border border-stone-100 rounded-sm hover:border-stone-200 hover:bg-stone-50 transition-all">
                                                <span className="block text-stone-900 font-bold group-hover:underline underline-offset-4">{saber.titulo}</span>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider">Saber {saber.categoria}</span>
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
