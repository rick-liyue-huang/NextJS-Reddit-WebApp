import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GiCheckedShield } from 'react-icons/gi';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { auth } from '../../firebase/clientConfig';
import { useSubscription } from '../../hooks/useSubscription';

export const PremiumComponent: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.600');
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const { subscription } = useSubscription(user as User);

  console.log('user: ', user);

  const handleLocateStripe = () => {
    if (!user) {
      setAuthModalState((prev) => ({
        ...prev,
        open: true,
        view: 'login',
      }));
      return;
    }

    router.push('/plans');
  };
  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="green.500" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>Reddit Premium</Text>
          <Text>The best Reddit experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      {subscription ? (
        <Button
          height="30px"
          bg="orange.300"
          onClick={() => router.push('/plans/management')}
        >
          Plan Details
        </Button>
      ) : (
        <Button height="30px" bg="orange.300" onClick={handleLocateStripe}>
          Try Now
        </Button>
      )}
    </Flex>
  );
};
