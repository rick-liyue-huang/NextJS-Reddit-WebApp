import React from 'react';
import {Button} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

const AuthButtonsComponent: React.FC = () => {

	const setAuthModalState = useSetRecoilState(authModalState)
	return (
		<>
			<Button
				variant={'outline'} height={'28px'}
				display={{base: 'none', sm: 'flex'}}
				width={{base: '70px', md: '110px'}}
				mr={2}
				onClick={() => setAuthModalState({open: true, view: 'login'})}
			>Login</Button>
			<Button
				height={'28px'}
				display={{base: 'none', sm: 'flex'}}
				width={{base: '70px', md: '110px'}}
				onClick={() => setAuthModalState({open: true, view: 'register'})}
			>Register</Button>
		</>
	);
};

export default AuthButtonsComponent;
