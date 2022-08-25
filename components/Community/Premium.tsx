import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { GiCheckedShield } from 'react-icons/gi';

export const PremiumComponent: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.600');

  const handleLocateStripe = () => {};
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
      <Button height="30px" bg="orange.300" onClick={handleLocateStripe}>
        Try Now
      </Button>
    </Flex>
  );
};
