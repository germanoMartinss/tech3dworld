import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

// next/font baixa as fontes no build e as serve do próprio domínio (sem requisição ao Google
// no navegador) e ajusta a fonte de fallback para evitar layout shift na troca.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'Tech3Dworld — Do digital para o real',
  description: 'Um laboratório criativo na interseção entre tecnologia, design e fabricação 3D.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080611',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceMono.variable} bg-background`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
