import { Skeleton } from '@/components/ui/skeleton'

const PLACEHOLDER_COUNT = 6

/** Cards-fantasma com as mesmas dimensões do card real, para a página não "pular" quando os dados chegam. */
export function ProductListSkeleton() {
  return (
    <div role="status" className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      <span className="sr-only">Carregando produtos…</span>
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
        <div key={i} aria-hidden="true" className="min-h-[340px] border border-white/12 p-7 lg:min-h-[400px] lg:p-9">
          <Skeleton className="size-8 lg:size-10" />
          <Skeleton className="mt-16 h-7 w-3/4 lg:mt-20 lg:h-8" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-2/3" />
          <div className="mt-10 flex items-center justify-between gap-3 lg:mt-12">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
