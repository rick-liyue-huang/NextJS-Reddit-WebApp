import React from 'react';
import {Button} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../atoms/authModalAtom";

const AuthButtonsComponent: React.FC = () => {
	// define the method to change the state
	const setAuthModalState = useSetRecoilState(authModalState);
	return (
		<>
			<Button
				variant={'outline'} mr={2} h={'28px'} w={{base: '70px', md: '110px'}}
				display={{base: 'none', sm: 'flex' }}
				onClick={() => setAuthModalState(prev => ({
					...prev, open: true, view: 'login'
				}))}
			>LOGIN</Button>
			<Button
				mr={2} h={'28px'} w={{base: '70px', md: '110px'}}
				display={{base: 'none', sm: 'flex' }}
				onClick={() => setAuthModalState(prev => ({
					...prev, open: true, view: 'register'
				}))}
			>REGISTER</Button>
		</>
	);
};

export default AuthButtonsComponent;
