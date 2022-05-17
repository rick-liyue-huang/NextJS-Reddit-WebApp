import React, {useEffect} from 'react';
import {Flex} from "@chakra-ui/react";
import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ModalFooter, ModalBody, Text} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputsComponent from "./AuthInputs";
import OAuthButtonsComponent from "./OAuthButtons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import ResetPasswordComponent from "./ResetPassword";


const AuthModalComponent: React.FC = () => {
	// const { isOpen, onOpen, onClose } = useDisclosure()

	const [modalState, setModalState] = useRecoilState(authModalState);
	const [user, loading, error] = useAuthState(auth)

	const handleClose = () => {
		setModalState(prev => ({
			...prev,
			open: false
		}))
	}

	useEffect(() => {
		if (user) handleClose();
		console.log('user: ', user)
	}, [user]);

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>
						{modalState.view === 'login' && 'LOGIN'}
						{modalState.view === 'register' && 'REGISTER'}
						{modalState.view === 'resetPassword' && 'RESET PASSWORD'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display={'flex'} flexDirection={'column'} pb={5}
						alignItems={'center'} justifyContent={'center'}
					>
						<Flex flexDirection={'column'} align={'center'} justify={'center'} width={'70%'} >

							{
								modalState.view === 'login' || modalState.view === 'register'
									? (
										<>
											<OAuthButtonsComponent />
											<Text color={'gray.200'} fontWeight={600}>OR</Text>
											<AuthInputsComponent />
										</>
									) : <ResetPasswordComponent />
							}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
};

export default AuthModalComponent;
