import { ArrowRight, Box, Cpu, Printer, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { AccentColor } from '@/lib/types'

const services: { icon: LucideIcon; title: string; copy: string; color: AccentColor }[] = [
  { icon: Box, title: 'Modelagem 3D', copy: 'Ideias ganham forma, detalhe e propósito.', color: 'pink' },
  { icon: Printer, title: 'Impressão 3D', copy: 'Protótipos reais para tirar projetos do papel.', color: 'orange' },
  { icon: Cpu, title: 'Tecnologia', copy: 'Ferramentas e conhecimento para criar melhor.', color: 'blue' },
]

export function Services() {
  return (
    <section id="servicos" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl xl:max-w-[90rem]">
        <p className="eyebrow lg:text-xs">02 / o que fazemos</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end lg:mt-6">
          <h2 className="font-mono text-4xl font-bold uppercase text-white sm:text-5xl lg:text-6xl">
            Ferramentas para<br /><span className="text-gradient neon-gradient">imaginar maior.</span>
          </h2>
          <p className="max-w-sm font-light leading-7 tracking-[0.01em] text-white/75 lg:max-w-md lg:text-lg">
            Da primeira linha de código ao último detalhe da peça final.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {services.map(({ icon: Icon, title, copy, color }, i) => (
            <Reveal as="article" key={title} delay={i * 0.12} className={`service-card neon-card group ${color}`}>
              <Icon className="neon-icon size-8 lg:size-10" />
              <h3 className="mt-16 font-mono text-xl font-bold uppercase text-white lg:mt-20 lg:text-2xl">{title}</h3>
              <p className="mt-3 font-light leading-7 tracking-[0.01em] text-white/60 lg:mt-4 lg:text-lg">{copy}</p>
              <ArrowRight className="mt-8 size-5 transition group-hover:translate-x-2 lg:mt-10 lg:size-6" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
