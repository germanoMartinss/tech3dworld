const steps = [
  { title: 'Descobrir', copy: 'Entendemos o desafio e descobrimos novas possibilidades.' },
  { title: 'Projetar', copy: 'Damos forma à visão com precisão e intenção.' },
  { title: 'Construir', copy: 'Prototipamos, testamos e materializamos.' },
  { title: 'Evoluir', copy: 'O projeto vive, aprende e encontra novos caminhos.' },
]

export function Process() {
  return (
    <section id="processo" className="border-t border-white/10 px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl xl:max-w-[90rem]">
        <p className="eyebrow">04 / como acontece</p>
        <h2 className="mt-4 max-w-2xl font-mono text-4xl font-bold uppercase text-white sm:text-5xl lg:mt-6 lg:max-w-3xl lg:text-6xl">
          Uma ideia.<br /><span className="text-secondary">Várias dimensões.</span>
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-4 lg:mt-20 lg:gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="relative border-t border-white/20 pt-5 lg:pt-6">
              <span className="font-mono text-sm text-primary lg:text-base">0{i + 1}</span>
              <h3 className="mt-8 font-mono text-xl font-bold uppercase text-white lg:mt-10 lg:text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm font-light leading-6 tracking-[0.01em] text-white/60 lg:mt-4 lg:text-base lg:leading-7">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
