import {
  Button,
  Flex,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { Recommendation } from '../../components/Community/Recommendation';
import { SubLayout } from '../../components/Layout/SubLayout';
import { AccountManagement } from '../../components/Premium/AccountManagement';
import { auth } from '../../firebase/clientConfig';
import { useSubscription } from '../../hooks/useSubscription';
import { loadCheckout, payments } from '../../stripe';

interface Props {
  products: Product[];
}
const PlanPage: NextPage<Props> = ({ products }) => {
  const bg = useColorModeValue('white', 'gray.600');
  const color = useColorModeValue('blue.500', 'white');
  const { toggleColorMode } = useColorMode();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[0]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  // get the current subed plan under current user,
  const { subscription } = useSubscription(user as User);

  console.log('subscription: ', subscription);

  // console.log('selectedPan : ', selectedPlan);

  // console.log('products: ', products);

  const handleToSubscription = async () => {
    try {
      if (!user) {
        setAuthModalState((prev) => ({
          ...prev,
          open: true,
          view: 'login',
        }));
        return;
      }

      // match the plan price to connect with stripe.com
      loadCheckout(selectedPlan?.prices[0].id!);
      setIsBillingLoading(true);
    } catch (err) {
      console.log(`handleToSubscription error: ${err}`);
    }
  };

  return (
    <div>
      <Head>
        <title>Reddit Plan</title>
      </Head>
      <SubLayout>
        <>
          <Flex direction={'column'} justify={'center'} align="center" mt={6}>
            <Text
              fontWeight={900}
              fontSize="16pt"
              mb={6}
              color={color}
              // bg={'green.200'}
              width="full"
              textAlign={'center'}
              borderRadius="full"
            >
              Plans Details
            </Text>
            <Text fontSize={'10pt'} fontWeight={300}>
              Select what you like!
            </Text>
          </Flex>

          <TableContainer>
            <Table>
              <TableCaption>
                <Stack spacing={0.5} fontWeight={200}>
                  <Text>Watch all you want, Ad-free</Text>
                  <Text>Recommendation just for you</Text>
                  <Text>Change or cancel your plan anytime</Text>
                </Stack>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th fontWeight={800}>Plan</Th>
                  <Th>Monthly price</Th>
                  <Th>Video quality</Th>
                  <Th>Resolution</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr
                    key={product.name}
                    bg={
                      selectedPlan?.id === product.id ? 'green.300' : 'gray.100'
                    }
                    color={
                      selectedPlan?.id === product.id
                        ? 'orange.500'
                        : 'green.500'
                    }
                    onClick={() => setSelectedPlan(product)}
                  >
                    <Td fontWeight={600}>{product.name}</Td>
                    <Td>AUD{product.prices[0].unit_amount! / 100}</Td>
                    <Td>{product.metadata.videoQuality}</Td>
                    <Td>{product.metadata.resolution}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            disabled={!selectedPlan || isBillingLoading}
            onClick={handleToSubscription}
          >
            {isBillingLoading ? <Spinner size="sm" /> : <>Subscribe Plan</>}
          </Button>
        </>
        <Stack spacing={3} bg={bg}>
          {/* Recommendation */}
          <Button onClick={toggleColorMode}>Toggle Mode</Button>
          <Recommendation />
          <AccountManagement />
        </Stack>
      </SubLayout>
    </div>
  );
};

export default PlanPage;

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
