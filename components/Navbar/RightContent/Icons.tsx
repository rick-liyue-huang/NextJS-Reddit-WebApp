import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BsArrowRightCircle, BsChatDots } from 'react-icons/bs';
import {
  IoAddSharp,
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOffOutline,
} from 'react-icons/io5';

export const IconsComponent: React.FC = () => {
  const color = useColorModeValue('gray.600', 'white');

  return (
    <Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        borderRight={'1px solid'}
        borderColor="gray.200"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={BsArrowRightCircle} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={IoVideocamOffOutline} fontSize={20} />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={BsChatDots} fontSize={21} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
          display={{ base: 'none', md: 'flex' }}
        >
          <Icon as={IoAddSharp} fontSize={22} />
        </Flex>
      </>
    </Flex>
  );
};
