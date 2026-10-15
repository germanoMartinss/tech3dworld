'use client'

import Image from 'next/image'
import { Menu, MoveUpRight, X } from 'lucide-react'
import { useState } from 'react'
import { logo, whatsappContactLink } from '@/lib/site'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8 lg:py-5 xl:max-w-[90rem]" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-3 lg:gap-4" aria-label="Tech3Dworld início">
          <Image src={logo} alt="Tech3Dworld" width={54} height={54} className="h-11 w-11 object-contain lg:h-14 lg:w-14" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-white lg:text-base xl:text-lg">TECH<span className="text-primary">3D</span>WORLD</span>
        </a>
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground md:flex lg:gap-10 lg:text-sm">
          <a href="#sobre" className="transition-colors hover:text-white">Sobre</a>
          <a href="#servicos" className="transition-colors hover:text-white">Serviços</a>
          <a href="#catalogo" className="transition-colors hover:text-white">Catálogo</a>
          <a href="#processo" className="transition-colors hover:text-white">Processo</a>
          <a href={whatsappContactLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary/60 px-5 py-2.5 text-white transition hover:bg-primary/15 lg:px-6 lg:py-3">
            Fale conosco <MoveUpRight className="ml-1 inline size-3" />
          </a>
        </div>
        <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5 text-sm uppercase tracking-widest">
            <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
            <a href="#servicos" onClick={() => setOpen(false)}>Serviços</a>
            <a href="#catalogo" onClick={() => setOpen(false)}>Catálogo</a>
            <a href="#processo" onClick={() => setOpen(false)}>Processo</a>
            <a href="#contato" onClick={() => setOpen(false)}>Contato</a>
          </div>
        </div>
      )}
    </header>
  )
}
