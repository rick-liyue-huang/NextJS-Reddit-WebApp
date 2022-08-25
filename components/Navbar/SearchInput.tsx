import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

interface SearchInputProps {
  user?: User | null;
}

export const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const bg = useColorModeValue('white', 'gray.600');

  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '680px'} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" mb={1}>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          bg={bg}
          placeholder="Search something..."
          fontSize={'10pt'}
          _placeholder={{ color: 'gray.500' }}
          _hover={{ bg: bg, borderColor: 'green.500' }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'green.400',
            bg: bg,
          }}
          height="34px"
        />
      </InputGroup>
    </Flex>
  );
};
