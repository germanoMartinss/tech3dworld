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

export type ErrorDescription = {
  /** Texto amigável para o usuário: diz o que fazer, sem jargão técnico. */
  message: string
  /** Detalhe técnico para console/log (e para a tela só em desenvolvimento). */
  detail: string
}

export function describeError(error: unknown): ErrorDescription {
  if (isAxiosError<ApiError>(error)) {
    const reason = error.response?.data?.error ?? error.message
    if (error.code === 'ECONNABORTED') {
      return { message: 'O servidor demorou para responder. Tente novamente em instantes.', detail: `Timeout: ${reason}` }
    }
    if (!error.response) {
      return { message: 'Não foi possível conectar. Verifique sua internet e tente novamente.', detail: `Sem resposta (${error.code}): ${reason}` }
    }
    return { message: 'Não conseguimos carregar os produtos agora. Tente novamente em instantes.', detail: `HTTP ${error.response.status}: ${reason}` }
  }
  return { message: 'Algo deu errado ao carregar os produtos. Tente novamente.', detail: String(error) }
}
