import { RotateCw, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ProductListErrorProps = {
  message: string
  /** Detalhe técnico: só aparece em desenvolvimento (em produção vai apenas para o console). */
  detail?: string
  onRetry: () => void
}

/**
 * Ao tentar de novo sem dados em cache, o TanStack Query volta a query para `pending`,
 * então o skeleton reaparece enquanto a nova requisição acontece.
 */
export function ProductListError({ message, detail, onRetry }: ProductListErrorProps) {
  return (
    <div role="alert" className="mt-14 flex flex-col items-center border border-white/12 px-6 py-16 text-center lg:mt-20 lg:py-20">
      <TriangleAlert className="size-10 text-primary lg:size-12" aria-hidden="true" />
      <h3 className="mt-6 font-mono text-xl font-bold uppercase text-white lg:text-2xl">Não foi possível carregar o catálogo</h3>
      <p className="mt-3 max-w-md font-light leading-7 text-white/60 lg:text-lg">{message}</p>
      {process.env.NODE_ENV === 'development' && detail && <p className="mt-2 max-w-md font-mono text-xs text-white/40">[dev] {detail}</p>}
      <Button
        variant="outline"
        onClick={onRetry}
        className="mt-8 h-auto rounded-full border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white hover:border-primary hover:bg-transparent hover:text-primary"
      >
        <RotateCw aria-hidden="true" />
        Tentar novamente
      </Button>
    </div>
  )
}
