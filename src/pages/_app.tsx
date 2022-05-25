import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import {theme} from "../chakra/theme";
import LayoutComponent from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // manage the global statement in recoil
    <RecoilRoot>
      {/* put the whole project in Chakra-ui library*/}
      <ChakraProvider theme={theme}>
        {/* layout the whole project by adding navbar */}
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
