import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { RightContent } from './RightContent/RightContent';
import { SearchInput } from './SearchInput';

export const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="46px" padding="6px 12px">
      {/* Logo */}
      <Flex align="center" justify="center">
        <Image src="/images/redditFace.svg" height="30px" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>

      {/* <Directory /> */}
      {/* <SearchInput /> */}
      <SearchInput />
      {/* <RightContent /> */}
      <RightContent />
    </Flex>
  );
};
