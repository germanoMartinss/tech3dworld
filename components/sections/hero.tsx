import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { logo } from '@/lib/site'

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-svh items-center px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="gridlines pointer-events-none absolute inset-0 opacity-40" />
      <div className="scanline pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:max-w-[90rem] xl:gap-20">
        <Reveal trigger="mount" className="max-w-3xl lg:max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary lg:mb-9 lg:px-4 lg:py-2.5 lg:text-xs">
            <Sparkles className="size-3 lg:size-4" /> O futuro começa aqui
          </div>
          <h1 className="text-balance font-mono text-5xl font-black uppercase leading-[0.95] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            Do digital<br /><span className="text-gradient">para o real.</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg font-light leading-8 tracking-[0.01em] text-white/75 lg:mt-9 lg:max-w-2xl lg:text-xl lg:leading-9">
            Exploramos a interseção entre criatividade, tecnologia e fabricação. Transformamos conceitos em objetos que você pode tocar.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 lg:mt-12 lg:gap-5">
            <a href="#contato" className="group rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-primary hover:text-primary lg:px-8 lg:py-4 lg:text-base">
              Comece seu projeto <ArrowRight className="ml-2 inline size-4 transition group-hover:translate-x-1 lg:size-5" />
            </a>
            <a href="#servicos" className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-secondary hover:text-secondary lg:px-8 lg:py-4 lg:text-base">
              Explorar universo
            </a>
          </div>
        </Reveal>
        <Reveal trigger="mount" variant="zoom" className="relative mx-auto w-full max-w-[460px] lg:max-w-[560px] xl:max-w-[620px]">
          <Image src={logo} alt="Logo neon Tech3Dworld" width={600} height={600} priority className="relative z-10 w-full animate-float object-contain drop-shadow-[0_0_25px_rgba(255,45,177,0.5)]" />
          <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-secondary/50 bg-background/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-secondary lg:px-5 lg:py-2.5 lg:text-xs">
            {'// criando possibilidades_'}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
