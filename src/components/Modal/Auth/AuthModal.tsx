import React from 'react';
import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ModalFooter, ModalBody} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

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
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						here is modal body
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
};

export default AuthModalComponent;
