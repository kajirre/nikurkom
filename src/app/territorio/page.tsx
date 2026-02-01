import { allTerritorioPijaos } from 'contentlayer/generated'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
    title: 'Territorio | Archivo Digital Pijao',
}

export default function TerritorioIndex() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <Breadcrumbs items={[{ name: 'Territorio', href: '/territorio' }]} />

            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Territorio</h1>
                <p className="text-stone-600 max-w-2xl text-lg">
                    Unidades territoriales, resguardos y comunidades que conforman la base geográfica y cultural del pueblo Pijao.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTerritorioPijaos.map((territorio) => (
                    <Link
                        key={territorio.id}
                        href={territorio.url}
                        className="group block p-6 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors"
                    >
                        <h2 className="text-xl font-bold text-stone-900 group-hover:text-black transition-colors mb-2">
                            {territorio.nombre_oficial}
                        </h2>
                        <div className="flex flex-col text-sm text-stone-500">
                            <span>{territorio.municipio}, Tolima</span>
                            <span className="mt-2 text-stone-400 font-medium uppercase text-[10px] tracking-widest">
                                {territorio.estatus_legal}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
