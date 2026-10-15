'use client'

import Image from 'next/image'
import { Menu, MoveUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from '@/components/external-link'
import { logo, whatsappContactLink } from '@/lib/site'

/** Mesma lista no desktop e no mobile. */
const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#processo', label: 'Processo' },
  { href: '#contato', label: 'Contato' },
]

const MOBILE_MENU_ID = 'menu-mobile'

export function Header() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Esc fecha o menu e devolve o foco ao botão, para o usuário de teclado não se perder.
  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8 lg:py-5 xl:max-w-[90rem]" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-3 lg:gap-4" aria-label="Tech3Dworld início">
          <Image src={logo} alt="" width={56} height={55} className="h-11 w-11 object-contain lg:h-14 lg:w-14" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-white lg:text-base xl:text-lg">TECH<span className="text-primary">3D</span>WORLD</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">{link.label}</a>
            </li>
          ))}
          <li>
            <ExternalLink href={whatsappContactLink} className="rounded-full border border-primary/60 px-5 py-2.5 text-white transition hover:bg-primary/15 lg:px-6 lg:py-3">
              Fale conosco <MoveUpRight className="ml-1 inline size-3" />
            </ExternalLink>
          </li>
        </ul>
        <button
          ref={menuButtonRef}
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {/* Sempre no DOM (o aria-controls aponta para ele); `hidden` o tira da tela, do Tab e do leitor de tela. */}
      <div id={MOBILE_MENU_ID} hidden={!open} className="border-t border-white/10 px-5 py-5 lg:hidden">
        <ul className="flex flex-col gap-5 text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </li>
          ))}
          <li>
            <ExternalLink href={whatsappContactLink} onClick={() => setOpen(false)} className="inline-flex items-center rounded-full border border-primary/60 px-5 py-2.5 font-semibold text-white">
              Fale conosco <MoveUpRight className="ml-1 inline size-3" />
            </ExternalLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
