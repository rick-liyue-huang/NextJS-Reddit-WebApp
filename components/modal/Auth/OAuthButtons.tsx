import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientConfig';

export const OAuthButtons: React.FC = () => {
  const [signWithGoogle, user, loading, userError] = useSignInWithGoogle(auth);

  return (
    <Flex direction={'column'} width="100%" mb={4}>
      <Button
        variant={'oauth'}
        mb={2}
        isLoading={loading}
        onClick={() => signWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={6} />
        <Text>Continue with Google</Text>
      </Button>
      <Button variant={'oauth'} mb={2}>
        <Image src="/images/applelogo.png" height="20px" mr={6} />
        <Text>Continue with Apple</Text>
      </Button>

      {userError && <Text>{userError.message}</Text>}
    </Flex>
  );
};
