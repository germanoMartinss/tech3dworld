import { Reveal } from '@/components/reveal'

export function About() {
  return (
    <section id="sobre" className="relative isolate overflow-hidden border-y border-white/10 bg-card/40 px-5 py-24 lg:px-8 lg:py-32">
      <div className="neon-orb pink" aria-hidden="true" />
      <div className="neon-orb blue" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16 xl:max-w-[90rem]">
        <Reveal>
          <p className="eyebrow">01 / nossa visão</p>
          <h2 className="mt-4 max-w-lg font-mono text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:mt-6 lg:max-w-xl lg:text-6xl">
            A tecnologia é melhor quando <span className="neon-text text-secondary">vira experiência.</span>
          </h2>
        </Reveal>
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          <p className="text-pretty font-light leading-8 tracking-[0.01em] text-white/75 lg:text-lg lg:leading-9">
            Somos um laboratório criativo para quem não aceita o impossível como resposta. Unimos design, modelagem e fabricação para construir o que ainda não existe.
          </p>
          <p className="neon-line border-l border-primary/60 pl-6 font-mono text-sm leading-7 text-white lg:pl-8 lg:text-base lg:leading-8">
            “A imaginação é apenas o primeiro protótipo.”<br /><span className="text-primary">— Tech3Dworld</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
