import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { AuthInputs } from './AuthInputs';
import { OAuthButtons } from './OAuthButtons';

export const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleCloseModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            {modalState.view === 'login' && 'LOG IN'}
            {modalState.view === 'signup' && 'SIGN UP'}
            {modalState.view === 'resetPassword' && 'RESET PASSWORD'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDirection="column"
            alignItems={'center'}
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align={'center'}
              justify="center"
              width="70%"
            >
              {/* <OAuthButtons /> */}
              <OAuthButtons />
              <Text color="gray.500" fontWeight={700}>
                OR
              </Text>
              {/* <AuthInputs /> */}
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
