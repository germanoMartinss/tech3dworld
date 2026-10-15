import axios, { isAxiosError } from 'axios'
import type { ApiError, ProductCategory, ProductsResponse } from '@/lib/types'

/** Instância única do Axios: baseURL e timeout configurados em um lugar só. */
export const api = axios.create({
  baseURL: '/api',
  timeout: 10_000,
})

// Só em desenvolvimento: repassa ?simular= e ?atraso= da URL da página para a API,
// para demonstrar os estados de carregamento, erro e vazio (ver app/api/produtos/route.ts).
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const pageParams = new URLSearchParams(window.location.search)
    for (const key of ['simular', 'atraso']) {
      const value = pageParams.get(key)
      if (value) config.params = { ...config.params, [key]: value }
    }
    return config
  })
}

type FetchProductsParams = {
  categoria?: ProductCategory
  signal?: AbortSignal
}

export async function fetchProducts({ categoria, signal }: FetchProductsParams = {}): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>('/produtos', { params: { categoria }, signal })
  return data
}

/** Traduz qualquer erro de requisição em uma mensagem para o usuário. */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    if (error.response?.data?.error) return error.response.data.error
    if (error.code === 'ECONNABORTED') return 'O servidor demorou demais para responder.'
    if (!error.response) return 'Não foi possível conectar ao servidor. Verifique sua conexão.'
  }
  return 'Algo deu errado ao carregar os produtos.'
}
