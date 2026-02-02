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

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 h-16 flex items-center">
            <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link href="/" className="font-serif text-xl tracking-tight text-stone-900 font-bold uppercase underline decoration-stone-200 decoration-1 underline-offset-4">
                        Archivo Pijao
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded ${pathname === item.href
                                ? 'text-stone-900 bg-stone-100'
                                : 'text-stone-500 hover:text-stone-900'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Trigger */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden p-2 text-stone-600 focus:outline-none"
                    aria-label="Abrir navegación"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Sidebar Backdrop */}
            <div
                className={`fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-[60] transition-opacity duration-200 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar (Off-canvas) */}
            <div className={`fixed top-0 right-0 h-full w-[280px] bg-white border-l border-stone-200 z-[70] shadow-2xl transition-transform duration-200 ease-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-stone-50">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-stone-200 bg-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Índice del Archivo</span>
                        <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-stone-400 hover:text-stone-900">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 py-6 overflow-y-auto">
                        <div className="px-2 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-xs font-bold uppercase tracking-widest border-l-2 transition-all ${pathname === item.href
                                        ? 'text-stone-900 bg-white border-stone-900 shadow-sm'
                                        : 'text-stone-400 border-transparent hover:text-stone-900 hover:bg-stone-100/50'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border-t border-stone-200">
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-1">Archivo Digital Pijao</p>
                        <p className="text-[10px] text-stone-300 italic serif">Soberanía y Memoria Territorial</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}
