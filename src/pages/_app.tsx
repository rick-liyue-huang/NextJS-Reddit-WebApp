import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import theme from "../chakra/theme";
import LayoutComponent from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>

    </ChakraProvider>
  )
}

export default MyApp
