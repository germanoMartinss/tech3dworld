import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { productIcons } from '@/lib/product-icons'
import { whatsappLink } from '@/lib/site'
import type { Product } from '@/lib/types'

type ProductCardProps = {
  product: Product
  /** Atraso da animação de entrada, em segundos (quem decide é a lista). */
  delay?: number
}

export function ProductCard({ product, delay }: ProductCardProps) {
  const Icon = productIcons[product.icon]

  return (
    <Reveal as="article" delay={delay} className={`service-card ${product.color}`}>
      <Icon className="size-8 lg:size-10" />
      <h3 className="mt-16 font-mono text-xl font-bold uppercase text-white lg:mt-20 lg:text-2xl">{product.title}</h3>
      <p className="mt-3 font-light leading-7 tracking-[0.01em] text-white/60 lg:mt-4 lg:text-lg">{product.description}</p>
      <div className="mt-8 flex items-center justify-between gap-3 lg:mt-10">
        <span className="font-mono text-sm text-muted-foreground lg:text-base">A partir de R$ {product.priceFrom}</span>
        <a href={whatsappLink(product.title)} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition hover:opacity-80 lg:text-base">
          Peça o seu <ArrowRight className="size-4 transition group-hover/link:translate-x-1 lg:size-5" />
        </a>
      </div>
    </Reveal>
  )
}
