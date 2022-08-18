import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

export const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant={'outline'}
        width={{ base: '70px', md: '110px' }}
        height="28px"
        mr={2}
        onClick={() => {
          setAuthModalState((prev) => ({
            ...prev,
            open: true,
            view: 'login',
          }));
        }}
        display={{ base: 'none', sm: 'flex' }}
      >
        Log In
      </Button>
      <Button
        width={{ base: '70px', md: '110px' }}
        height="28px"
        mr={2}
        onClick={() => {
          setAuthModalState((prev) => ({
            ...prev,
            open: true,
            view: 'signup',
          }));
        }}
        display={{ base: 'none', sm: 'flex' }}
      >
        Sign Up
      </Button>
    </>
  );
};
