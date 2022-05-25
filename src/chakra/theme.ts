// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aclonica"
import {ButtonComponent} from "./button";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		brand: {
			100: "#48BB78",
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
		Button: ButtonComponent
	}
})
