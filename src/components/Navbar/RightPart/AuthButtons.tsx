import React from 'react';
import {Button} from "@chakra-ui/react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

const AuthButtonsComponent: React.FC	= () => {

	// get modal from global recoil state
	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<>
			<Button
				variant={'outline'} h={'28px'}
				display={{base: 'none', sm: 'flex'}}
				w={{base: '70px', md: '110px'}}
				mr={2}
				onClick={() => setAuthModalState({
					open: true, view: 'login'
				})}
			>Login</Button>
			<Button
				display={{base: 'none', sm: 'flex'}}
				w={{base: '70px', md: '110px'}}
				mr={2} h={'28px'}
				onClick={() => setAuthModalState({
					open: true, view: 'register'
				})}
			>Register</Button>
		</>
	);
};

export default AuthButtonsComponent;
