'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Territorio', href: '/territorio' },
    { name: 'Personas', href: '/personas' },
    { name: 'Procesos', href: '/procesos' },
    { name: 'Memoria', href: '/memoria' },
    { name: 'Conocimiento', href: '/conocimiento' },
    { name: 'Actualidad', href: '/actualidad' },
    { name: 'Sobre el archivo', href: '/sobre-el-archivo' },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Cerrar menú al cambiar de página
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Evitar scroll cuando el menú está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="font-serif text-2xl tracking-tighter text-stone-900 font-bold group">
                            ARCHIVO <span className="text-stone-400 group-hover:text-stone-900 transition-colors duration-500">PIJAO</span>
                        </Link>
                    </div>

                    {/* Menú Desktop */}
                    <div className="hidden lg:flex space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-sm ${pathname === item.href
                                    ? 'text-stone-900 bg-stone-100'
                                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Botón Mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors relative z-50"
                        aria-label="Menú de navegación"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between items-end overflow-hidden">
                            <span className={`w-6 h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-4 h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? 'opacity-0 translate-x-4' : ''}`}></span>
                            <span className={`w-5 h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Menú Mobile Overlay */}
            <div className={`fixed inset-0 bg-white/98 z-40 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                }`}>
                <div className="flex flex-col h-full pt-32 px-8 overflow-y-auto">
                    <div className="space-y-6">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={`block text-4xl font-serif font-bold transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                                    } ${pathname === item.href ? 'text-stone-900' : 'text-stone-300 hover:text-stone-900'}`}
                            >
                                {item.name}
                                {pathname === item.href && <span className="ml-4 text-xs font-sans uppercase tracking-widest text-stone-400">Actual</span>}
                            </Link>
                        ))}
                    </div>

                    <div className={`mt-auto mb-12 transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-xs text-stone-400 uppercase tracking-[0.3em] font-bold mb-4 italic">Archivo Digital Pijao</p>
                        <div className="h-px w-12 bg-stone-200"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
