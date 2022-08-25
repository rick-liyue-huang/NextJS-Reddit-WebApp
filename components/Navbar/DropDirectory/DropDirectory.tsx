import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { useDropDirectory } from '../../../hooks/useDropDirectory';
import { CommunitiesComponent } from './CommunitiesComponent';

interface Props {
  user?: User | null;
}

export const DropDirectory: React.FC<Props> = ({ user }) => {
  const { directoryState, handleToggleCommunityMenuOpen } = useDropDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      {user ? (
        <>
          <MenuButton
            cursor={'pointer'}
            padding="0px 6px"
            borderRadius={4}
            _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={handleToggleCommunityMenuOpen}
          >
            <Flex
              align={'center'}
              justify="space-between"
              width={{ base: 'auto', lg: '200px' }}
            >
              <Flex align="center">
                {directoryState.selectedMenu.imageUrl ? (
                  <Image
                    src={directoryState.selectedMenu.imageUrl}
                    alt="community image"
                    borderRadius={'full'}
                    boxSize="24px"
                    mr={2}
                  />
                ) : (
                  <Icon
                    fontSize={24}
                    mr={{ base: 1, md: 2 }}
                    as={directoryState.selectedMenu.icon}
                    color={directoryState.selectedMenu.iconColor}
                  />
                )}

                <Flex display={{ base: 'none', lg: 'flex' }}>
                  <Text fontSize="10pt" fontWeight={600}>
                    {directoryState.selectedMenu.displayName}
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
        // TODO add some logic on popular on sign out
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
