import React from 'react';
import {Button} from "@chakra-ui/react";

const AuthButtonsComponent: React.FC	= () => {
	return (
		<>
			<Button
				variant={'outline'} h={'28px'}
				display={{base: 'none', sm: 'flex'}}
				w={{base: '70px', md: '110px'}}
				mr={2}
				onClick={() => {}}
			>Login</Button>
			<Button
				display={{base: 'none', sm: 'flex'}}
				w={{base: '70px', md: '110px'}}
				mr={2} h={'28px'}
				onClick={() => {}}
			>Register</Button>
		</>
	);
};

export default AuthButtonsComponent;
