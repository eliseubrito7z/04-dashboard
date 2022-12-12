import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../context/SidebarDrawerContent'
import { makeServer } from '../services/mirage'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
