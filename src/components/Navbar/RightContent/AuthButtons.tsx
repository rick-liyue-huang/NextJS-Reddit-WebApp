import React from 'react';
import {Button} from "@chakra-ui/react";

const AuthButtons: React.FC = () => {
	return (
		<>
			<Button
				variant={'outline'} height={'28px'}
				display={{base: 'none', sm: 'flex'}}
				width={{base: '70px', md: '110px'}}
				mr={2}
				// onClick={}
			>Login</Button>
			<Button
				height={'28px'}
				display={{base: 'none', sm: 'flex'}}
				width={{base: '70px', md: '110px'}}
				// onClick={}
			>Register</Button>
		</>
	);
};

export default AuthButtons;
