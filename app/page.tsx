import { ScrollButton } from '@/components/scroll-button'
import { About } from '@/components/sections/about'
import { Catalog } from '@/components/sections/catalog'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { Services } from '@/components/sections/services'

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
      <Catalog />
      <Process />
      <Contact />
      <Footer />
      <ScrollButton />
    </main>
  )
}
