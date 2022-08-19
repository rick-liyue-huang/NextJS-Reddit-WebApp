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
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientConfig';
import { AuthInputs } from './AuthInputs';
import { OAuthButtons } from './OAuthButtons';
import { ResetPasswordForm } from './ResetPasswordForm';

export const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleCloseModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) {
      handleCloseModal();
      console.log(user);
    }
  }, [user]);

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
              {modalState.view === 'signup' || modalState.view === 'login' ? (
                <>
                  {/* <OAuthButtons /> */}
                  <OAuthButtons />
                  <Text color="gray.500" fontWeight={700}>
                    OR
                  </Text>
                  {/* <AuthInputs /> */}
                  <AuthInputs />
                </>
              ) : (
                <>
                  {/* <ResetPassword /> */}
                  <ResetPasswordForm />
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
