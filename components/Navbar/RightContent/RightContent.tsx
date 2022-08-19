import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { AuthModal } from '../../modal/Auth/AuthModal';
import { AuthButtons } from './AuthButtons';
import { DropUserMenu } from './DropUserMenu';
import { IconsComponent } from './Icons';

interface Props {
  user?: User | null;
}

export const RightContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <AuthModal />
      <Flex justify={'center'} align={'center'}>
        {/* <AuthButtons /> */}
        {user ? <IconsComponent /> : <AuthButtons />}
        {/* <DropUserMenu /> */}
        <DropUserMenu user={user} />
      </Flex>
    </>
  );
};
