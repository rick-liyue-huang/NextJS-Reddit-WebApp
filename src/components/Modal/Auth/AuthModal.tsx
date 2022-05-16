import React from 'react';
import {Flex} from "@chakra-ui/react";
import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ModalFooter, ModalBody, Text} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputsComponent from "./AuthInputs";
import OAuthButtonsComponent from "./OAuthButtons";


const AuthModalComponent: React.FC = () => {
	// const { isOpen, onOpen, onClose } = useDisclosure()

	const [modalState, setModalState] = useRecoilState(authModalState);

	const handleClose = () => {
		setModalState(prev => ({
			...prev,
			open: false
		}))
	}

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
							<OAuthButtonsComponent />
							<Text color={'gray.200'} fontWeight={600}>OR</Text>
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
