import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {RecoilRoot} from "recoil";
import theme from "../chakra/theme";
import LayoutComponent from "../components/Layout/Layout";

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
