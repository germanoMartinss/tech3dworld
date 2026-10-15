import type { NextRequest } from 'next/server'
import { products } from '@/lib/data'
import { isProductCategory, productCategories, type ApiError, type ProductsResponse } from '@/lib/types'

/**
 * GET /api/produtos
 * GET /api/produtos?categoria=chaveiros
 */
export function GET(request: NextRequest) {
  const categoria = request.nextUrl.searchParams.get('categoria')

  if (categoria === null) {
    return Response.json({ products, total: products.length } satisfies ProductsResponse)
  }

  if (!isProductCategory(categoria)) {
    return Response.json(
      { error: `Categoria inválida: "${categoria}". Use uma destas: ${productCategories.join(', ')}.` } satisfies ApiError,
      { status: 400 },
    )
  }

  const filtered = products.filter((product) => product.category === categoria)
  return Response.json({ products: filtered, total: filtered.length } satisfies ProductsResponse)
}
