import "../core/assets/styles/globals.css"
import "../core/assets/styles/main.css"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as Provisioner }  from "react-redux";
import QReduxStore from "../core/redux/store";

export default function App({ Component, pageProps }) {
    return (

   <>
     {/*REDUX STATE ENHANCER*/}
    <Provisioner store={QReduxStore}>
          <ChakraProvider>
                  <Component {...pageProps} />
            </ChakraProvider>
    </Provisioner>
  </>
    
    )
  }




