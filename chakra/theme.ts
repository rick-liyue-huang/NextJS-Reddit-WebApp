// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans/300.css'; // import from chakra-ui font
import '@fontsource/open-sans/700.css';
import '@fontsource/raleway/400.css';
import { Button } from './button';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: '#ff3c00', //reddit red
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'green.50', // check by default theme in chakra-ui
      },
    }),
  },
  components: {
    // add custom component style here
    Button,
  },
});
