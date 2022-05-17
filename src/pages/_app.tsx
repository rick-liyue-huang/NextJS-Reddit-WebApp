import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
// import the theme in global
import {theme} from "../chakra/theme";
import LayoutComponent from "../components/Layout/Layout";
// config the global state management
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
