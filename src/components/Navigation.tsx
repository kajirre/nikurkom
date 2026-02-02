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
        <>
            <nav className="border-b border-stone-200 bg-white sticky top-0 z-40 h-16 flex items-center">
                <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <Link href="/" className="font-serif text-lg tracking-tight text-stone-900 font-bold uppercase underline decoration-stone-200 decoration-1 underline-offset-4">
                            Archivo Pijao
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-1">
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

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden p-2 text-stone-900 focus:outline-none"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="4" y1="7" x2="20" y2="7"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="17" x2="20" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Backdrop: Fuera del nav para evitar conflictos de stacking */}
            <div
                className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar: Posicionamiento absoluto al viewport */}
            <div className={`fixed top-0 right-0 h-screen w-[280px] bg-white z-[70] shadow-[10px_0_30px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 bg-white">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Índice del Archivo</span>
                        <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-stone-900">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 py-8 overflow-y-auto bg-stone-50/50">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-l-4 ${pathname === item.href
                                        ? 'text-stone-900 bg-white border-stone-900'
                                        : 'text-stone-400 border-transparent active:bg-stone-100'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border-t border-stone-100 italic font-serif">
                        <p className="text-[10px] text-stone-400 mb-1 font-sans font-bold uppercase tracking-widest not-italic">Archivo Pijao</p>
                        <p className="text-[10px] text-stone-300">Soberanía de la Memoria</p>
                    </div>
                </div>
            </div>
        </>
    )
}
