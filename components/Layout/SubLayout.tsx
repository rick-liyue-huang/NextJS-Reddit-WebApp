import { Flex, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SubLayout: React.FC<Props> = ({ children }) => {
  // console.log(children);
  const bg = useColorModeValue('white', 'gray.600');

  return (
    <Flex justify={'center'} p="16px 0" bg={bg}>
      <Flex width={'95%'} justify="center" maxWidth="860px">
        {/* LHS */}
        <Flex
          direction={'column'}
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          direction={'column'}
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
