import {
  Button,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PersonalComponent } from '../../components/Community/PersonalComponent';
import { Recommendation } from '../../components/Community/Recommendation';
import { SubLayout } from '../../components/Layout/SubLayout';
import { auth } from '../../firebase/clientConfig';
import { useSubscription } from '../../hooks/useSubscription';
import { handleToBillingPortal, payments } from '../../stripe';

interface Props {
  products: Product[];
}

const ManagementPage: NextPage<Props> = ({ products }) => {
  const bg = useColorModeValue('white', 'gray.600');
  const color = useColorModeValue('blue.500', 'white');
  const { toggleColorMode } = useColorMode();
  const [user] = useAuthState(auth);
  const { subscription } = useSubscription(user as User);
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = () => {
    if (subscription) {
      setLoading(true);
      handleToBillingPortal();
    }
  };

  return (
    <div>
      <Head>
        <title>Plan Management</title>
      </Head>
      <SubLayout>
        <>
          <Stack
            spacing={3}
            display="flex"
            direction={'column'}
            justify="center"
            align={'center'}
            border="1px solid"
            borderRadius={'4px'}
            borderColor="gray.300"
            mt={6}
            pt={3}
            pb={6}
          >
            <Text fontWeight={800} fontSize="16pt">
              Current Plan
            </Text>
            <Text> member since {subscription?.created}</Text>
            <Text fontSize={'14pt'} fontWeight={600} color="orange.400">
              {
                products.filter(
                  (product) => product.id === subscription?.product
                )[0]?.name
              }
            </Text>
            <Text color={color}>User: {user?.email}</Text>
            <Text fontWeight={300} fontSize="10pt">
              End on: {subscription?.current_period_end}
            </Text>
            <Button
              height={'34px'}
              onClick={handleManageSubscription}
              disabled={loading}
              width="80%"
            >
              Change Plan
            </Button>
          </Stack>
        </>
        <Stack spacing={3} bg={bg}>
          {/* Recommendation */}
          <Button onClick={toggleColorMode}>Toggle Mode</Button>
          <Recommendation />
          <PersonalComponent />
        </Stack>
      </SubLayout>
    </div>
  );
};

export default ManagementPage;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((err) => console.log(err.message));
  return {
    props: {
      products: products as Product[],
    },
  };
};
