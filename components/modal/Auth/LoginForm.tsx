import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { FIREBASE_AUTH_ERRORS } from '../../../firebase/authErrors';
import { auth } from '../../../firebase/clientConfig';

export const LoginComponent: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        placeholder="Enter your email"
        mb={2}
        type="email"
        required
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
        _focus={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
      />
      <Input
        name="password"
        placeholder="Enter your password"
        mb={2}
        type="password"
        required
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
        _focus={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
      />
      {userError && (
        <Text textAlign={'center'} color="red" fontSize={'10pt'}>{`${
          FIREBASE_AUTH_ERRORS[
            userError?.message as keyof typeof FIREBASE_AUTH_ERRORS
          ]
        }`}</Text>
      )}
      <Button
        width={'100%'}
        height="30px"
        type="submit"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Login In
      </Button>
      <Flex fontSize={'9pt'} justifyContent="center">
        <Text>Forget password? </Text>
        <Text
          ml={2}
          color="green.500"
          fontWeight={'700'}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'resetPassword',
              open: true,
            }))
          }
        >
          Reset Password
        </Text>
      </Flex>
      <Flex fontSize={'9pt'} justifyContent="center">
        <Text>New to Reddit? </Text>
        <Text
          ml={2}
          color="green.500"
          fontWeight={'700'}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
              open: true,
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
