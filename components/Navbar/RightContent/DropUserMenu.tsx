import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from 'react-icons/fa';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { IoSparkles } from 'react-icons/io5';
import { MdOutlineLogin, MdOutlineLogout } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { communityState } from '../../../atoms/communityAtom';
import { auth } from '../../../firebase/clientConfig';

interface Props {
  user?: User | null;
}

export const DropUserMenu: React.FC<Props> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const resetCommunityState = useResetRecoilState(communityState);
  const { toggleColorMode } = useColorMode();

  const handleSignOut = async () => {
    await signOut(auth);
    // clear community state
    // change here to deal with the joined status after sign out
    // resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor={'pointer'}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex align={'center'}>
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="red.300"
                  as={FaRedditSquare}
                />
                <Flex
                  direction="column"
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split('@')[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={'10pt'}
              fontWeight={700}
              _hover={{ bg: 'green.500', color: 'white' }}
              onClick={toggleColorMode}
            >
              <Flex align="center" cursor="pointer">
                <Icon fontSize={20} mr={2} as={HiSwitchHorizontal} />
                Toggle Mode
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={'10pt'}
              fontWeight={700}
              _hover={{ bg: 'green.500', color: 'white' }}
              onClick={handleSignOut}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogout} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize={'10pt'}
            fontWeight={700}
            _hover={{ bg: 'green.500', color: 'white' }}
            onClick={() => setAuthModalState({ open: true, view: 'login' })}
          >
            <Flex align="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log In / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
