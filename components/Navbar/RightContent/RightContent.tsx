import { Button, Flex } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/clientConfig';
import { AuthModal } from '../../modal/Auth/AuthModal';
import { AuthButtons } from './AuthButtons';

interface Props {
  user: any;
}

export const RightContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <AuthModal />
      <Flex justify={'center'} align={'center'}>
        {/* <AuthButtons /> */}
        {user ? (
          <Button onClick={() => signOut(auth)}>Log Out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
