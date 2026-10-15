import { ArrowRight, PackageOpen } from 'lucide-react'
import { whatsappContactLink } from '@/lib/site'

export function ProductListEmpty() {
  return (
    <div className="flex flex-col items-center border border-white/12 px-6 py-16 text-center lg:py-20">
      <PackageOpen className="size-10 text-secondary lg:size-12" aria-hidden="true" />
      <h3 className="mt-6 font-mono text-xl font-bold uppercase text-white lg:text-2xl">Nenhum produto por aqui… ainda</h3>
      <p className="mt-3 max-w-md font-light leading-7 text-white/60 lg:text-lg">
        Estamos preparando novas peças. Enquanto isso, conte pra gente o que você imagina.
      </p>
      <a href={whatsappContactLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-secondary hover:text-secondary">
        Fale conosco <ArrowRight className="ml-2 size-4" aria-hidden="true" />
      </a>
    </div>
  )
}
