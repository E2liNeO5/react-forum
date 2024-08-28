import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function Provider({ children }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}