import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

interface SearchInputProps {}

export const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
          mb={1}
        />
        <Input
          placeholder="Search something..."
          fontSize={'10pt'}
          _placeholder={{ color: 'gray.500' }}
          _hover={{ bg: 'white', borderColor: 'green.500' }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'green.400',
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
