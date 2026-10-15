export function Footer() {
  // A página é estática: o ano é calculado no build e se atualiza a cada deploy.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 px-5 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row lg:text-sm xl:max-w-[90rem]">
        <span>© {year} TECH3DWORLD. TODOS OS DIREITOS RESERVADOS.</span>
        <span className="font-mono tracking-widest text-primary">MADE FOR THE CURIOUS_</span>
      </div>
    </footer>
  )
}
