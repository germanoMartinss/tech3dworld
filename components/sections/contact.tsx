import { ArrowRight, Layers3 } from 'lucide-react'
import { contactEmail } from '@/lib/site'

export function Contact() {
  return (
    <section id="contato" className="relative border-t border-white/10 bg-card/40 px-5 py-28 text-center lg:px-8 lg:py-36">
      <div className="gridlines pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl lg:max-w-5xl">
        <Layers3 className="mx-auto size-10 text-primary lg:size-14" />
        <h2 className="mt-7 text-balance font-mono text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl lg:mt-9 lg:text-8xl">
          Vamos criar<br /><span className="text-gradient">o próximo mundo.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-8 tracking-[0.01em] text-white/75 lg:mt-9 lg:max-w-2xl lg:text-xl lg:leading-9">
          Você traz a pergunta. A gente constrói a possibilidade.
        </p>
        <a href={`mailto:${contactEmail}`} className="mt-9 inline-flex rounded-full border border-white/20 px-7 py-4 font-bold text-white transition hover:border-secondary hover:text-secondary lg:mt-12 lg:px-9 lg:py-5 lg:text-lg">
          {contactEmail} <ArrowRight className="ml-3 size-5 lg:size-6" />
        </a>
      </div>
    </section>
  )
}
