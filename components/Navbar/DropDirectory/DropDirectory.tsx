import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { ImHome } from 'react-icons/im';
import { CommunitiesComponent } from './CommunitiesComponent';

interface Props {
  user?: User | null;
}

export const DropDirectory: React.FC<Props> = ({ user }) => {
  return (
    <Menu>
      {user ? (
        <>
          <MenuButton
            cursor={'pointer'}
            padding="0px 6px"
            borderRadius={4}
            _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
            mr={2}
            ml={{ base: 0, md: 2 }}
          >
            <Flex
              align={'center'}
              justify="space-between"
              width={{ base: 'auto', lg: '200px' }}
            >
              <Flex align="center">
                <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={ImHome} />
                <Flex display={{ base: 'none', lg: 'flex' }}>
                  <Text fontSize="10pt" fontWeight={600}>
                    Home
                  </Text>
                </Flex>
              </Flex>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            {/* <CommunitiesModal /> */}
            <CommunitiesComponent />
          </MenuList>
        </>
      ) : (
        <MenuButton
          cursor={'pointer'}
          padding="0px 6px"
          borderRadius={4}
          _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
          mr={2}
          ml={{ base: 0, md: 2 }}
        >
          <Flex
            align={'center'}
            justify="space-between"
            width={{ base: 'auto', lg: '200px' }}
          >
            <Flex align="center">
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={BsArrowUpRightCircleFill}
              />
              <Flex display={{ base: 'none', lg: 'flex' }}>
                <Text fontSize="10pt" fontWeight={600}>
                  Popular
                </Text>
              </Flex>
            </Flex>
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
      )}
    </Menu>
  );
};
