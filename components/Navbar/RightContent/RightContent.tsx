import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AuthButtons } from './AuthButtons';

interface Props {}

export const RightContent: React.FC<Props> = () => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify={'center'} align={'center'}>
        {/* <AuthButtons /> */}
        <AuthButtons />
      </Flex>
    </>
  );
};
