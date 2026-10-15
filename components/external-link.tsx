import type { ComponentProps } from 'react'

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel'>

/** Link que abre em nova aba: garante o `rel` seguro e avisa leitores de tela. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}
