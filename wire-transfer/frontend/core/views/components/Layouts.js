import { ReactElement, useEffect } from 'react'
import { Box,Flex } from '@chakra-ui/react'
import Router from 'next/router'
import { useLoadingProgress } from './SkeletonLoader'


import Head from "next/head";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";

import useNetwork from "../../helpers/hooks/useNetwork";
import usePageReady from "../../helpers/hooks/usePageReady";

const Layout = ({ SEO,children, ...props }) => {
  const { start, done } = useLoadingProgress()

  const onRouteChangeStart = () => {
    start()
  }

  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }


  const network = useNetwork();
  const ready = usePageReady();
 console.log(network.isOnline)

  useEffect(() => {
    network.displayToast();
  }, [network.isOnline]);

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

    <>

      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    


     <Flex as="main" flexDir="column" minH="100vh">
        {/* This component is for SEO reasons */}
        {SEO && <NextSeo {...SEO} />}

        {/* When the page full control has been handed over to the Client? that when the Content should be loaded */}
        {ready && (
          <>
            <Box  {...props}>
               {children}
             </Box>
          </>
        )}
      </Flex>

    </>
  )
}

export default Layout