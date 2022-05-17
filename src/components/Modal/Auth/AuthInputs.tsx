import React from 'react';
import {Flex} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

const AuthInputsComponent: React.FC = () => {

	const modalState = useRecoilValue(authModalState);
	return (
		<Flex
			direction={'column'} align={'center'}
			width={'100%'} mt={4}
		>
			{modalState.view === 'login' && <LoginComponent />}
			{modalState.view === 'register' && <RegisterComponent />}

		</Flex>
	);
};

export default AuthInputsComponent;
