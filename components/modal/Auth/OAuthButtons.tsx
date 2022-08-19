import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase/clientConfig';

export const OAuthButtons: React.FC = () => {
  const [signWithGoogle, userCred, loading, userError] =
    useSignInWithGoogle(auth);

  //  create the users collection from authentication
  const handleCreateUserDocument = async (user: User) => {
    await setDoc(doc(db, 'users', user.uid), JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      handleCreateUserDocument(userCred.user);
    }
  }, [userCred]);

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
