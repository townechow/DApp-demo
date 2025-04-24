'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// evm
import { EVMContextProvider } from "./ethereum";

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <EVMContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </EVMContextProvider>
  )
}
