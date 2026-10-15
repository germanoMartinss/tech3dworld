'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { CategoryFilter, categoryLabels } from '@/components/catalog/category-filter'
import { ProductCard } from '@/components/catalog/product-card'
import { ProductListEmpty } from '@/components/catalog/product-list-empty'
import { ProductListError } from '@/components/catalog/product-list-error'
import { ProductListSkeleton } from '@/components/catalog/product-list-skeleton'
import { describeError, fetchProducts } from '@/lib/api'
import { cn } from '@/lib/utils'
import { isProductCategory, type ProductCategory } from '@/lib/types'

/** Lê a categoria da URL; valor ausente ou inválido (ex.: ?categoria=brinquedos) vira "Todos". */
function useCategoryFromUrl() {
  const searchParams = useSearchParams()
  const param = searchParams.get('categoria')
  const categoria = param !== null && isProductCategory(param) ? param : undefined

  function setCategoria(next: ProductCategory | undefined) {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set('categoria', next)
    else params.delete('categoria')
    const query = params.toString()
    // replaceState: atualiza a URL sem recarregar e sem criar entrada no histórico.
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
  }

  return [categoria, setCategoria] as const
}

export function ProductList() {
  const [categoria, setCategoria] = useCategoryFromUrl()
  const [hasFiltered, setHasFiltered] = useState(false)

  const { data, isPending, isError, error, refetch, isPlaceholderData } = useQuery({
    queryKey: ['products', { categoria }],
    queryFn: ({ signal }) => fetchProducts({ categoria, signal }),
    // Enquanto a nova categoria carrega, mantém a lista anterior na tela (sem skeleton piscando).
    placeholderData: keepPreviousData,
  })

  function handleCategoryChange(next: ProductCategory | undefined) {
    setHasFiltered(true)
    setCategoria(next)
  }

  let content: ReactNode
  if (isPending) {
    content = <ProductListSkeleton />
  } else if (isError) {
    const { message, detail } = describeError(error)
    content = <ProductListError message={message} detail={detail} onRetry={() => refetch()} />
  } else if (data.products.length === 0) {
    content = <ProductListEmpty />
  } else {
    content = (
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {data.products.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={(i % 3) * 0.12} />
        ))}
      </div>
    )
  }

  // Anunciado por leitores de tela só depois que o usuário filtra (e não a cada carregamento).
  const announcement = hasFiltered && data && !isPlaceholderData
    ? `${data.total} ${data.total === 1 ? 'produto' : 'produtos'} em ${categoria ? categoryLabels[categoria] : 'Todos'}`
    : ''

  return (
    <CatalogShell filter={<CategoryFilter value={categoria} onChange={handleCategoryChange} />}>
      <p className="sr-only" aria-live="polite">{announcement}</p>
      <div aria-busy={isPlaceholderData} className={cn('transition-opacity', isPlaceholderData && 'opacity-60')}>
        {content}
      </div>
    </CatalogShell>
  )
}

/** Exibido pelo <Suspense> enquanto a URL ainda não pode ser lida (HTML estático do build). */
export function ProductListFallback() {
  return (
    <CatalogShell filter={<CategoryFilter disabled />}>
      <ProductListSkeleton />
    </CatalogShell>
  )
}

function CatalogShell({ filter, children }: { filter: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-14 lg:mt-20">
      {filter}
      <div className="mt-8 lg:mt-10">{children}</div>
    </div>
  )
}
