import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'

import { theme } from '~theme'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
