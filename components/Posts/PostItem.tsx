import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUndoCircleSharp,
  IoArrowUpCircleOutline,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { Post } from '../../atoms/postAtom';

interface Props {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  handleVote: () => {};
  handleRemovePost: (post: Post) => Promise<boolean>;
  handleSelectPost: () => void;
}

export const PostItem: React.FC<Props> = ({
  post,
  userIsCreator,
  userVoteValue,
  handleVote,
  handleRemovePost,
  handleSelectPost,
}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [error, setError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeletePost = async () => {
    setDeleteLoading(true);
    try {
      const success = await handleRemovePost(post);

      if (!success) {
        throw new Error(`fail to delete post`);
      }
      console.log('delete post successfully');
    } catch (err: any) {
      setError(err.message);
    }
    setDeleteLoading(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={'gray.300'}
      borderRadius={4}
      _hover={{ borderColor: 'gray.500' }}
      cursor="pointer"
      onClick={handleSelectPost}
    >
      <Flex
        direction={'column'}
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1
              ? IoArrowUndoCircleSharp
              : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize={22}
          cursor="pointer"
          onClick={handleVote}
        />
        <Text fontSize={'9pt'}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize={22}
          cursor="pointer"
          onClick={handleVote}
        />
      </Flex>
      <Flex direction={'column'} width="100%">
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing="0.5" align={'center'} fontSize="9pt">
            <Text>
              Posted by u/{post.creatorDisplayName}
              {' - '}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={'12pt'} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageUrl && (
            <Flex justify={'center'} align="center" p={2}>
              {loadingImg && (
                <Skeleton width="100%" height="200px" borderRadius={4} />
              )}
              <Image
                src={post.imageUrl}
                alt=""
                maxHeight={'460px'}
                onLoad={() => setLoadingImg(false)}
                display={loadingImg ? 'none' : 'unset'}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor="pointer"
              onClick={handleDeletePost}
            >
              {deleteLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};
