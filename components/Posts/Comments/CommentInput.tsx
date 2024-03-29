import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { AuthButtons } from '../../Navbar/RightContent/AuthButtons';

interface Props {
  commentText: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading: boolean;
  handleCreateComment: (commentText: string) => void;
}

export const CommentInputComponent: React.FC<Props> = ({
  commentText,
  setCommentText,
  handleCreateComment,
  user,
  createLoading,
}) => {
  const bg = useColorModeValue('white', 'gray.600');

  return (
    <Flex direction="column" position="relative">
      {user ? (
        <Box bg={bg}>
          <Text mb={1}>
            Comment as{' '}
            <span style={{ color: '#3182CE' }}>
              {user?.email?.split('@')[0]}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: 'gray.500' }}
            _focus={{
              outline: 'none',
              bg: bg,
              border: '1px solid black',
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => handleCreateComment(commentText)}
            >
              Comment
            </Button>
          </Flex>
        </Box>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
