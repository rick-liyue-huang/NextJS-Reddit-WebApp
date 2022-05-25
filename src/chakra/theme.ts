// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aclonica"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		brand: {
			100: "#38A169",
		},
	},
	fonts: {
		body: 'Aclonica, sans-serif'
	},
	styles: {
		global: () => ({
			body: {
				bg: 'teal.50'
			}
		})
	},
	components: {
		// Button
	}
})
