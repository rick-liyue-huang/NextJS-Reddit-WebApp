import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

export const LoginComponent: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleSubmit = () => {};

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
      <Button width={'100%'} height="30px" type="submit" mt={2} mb={2}>
        Login In
      </Button>
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
