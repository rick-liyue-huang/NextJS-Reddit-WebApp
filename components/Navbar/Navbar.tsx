import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { defaultSelectedMenu } from '../../atoms/communityDirectoryMenuAtom';
import { auth } from '../../firebase/clientConfig';
import { useDropDirectory } from '../../hooks/useDropDirectory';
import { DropDirectory } from './DropDirectory/DropDirectory';
import { RightContent } from './RightContent/RightContent';
import { SearchInput } from './SearchInput';

export const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { handleSelectMenuItem } = useDropDirectory();

  return (
    <Flex
      bg="white"
      height="46px"
      padding="6px 12px"
      justify={{ md: 'space-between' }}
    >
      {/* Logo */}
      <Flex
        align="center"
        justify="center"
        width={{ base: '40px', md: 'auto' }}
        mr={{ base: 'auto', md: 2 }}
        cursor="pointer"
        onClick={() => handleSelectMenuItem(defaultSelectedMenu)}
      >
        <Image src="/images/redditFace.svg" height="30px" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>

      {/* <DropDirectory /> */}
      <DropDirectory user={user} />
      {/* <SearchInput /> */}
      <SearchInput user={user} />
      {/* <RightContent /> */}
      <RightContent user={user} />
    </Flex>
  );
};
