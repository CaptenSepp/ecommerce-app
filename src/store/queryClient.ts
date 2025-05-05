// queryClient.ts
import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | null = null

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    })
  }
  return queryClient
}
