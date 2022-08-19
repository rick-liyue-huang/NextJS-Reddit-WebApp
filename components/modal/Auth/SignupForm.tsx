import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { FIREBASE_AUTH_ERRORS } from '../../../firebase/authErrors';
import { auth } from '../../../firebase/clientConfig';

export const SignUpComponent: React.FC = () => {
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signupError, setsignupError] = useState('');
  const setAuthModalState = useSetRecoilState(authModalState);

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupError) setsignupError('');
    if (signupForm.email && signupForm.password) {
      if (signupForm.password !== signupForm.confirmPassword) {
        setsignupError('Passwords do not match');
        return;
      }
      await createUserWithEmailAndPassword(
        signupForm.email,
        signupForm.password
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSignupForm((prev) => ({
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
        minLength={6}
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
        _focus={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirm your password"
        mb={2}
        type="password"
        required
        minLength={6}
        onChange={handleChange}
        fontSize="10pt"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
        _focus={{ bg: 'white', border: '1px solid', borderColor: 'green.500' }}
      />
      {(signupError || userError) && (
        <Text textAlign={'center'} color="red" fontSize={'10pt'}>{`${
          signupError ||
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
        Sign Up
      </Button>
      <Flex fontSize={'9pt'} justifyContent="center">
        <Text>Already a redditor? </Text>
        <Text
          ml={2}
          color="green.500"
          fontWeight={'700'}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
              open: true,
            }))
          }
        >
          Login In
        </Text>
      </Flex>
    </form>
  );
};
