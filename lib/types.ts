/** Cor de destaque dos cards (ver `.service-card.<cor>` no globals.css). */
export type AccentColor = 'pink' | 'orange' | 'blue'

export type ProductCategory = 'chaveiros' | 'decor' | 'personalizados'

/** Nome do ícone em texto, para o produto poder trafegar como JSON. */
export type ProductIcon = 'key-round' | 'paw-print' | 'flower' | 'lightbulb' | 'layers' | 'gift' | 'type' | 'wand'

export type Product = {
  id: string
  title: string
  category: ProductCategory
  description: string
  /** Preço inicial em reais. */
  priceFrom: number
  color: AccentColor
  icon: ProductIcon
}
