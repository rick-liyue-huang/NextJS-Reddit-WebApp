import { Box, Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from 'react-icons/io5';
import { Comment } from './Comments';

interface Props {
  comment: Comment;
  handleDeleteComment: (comment: Comment) => void;
  deleteLoading: boolean;
  userId: string;
}

export const CommentItem: React.FC<Props> = ({
  comment,
  handleDeleteComment,
  deleteLoading,
  userId,
}) => {
  return (
    <Flex>
      <Box>
        <Icon as={FaReddit} fontSize={30} color="gray.300" mr={1} />
      </Box>
      <Stack spacing={1}>
        <Stack direction={'row'} align="center" fontSize="8pt">
          <Text fontWeight={600}>{comment.creatorDisplayName}</Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
          </Text>

          {deleteLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack
          direction={'row'}
          align="center"
          cursor={'pointer'}
          color="gray.500"
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" _hover={{ color: 'green.500' }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: 'green.500' }}
                onClick={() => handleDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
