import React, {useEffect} from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Flex,
	ModalBody,
	ModalCloseButton,
	Text
} from '@chakra-ui/react'
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputsComponent from "./AuthInputs";
import OAuthButtonsComponent from "./OAuthButtons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import ResetPasswordComponent from "./ResetPassword";

const AuthModalComponent: React.FC = () => {

	const [modalState, setModalState] = useRecoilState(authModalState);

	/**
	 * @define confirm the authentication with firebase
	 */
	const [user, loading, error] = useAuthState(auth);

	// close the modal by setting 'open' as false
	const handleModalClose = () => {
		setModalState(prev => ({
			...prev,
			open: false
		}))
	}

	useEffect(() => {
		// login or register successfully then close modal
		if (user) handleModalClose();
		console.log('user: ', user?.email)
	}, [user])

	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>
						{modalState.view === 'login' && 'LOGIN'}
						{modalState.view === 'register' && 'REGISTER'}
						{modalState.view === 'resetPassword' && 'RESET PASSWORD'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display={'flex'} flexDirection={'column'}
						alignItems={'center'} justifyContent={'center'} pb={6}
					>
						<Flex
							direction={'column'} align={'center'} justify={'center'}
						>
							{
								(modalState.view === 'login' || modalState.view === 'register') ?
									(<>
										<OAuthButtonsComponent />
										<Text color={'gray.300'}>OR</Text>
										<AuthInputsComponent />
									</>) :
									<ResetPasswordComponent />
							}

						</Flex>
					</ModalBody>

				</ModalContent>
			</Modal>
		</>
	)
};

export default AuthModalComponent;
