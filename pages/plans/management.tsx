import {
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PersonalComponent } from '../../components/Community/PersonalComponent';
import { Recommendation } from '../../components/Community/Recommendation';
import { SubLayout } from '../../components/Layout/SubLayout';
import { auth } from '../../firebase/clientConfig';
import { useSubscription } from '../../hooks/useSubscription';
import { payments } from '../../stripe';

interface Props {
  products: Product[];
}

const ManagementPage: NextPage<Props> = ({ products }) => {
  const bg = useColorModeValue('white', 'gray.600');
  const color = useColorModeValue('blue.500', 'white');
  const { toggleColorMode } = useColorMode();
  const [user] = useAuthState(auth);
  const { subscription } = useSubscription(user as User);

  return (
    <div>
      <Head>
        <title>Plan Management</title>
      </Head>
      <SubLayout>
        <>
          <Text>Current Plan</Text>
          member since {subscription?.created}
          <Flex>
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </Flex>
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
