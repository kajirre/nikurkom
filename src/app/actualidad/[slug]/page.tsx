import { allActualidads, allTerritorioPijaos } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const generateStaticParams = async () => allActualidads.map((p) => ({ slug: p._raw.flattenedPath.split('/').pop() }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = allActualidads.find((p) => p._raw.flattenedPath.split('/').pop() === slug)
    if (!post) return {}

    return {
        title: post.titulo,
        description: post.resumen,
        openGraph: {
            title: `${post.titulo} | Actualidad Pijao`,
            description: post.resumen,
            type: 'article',
            publishedTime: post.fecha,
        }
    }
}

export default async function ActualidadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = allActualidads.find((p) => p._raw.flattenedPath.split('/').pop() === slug)

    if (!post) notFound()

    const territorio = post.territorio_relacion ? allTerritorioPijaos.find((t) => t.id === post.territorio_relacion) : null
    const MDXContent = useMDXComponent(post.body.code)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.titulo,
        "datePublished": post.fecha,
        "description": post.resumen,
        "author": [{
            "@type": "Organization",
            "name": post.fuente
        }]
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={[
                { name: 'Actualidad', href: '/actualidad' },
                { name: post.titulo, href: post.url }
            ]} />

            <article>
                <header className="mb-12 border-b pb-8 border-stone-100">
                    <time className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
                        {format(parseISO(post.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                    </time>
                    <h1 className="text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                        {post.titulo}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                        <div>
                            <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Fuente</span>
                            <span className="text-stone-700 font-medium">{post.fuente}</span>
                        </div>
                        {territorio && (
                            <div>
                                <span className="block text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">Territorio Relacionado</span>
                                <Link href={territorio.url} className="text-stone-900 font-bold underline underline-offset-4 decoration-stone-200 hover:decoration-stone-400 decoration-2 transition-all">
                                    {territorio.nombre_oficial}
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold">
                    <MDXContent />
                </div>

                <footer className="mt-20 pt-8 border-t border-stone-100 text-[11px] text-stone-400 tracking-wide uppercase leading-loose">
                    <p>
                        Validación de Registro: {post.validacion.nombre} ({post.validacion.tipo_de_validador})
                        {post.validacion.fecha_validacion && ` • ${post.validacion.fecha_validacion}`}
                    </p>
                </footer>
            </article>
        </div>
    )
}
