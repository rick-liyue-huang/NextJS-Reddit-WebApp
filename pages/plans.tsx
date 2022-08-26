import {
  Button,
  Flex,
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
import { NextPage } from 'next';
import Head from 'next/head';
import { PersonalComponent } from '../components/Community/PersonalComponent';
import { Recommendation } from '../components/Community/Recommendation';
import { SubLayout } from '../components/Layout/SubLayout';

const PlanPage: NextPage = () => {
  const bg = useColorModeValue('white', 'gray.600');
  const { toggleColorMode } = useColorMode();

  return (
    <div>
      <Head>
        <title>Reddit Plan</title>
      </Head>
      <SubLayout>
        <>
          <Flex direction={'column'} justify={'center'} align="center" mt={2}>
            <Text fontWeight={900} fontSize="16pt" mb={2} color="teal">
              Plans Details
            </Text>
            <Text fontSize={'10pt'} fontWeight={300}>
              Select what you like!
            </Text>
          </Flex>

          <TableContainer>
            <Table variant="striped" colorScheme="teal">
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
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight={600} color="orange.500">
                    Basic
                  </Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={600} color="green.500">
                    Standard
                  </Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={600} color="orange.500">
                    Premium
                  </Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
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

export default PlanPage;
