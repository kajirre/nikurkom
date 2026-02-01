import Link from 'next/link'

interface Breadcrumb {
    name: string
    href: string
}

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
    return (
        <nav className="flex mb-6 text-xs text-stone-400 font-medium uppercase tracking-wider" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-stone-600">INICIO</Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center space-x-2">
                        <span>/</span>
                        <Link
                            href={item.href}
                            className={index === items.length - 1 ? 'text-stone-900 pointer-events-none' : 'hover:text-stone-600'}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
