import type { NextRequest } from 'next/server'
import { products } from '@/lib/data'
import { isProductCategory, productCategories, type ApiError, type ProductsResponse } from '@/lib/types'

/**
 * GET /api/produtos
 * GET /api/produtos?categoria=chaveiros
 *
 * Só em desenvolvimento (para demonstrar os estados do front):
 *   ?atraso=3000    espera 3 s antes de responder
 *   ?simular=erro   responde 500
 *   ?simular=vazio  responde com lista vazia
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  if (process.env.NODE_ENV !== 'production') {
    const simulated = await simulate(searchParams)
    if (simulated) return simulated
  }

  const categoria = searchParams.get('categoria')

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

async function simulate(searchParams: URLSearchParams): Promise<Response | null> {
  const delay = Number(searchParams.get('atraso'))
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay))

  switch (searchParams.get('simular')) {
    case 'erro':
      return Response.json({ error: 'Erro simulado no servidor (?simular=erro).' } satisfies ApiError, { status: 500 })
    case 'vazio':
      return Response.json({ products: [], total: 0 } satisfies ProductsResponse)
    default:
      return null
  }
}
