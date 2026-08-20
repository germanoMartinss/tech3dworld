'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Cpu, Layers3, Menu, MoveUpRight, Printer, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

const logo = '/tech3d-logo-transparent.png'

const categories = [
  { icon: Box, title: 'Modelagem 3D', copy: 'Ideias ganham forma, detalhe e propósito.', color: 'pink' },
  { icon: Printer, title: 'Impressão 3D', copy: 'Protótipos reais para tirar projetos do papel.', color: 'orange' },
  { icon: Cpu, title: 'Tecnologia', copy: 'Ferramentas e conhecimento para criar melhor.', color: 'blue' },
]

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }

export function Tech3DWorld() {
  const [open, setOpen] = useState(false)
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Navegação principal">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Tech3Dworld início">
            <Image src={logo} alt="Tech3Dworld" width={54} height={54} className="h-11 w-11 object-contain" />
            <span className="font-mono text-sm font-bold tracking-[0.2em] text-white">TECH<span className="text-primary">3D</span>WORLD</span>
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#sobre" className="transition-colors hover:text-white">Sobre</a><a href="#servicos" className="transition-colors hover:text-white">Serviços</a><a href="#processo" className="transition-colors hover:text-white">Processo</a>
            <a href="#contato" className="rounded-full border border-primary/60 px-5 py-2.5 text-white transition hover:bg-primary/15">Fale conosco <MoveUpRight className="ml-1 inline size-3" /></a>
          </div>
          <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
        </nav>
        {open && <div className="border-t border-white/10 px-5 py-5 md:hidden"><div className="flex flex-col gap-5 text-sm uppercase tracking-widest"><a href="#sobre" onClick={() => setOpen(false)}>Sobre</a><a href="#servicos" onClick={() => setOpen(false)}>Serviços</a><a href="#contato" onClick={() => setOpen(false)}>Contato</a></div></div>}
      </header>

      <section id="inicio" className="relative flex min-h-screen items-center px-5 pb-20 pt-32 lg:px-8">
        <div className="gridlines pointer-events-none absolute inset-0 opacity-40" /><div className="scanline pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary"><Sparkles className="size-3" /> O futuro começa aqui</div>
            <h1 className="text-balance font-mono text-5xl font-black uppercase leading-[0.95] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">Do digital<br /><span className="text-gradient">para o real.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">Exploramos a interseção entre criatividade, tecnologia e fabricação. Transformamos conceitos em objetos que você pode tocar.</p>
            <div className="mt-9 flex flex-wrap gap-4"><a href="#contato" className="group rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:shadow-[0_0_35px_rgba(255,45,177,0.45)]">Comece seu projeto <ArrowRight className="ml-2 inline size-4 transition group-hover:translate-x-1" /></a><a href="#servicos" className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-secondary hover:text-secondary">Explorar universo</a></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute inset-8 rounded-full bg-primary/25 blur-[80px]" /><Image src={logo} alt="Logo neon Tech3Dworld" width={600} height={600} priority className="relative z-10 w-full animate-float object-contain drop-shadow-[0_0_25px_rgba(255,45,177,0.5)]" />
            <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-secondary/50 bg-background/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">// criando possibilidades_</div>
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="border-y border-white/10 bg-card/40 px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}><p className="eyebrow">01 / nossa visão</p><h2 className="mt-4 max-w-lg font-mono text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">A tecnologia é melhor quando <span className="text-secondary">vira experiência.</span></h2></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="grid gap-6 sm:grid-cols-2"><p className="text-pretty leading-8 text-muted-foreground">Somos um laboratório criativo para quem não aceita o impossível como resposta. Unimos design, modelagem e fabricação para construir o que ainda não existe.</p><p className="border-l border-primary/60 pl-6 font-mono text-sm leading-7 text-white">“A imaginação é apenas o primeiro protótipo.”<br /><span className="text-primary">— Tech3Dworld</span></p></motion.div></div></section>

      <section id="servicos" className="px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><p className="eyebrow">02 / o que fazemos</p><div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end"><h2 className="font-mono text-4xl font-bold uppercase text-white sm:text-5xl">Ferramentas para<br /><span className="text-gradient">imaginar maior.</span></h2><p className="max-w-sm leading-7 text-muted-foreground">Da primeira linha de código ao último detalhe da peça final.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{categories.map(({ icon: Icon, title, copy, color }, i) => <motion.article key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.12 }} variants={reveal} className={`service-card ${color}`}><Icon className="size-8" /><p className="mt-16 font-mono text-xl font-bold uppercase text-white">{title}</p><p className="mt-3 leading-7 text-muted-foreground">{copy}</p><ArrowRight className="mt-8 size-5 transition group-hover:translate-x-2" /></motion.article>)}</div></div></section>

      <section id="processo" className="border-y border-white/10 bg-card/40 px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><p className="eyebrow">03 / como acontece</p><h2 className="mt-4 max-w-2xl font-mono text-4xl font-bold uppercase text-white sm:text-5xl">Uma ideia.<br /><span className="text-secondary">Várias dimensões.</span></h2><div className="mt-14 grid gap-8 md:grid-cols-4">{['Descobrir', 'Projetar', 'Construir', 'Evoluir'].map((step, i) => <div key={step} className="relative border-t border-white/20 pt-5"><span className="font-mono text-sm text-primary">0{i + 1}</span><h3 className="mt-8 font-mono text-xl font-bold uppercase text-white">{step}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{['Entendemos o desafio e descobrimos novas possibilidades.', 'Damos forma à visão com precisão e intenção.', 'Prototipamos, testamos e materializamos.', 'O projeto vive, aprende e encontra novos caminhos.'][i]}</p></div>)}</div></div></section>

      <section id="contato" className="relative px-5 py-28 text-center lg:px-8"><div className="gridlines pointer-events-none absolute inset-0 opacity-30" /><div className="relative mx-auto max-w-4xl"><Layers3 className="mx-auto size-10 text-primary" /><h2 className="mt-7 text-balance font-mono text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl">Vamos criar<br /><span className="text-gradient">o próximo mundo.</span></h2><p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted-foreground">Você traz a pergunta. A gente constrói a possibilidade.</p><a href="mailto:hello@tech3dworld.com" className="mt-9 inline-flex rounded-full bg-secondary px-7 py-4 font-bold text-secondary-foreground transition hover:shadow-[0_0_35px_rgba(0,204,255,0.4)]">hello@tech3dworld.com <ArrowRight className="ml-3 size-5" /></a></div></section>

      <footer className="border-t border-white/10 px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row"><span>© 2026 TECH3DWORLD. TODOS OS DIREITOS RESERVADOS.</span><span className="font-mono tracking-widest text-primary">MADE FOR THE CURIOUS_</span></div></footer>
    </main>
  )
}
