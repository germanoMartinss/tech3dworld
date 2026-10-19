import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

// next/font baixa as fontes no build e as serve do próprio domínio (sem requisição ao Google
// no navegador) e ajusta a fonte de fallback para evitar layout shift na troca.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-space-mono' })

const shareTitle = 'Tech3dworld — Do digital para o físico'
const description = 'Um laboratório criativo na interseção entre tecnologia, design e fabricação 3D.'
const ogImage = { url: '/og.jpg', width: 1200, height: 630, alt: shareTitle }

// favicon.ico e icon.png ficam em app/ e o Next gera as tags <link rel="icon"> sozinho.
export const metadata: Metadata = {
  metadataBase: new URL('https://tech3dworld.vercel.app'),
  title: 'Tech3Dworld — Do digital para o real',
  description,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Tech3dworld',
    title: shareTitle,
    description,
    locale: 'pt_BR',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: shareTitle,
    description,
    images: [ogImage],
  },
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
