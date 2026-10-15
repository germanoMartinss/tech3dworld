/** Cor de destaque dos cards (ver `.service-card.<cor>` no globals.css). */
export type AccentColor = 'pink' | 'orange' | 'blue'

/** Fonte única das categorias: o array existe em runtime (validação) e o tipo é derivado dele. */
export const productCategories = ['chaveiros', 'decor', 'personalizados'] as const

export type ProductCategory = (typeof productCategories)[number]

export function isProductCategory(value: string): value is ProductCategory {
  return (productCategories as readonly string[]).includes(value)
}

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

/** Resposta de sucesso de GET /api/produtos. */
export type ProductsResponse = {
  products: Product[]
  total: number
}

/** Corpo das respostas de erro da API. */
export type ApiError = {
  error: string
}
