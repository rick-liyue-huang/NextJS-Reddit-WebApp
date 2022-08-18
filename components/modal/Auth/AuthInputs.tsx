import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { LoginComponent } from './LoginForm';
import { SignUpComponent } from './SignupForm';

export const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction={'column'} align="center" width="100%" mt={4}>
      {/* <Login /> */}
      {modalState.view === 'login' && <LoginComponent />}
      {/* <SignUp /> */}
      {modalState.view === 'signup' && <SignUpComponent />}
    </Flex>
  );
};
