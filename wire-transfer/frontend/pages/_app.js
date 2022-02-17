import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"

import { LoadingProgressProvider } from '../components/LoadSkeleton'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { TradingDayServerUp } from './api/trades/server'
import { queryClient } from './api/hello'

if (process.env.NODE_ENV === 'development') {
  TradingDayServerUp();
}




function MyApp({ Component, pageProps }) {
  return (
  	<QueryClientProvider client={queryClient}>
    <ChakraProvider>
    <LoadingProgressProvider>
     <Layout>
      <Component {...pageProps} />
      </Layout>
      </LoadingProgressProvider>
    </ChakraProvider>
    
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
