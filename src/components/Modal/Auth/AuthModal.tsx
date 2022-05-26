import React, {useEffect} from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader} from "@chakra-ui/modal";
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputsComponent from "./AuthInputs";
import OAuthButtonsComponent from "./OAuthButtons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";


const AuthModalComponent: React.FC = () => {
	// using the custom recoil state to manage modal open and display content
	const [modalState, setModalState] = useRecoilState(authModalState);
	// confirm the user login or registered
	const [user, loading, error] = useAuthState(auth);

	const handleModalClose = () => {
		setModalState(prev => ({
			...prev,
			open: false
		}))
	};

	useEffect(() => {
		if (user) handleModalClose();
		console.log('user: ', user);
	}, [user]);

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'} color={'brand.100'}>
						{modalState.view === 'login' && 'LOGIN'}
						{modalState.view === 'register' && 'REGISTER'}
						{modalState.view === 'resetPassword' && 'RESET PASSWORD'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display='flex' flexDirection={'column'}
						alignItems={'center'} justifyContent={'center'}
					>
						<Flex
							direction={'column'} align={'center'} justify={'center'}
							w={'80%'}
						>
							<OAuthButtonsComponent />
							<Text color={'gray.300'} fontWeight={500}>OR</Text>
							<AuthInputsComponent />
							{/*<ResetPassword />*/}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
};

export default AuthModalComponent;
