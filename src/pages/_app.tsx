import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "../chakra/theme";
import LayoutComponent from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // put the whole project in Chakra-ui library
    <ChakraProvider theme={theme}>
      {/* layout the whole project by adding navbar */}
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>

    </ChakraProvider>
  )
}

export default MyApp
