import { Button } from '@chakra-ui/react';
import React from 'react';

export const AuthButtons: React.FC = () => {
  return (
    <>
      <Button
        variant={'outline'}
        width={{ base: '70px', md: '110px' }}
        height="28px"
        mr={2}
        onClick={() => {}}
        display={{ base: 'none', sm: 'flex' }}
      >
        Log In
      </Button>
      <Button
        width={{ base: '70px', md: '110px' }}
        height="28px"
        mr={2}
        onClick={() => {}}
        display={{ base: 'none', sm: 'flex' }}
      >
        Sign Up
      </Button>
    </>
  );
};
