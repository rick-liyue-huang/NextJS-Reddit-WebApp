import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "../chakra/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // put the whole project in Chakra-ui library
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
