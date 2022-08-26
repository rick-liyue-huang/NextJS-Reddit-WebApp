import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Post } from '../../atoms/postAtom';
import { db } from '../../firebase/clientConfig';
import { usePosts } from '../../hooks/usePosts';

interface SearchInputProps {
  user?: User | null;
}

export const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const bg = useColorModeValue('white', 'gray.600');
  const [inputText, setInputText] = useState('');
  const { setPostStateVal } = usePosts();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // e.preventDefault();
  };

  useEffect(() => {
    const callback = async () => {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('communityId', '==', inputText));
      const postDocs = await getDocs(q);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateVal((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    };
    callback();
  }, [inputText]);

  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '680px'} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" mb={1}>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          bg={bg}
          placeholder="Search posts by inputing community name"
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
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </InputGroup>
    </Flex>
  );
};
