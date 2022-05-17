// Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import '@fontsource/open-sans/500-italic.css'

// Call `extendTheme` and pass your custom values
// define the global style
export const theme = extendTheme({
	// define some special color
	colors: {
		brand: {
			100: "#81E6D9",
		},
	},
	// define the global fonts
	fonts: {
		body: 'Open Sans, sans-serif'
	},
	// define global styles
	styles: {
		global: () => ({
			body: {
				bg: 'green.50'
			}
		}),
		// define some special Component
		components: {
			// Button
		}
	}
});



