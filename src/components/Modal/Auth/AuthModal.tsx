import React from 'react';
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

const AuthModalComponent: React.FC = () => {

	const [modalState, setModalState] = useRecoilState(authModalState);

	// close the modal by setting 'open' as false
	const handleModalClose = () => {
		setModalState(prev => ({
			...prev,
			open: false
		}))
	}

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
							<OAuthButtonsComponent />
							<Text color={'gray.300'}>OR</Text>
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
