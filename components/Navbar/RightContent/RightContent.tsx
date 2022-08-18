import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AuthModal } from '../../modal/Auth/AuthModal';
import { AuthButtons } from './AuthButtons';

interface Props {}

export const RightContent: React.FC<Props> = () => {
  return (
    <>
      {/* <AuthModal /> */}
      <AuthModal />
      <Flex justify={'center'} align={'center'}>
        {/* <AuthButtons /> */}
        <AuthButtons />
      </Flex>
    </>
  );
};
