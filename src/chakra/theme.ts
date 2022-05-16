
import '@fontsource/open-sans/greek-ext-500-italic.css'
import { extendTheme } from "@chakra-ui/react"
import {ButtonComponent} from "./Button";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		brand: {
			100: "#81E6D9",
		},
	},
	fonts: {
		body: "Open Sans, sans-serif"
	},
	styles: {
		global: () => ({
			body: {
				bg: 'green.50'
			}
		})
	},
	components: {
		Button: ButtonComponent
	}
});

export default theme
