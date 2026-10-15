'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { ProductListEmpty } from '@/components/catalog/product-list-empty'
import { ProductListError } from '@/components/catalog/product-list-error'
import { ProductListSkeleton } from '@/components/catalog/product-list-skeleton'
import { Reveal } from '@/components/reveal'
import { describeError, fetchProducts } from '@/lib/api'
import { productIcons } from '@/lib/product-icons'
import { whatsappLink } from '@/lib/site'

export function ProductList() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  })

  if (isPending) return <ProductListSkeleton />

  if (isError) {
    const { message, detail } = describeError(error)
    return <ProductListError message={message} detail={detail}onRetry={() => refetch()} />
  }

  if (data.products.length === 0) return <ProductListEmpty />

  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-20 lg:gap-6">
      {data.products.map((product, i) => {
        const Icon = productIcons[product.icon]
        return (
          <Reveal as="article" key={product.id} delay={(i % 3) * 0.12} className={`service-card ${product.color}`}>
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
      })}
    </div>
  )
}
