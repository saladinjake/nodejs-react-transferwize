import { ReactElement, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Router from 'next/router'
import { useLoadingProgress } from './SkeletonLoader'



const Layout = ({ children, ...props }) => {
  const { start, done } = useLoadingProgress()

  const onRouteChangeStart = () => {
    start()
  }

  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.events.off('routeChangeError', onRouteChangeComplete)
    }
  }, [])

  return (
    <Box  {...props}>
      {children}
    </Box>
  )
}

export default Layout