import { allSaberPropios, allTerritorioPijaos, allPersonaPijaos } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/Mdx'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const generateStaticParams = async () => allSaberPropios.map((s) => ({ slug: s._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = allSaberPropios.find((s) => s._raw.flattenedPath.split('/').pop() === slug)
    if (!post) return {}

    return {
        title: post.titulo,
        description: `Saber propio Pijao: ${post.titulo}. Categoría: ${post.categoria}. Basado en ${post.tipos_de_conocimiento.join(', ')}.`,
        openGraph: {
            title: `${post.titulo} | Saberes Pijao`,
            description: `Documentación del saber ancestral y contemporáneo: ${post.titulo}.`,
        }
    }
}

export default async function SaberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const saber = allSaberPropios.find((s) => s._raw.flattenedPath.split('/').pop() === slug)

    if (!saber) notFound()

    // Navegación Contextual
    const territorios = allTerritorioPijaos.filter((t) => saber.territorios_relacionados?.includes(t.id))
    const personas = allPersonaPijaos.filter((p) => saber.personas_relacionadas?.includes(p.id))

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <Breadcrumbs items={[
                { name: 'Conocimiento', href: '/conocimiento' },
                { name: saber.titulo, href: saber.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 px-3 py-1 border border-stone-200 rounded-full">
                        Saber {saber.categoria}
                    </span>
                    <h1 className="text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                        {saber.titulo}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Tipo de Conocimiento</span>
                            <span className="text-stone-700 font-medium">{saber.tipos_de_conocimiento.join(', ')}</span>
                        </div>
                        {territorios.length > 0 && (
                            <div>
                                <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Territorios Asociados</span>
                                <div className="flex flex-col gap-1 font-medium text-stone-900 underline underline-offset-4 decoration-stone-200">
                                    {territorios.map(t => (
                                        <Link key={t.id} href={t.url}>{t.nombre_oficial}</Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {personas.length > 0 && (
                            <div>
                                <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Sabedores / Facilitadores</span>
                                <div className="flex flex-col gap-1 font-medium text-stone-900 underline underline-offset-4 decoration-stone-200">
                                    {personas.map(p => (
                                        <Link key={p.id} href={p.url}>{p.nombre_completo}</Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                    <Mdx code={saber.body.code} />
                </div>

                <footer className="mt-20 pt-8 border-t border-stone-100 text-[11px] text-stone-400 tracking-wide uppercase leading-loose">
                    <p>
                        Validación de Saber: {saber.validacion.nombre} ({saber.validacion.tipo_de_validador})
                        {saber.validacion.nota_validacion && ` • ${saber.validacion.nota_validacion}`}
                    </p>
                </footer>
            </article>
        </div>
    )
}
