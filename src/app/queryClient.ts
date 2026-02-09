import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | null = null // singleton instance

export const getQueryClient = () => { // lazy-create and return the client
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes cache freshness
          refetchOnMount: false, // avoid refetch on remount
          refetchOnWindowFocus: false, // avoid refetch on focus
          refetchOnReconnect: false, // avoid refetch on reconnect
        },
      },
    })
  }
  return queryClient
}
