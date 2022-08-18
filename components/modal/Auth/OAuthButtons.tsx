import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export const OAuthButtons: React.FC = () => {
  return (
    <Flex direction={'column'} width="100%" mb={4}>
      <Button variant={'oauth'} mb={2}>
        <Image src="/images/googlelogo.png" height="20px" mr={6} />
        <Text>Continue with Google</Text>
      </Button>
      <Button variant={'oauth'} mb={2}>
        <Image src="/images/applelogo.png" height="20px" mr={6} />
        <Text>Continue with Apple</Text>
      </Button>
    </Flex>
  );
};
