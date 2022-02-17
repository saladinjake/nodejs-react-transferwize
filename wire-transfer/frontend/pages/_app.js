
import "../core/assets/styles/globals.css"
import "../core/assets/styles/main.scss"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react";
export default function App({ Component, pageProps }) {
    return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    )
  }




