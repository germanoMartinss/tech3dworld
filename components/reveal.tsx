'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

// `visible` é uma função que recebe o `custom` (o atraso). A transição precisa ficar
// dentro da variante: uma prop `transition` no componente é ignorada quando a variante define a sua.
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay } }),
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: { duration: 1, delay } }),
  },
} satisfies Record<string, Variants>

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
  variant?: keyof typeof variants
  /** 'mount': anima ao carregar a página. 'inView': anima ao entrar na tela (uma vez). */
  trigger?: 'mount' | 'inView'
  /** Atraso em segundos, para animações escalonadas. */
  delay?: number
}

/**
 * Ilha client-side para animações de entrada. Permite que as seções
 * continuem sendo Server Components e só este wrapper vá para o navegador.
 */
export function Reveal({ children, className, as = 'div', variant = 'fadeUp', trigger = 'inView', delay }: RevealProps) {
  const Component = as === 'article' ? motion.article : motion.div
  const animation = trigger === 'mount' ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true } }

  return (
    <Component initial="hidden" {...animation} variants={variants[variant]} custom={delay} className={className}>
      {children}
    </Component>
  )
}
