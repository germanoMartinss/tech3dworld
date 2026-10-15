'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useState, type ReactNode } from 'react'

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
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: shouldRetry,
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
