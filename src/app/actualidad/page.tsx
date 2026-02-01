import { allActualidads } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const metadata = {
    title: 'Actualidad | Archivo Digital Pijao',
}

export default function ActualidadIndex() {
    const posts = allActualidads.sort((a, b) => b.fecha.localeCompare(a.fecha))

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Actualidad', href: '/actualidad' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Actualidad y Noticias</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Registro de acontecimientos recientes, boletines de los territorios y seguimiento a los procesos comunitarios del pueblo Pijao.
                </p>
            </header>

            {posts.length > 0 ? (
                <div className="space-y-12 max-w-4xl">
                    {posts.map((post) => (
                        <article key={post.id} className="border-b border-stone-100 pb-12 last:border-0">
                            <Link href={post.url} className="group">
                                <time className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">
                                    {format(parseISO(post.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                                </time>
                                <h2 className="text-3xl font-serif font-bold text-stone-900 group-hover:text-stone-600 transition-colors mb-4 leading-tight">
                                    {post.titulo}
                                </h2>
                                <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                                    {post.resumen}
                                </p>
                                <span className="text-stone-900 font-bold text-sm underline underline-offset-4 decoration-stone-200 group-hover:decoration-stone-900 transition-all uppercase tracking-widest">
                                    Leer registro completo →
                                </span>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="p-12 border border-dashed border-stone-200 rounded-sm text-center text-stone-400 font-sans">
                    No hay registros recientes para mostrar.
                </div>
            )}
        </div>
    )
}
