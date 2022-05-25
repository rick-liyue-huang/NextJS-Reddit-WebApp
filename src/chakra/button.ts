import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const ButtonComponent: ComponentStyleConfig = {
	baseStyle: {
		borderRadius: "60px",
		fontSize: "10pt",
		fontWeight: 700,
		_focus: {
			boxShadow: "none",
		},
	},
	sizes: {
		sm: {
			fontSize: "8pt",
		},
		md: {
			fontSize: "10pt",
			// height: "28px",
		},
	},
	variants: {
		solid: {
			color: "white",
			bg: "green.400",
			_hover: {
				bg: "green.400",
			},
		},
		outline: {
			color: "green.400",
			border: "1px solid",
			borderColor: "green.400",
		},
		oauth: {
			height: "34px",
			border: "1px solid",
			borderColor: "gray.300",
			_hover: {
				bg: "gray.50",
			},
		},
	},
};
