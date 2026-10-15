'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isAxiosError } from 'axios'
import { useState, type ReactNode } from 'react'
import { describeError } from '@/lib/api'

/** Erros 4xx não são repetidos (o pedido está errado); falhas 5xx/rede são repetidas 1 vez. */
function shouldRetry(failureCount: number, error: Error) {
  if (isAxiosError(error) && error.response && error.response.status < 500) return false
  return failureCount < 1
}

export function Providers({ children }: { children: ReactNode }) {
  // useState garante um QueryClient por usuário/aba, criado uma única vez.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Log central: roda uma vez por query que falhou (após os retries).
        // Em um projeto real, aqui entraria o envio para um serviço como o Sentry.
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.error('[query falhou]', query.queryKey, describeError(error).detail, error)
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: shouldRetry,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* O pacote já vira `() => null` fora de development; não vai para produção. */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
