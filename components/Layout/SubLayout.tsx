import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SubLayout: React.FC<Props> = ({ children }) => {
  console.log(children);

  return (
    <Flex border="1px solid red" justify={'center'} p="16px 0">
      <Flex
        border="1px solid blue"
        width={'95%'}
        justify="center"
        maxWidth="860px"
      >
        {/* LHS */}
        <Flex
          border="1px solid green"
          direction={'column'}
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          border="1px solid orange"
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
