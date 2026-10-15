'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

// `visible` é uma função que recebe o `custom` (o atraso). A transição precisa ficar
// dentro da variante: uma prop `transition` no componente é ignorada quando a variante define a sua.
const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay } }),
}

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
  /** Atraso em segundos, para animações escalonadas. */
  delay?: number
}

/**
 * Anima a entrada quando o elemento aparece na tela (uma vez). É uma ilha client-side:
 * as seções continuam Server Components e só este wrapper vai para o navegador.
 * O hero não usa este componente: acima da dobra a animação é CSS, para não esperar o JavaScript (LCP).
 */
export function Reveal({ children, className, as = 'div', delay }: RevealProps) {
  const Component = as === 'article' ? motion.article : motion.div

  return (
    <Component initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants} custom={delay} className={className}>
      {children}
    </Component>
  )
}
