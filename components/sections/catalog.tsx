import { Suspense } from 'react'
import { ProductList, ProductListFallback } from '@/components/catalog/product-list'

/** Parte estática do catálogo (Server Component). A lista busca os dados da API em <ProductList />. */
export function Catalog() {
  return (
    <section id="catalogo" className="border-y border-white/10 bg-card/40 px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl xl:max-w-[90rem]">
        <p className="eyebrow">03 / catálogo</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end lg:mt-6">
          <h2 className="font-mono text-4xl font-bold uppercase text-white sm:text-5xl lg:text-6xl">
            Peças prontas para<br /><span className="text-secondary">fazer parte do seu dia.</span>
          </h2>
          <p className="max-w-sm font-light leading-7 tracking-[0.01em] text-white/75 lg:max-w-md lg:text-lg">
            Chaveiros, decoração e peças personalizadas — feitas sob medida pra você.
          </p>
        </div>
        {/* useSearchParams numa página estática exige Suspense (senão o build falha). */}
        <Suspense fallback={<ProductListFallback />}>
          <ProductList />
        </Suspense>
      </div>
    </section>
  )
}
