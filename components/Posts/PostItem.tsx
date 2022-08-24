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
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { Post } from '../../atoms/postAtom';

interface Props {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  handleVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  handleRemovePost: (post: Post) => Promise<boolean>;
  handleSelectPost?: (post: Post) => void;
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
  const router = useRouter();

  const singlePost = !handleSelectPost;

  const handleDeletePost = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDeleteLoading(true);
    try {
      const success = await handleRemovePost(post);

      if (!success) {
        throw new Error(`fail to delete post`);
      }
      console.log('delete post successfully');
      if (singlePost) {
        router.push(`/r/${post.communityId}`);
      }
      // or
      // if (router) {
      //   router.back();
      // }
    } catch (err: any) {
      setError(err.message);
    }
    setDeleteLoading(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePost ? 'white' : 'gray.300'}
      borderRadius={singlePost ? '4px 4px 0px 0px' : 4}
      _hover={{ borderColor: singlePost ? 'none' : 'gray.500' }}
      cursor={singlePost ? 'unset' : 'pointer'}
      onClick={() => handleSelectPost && handleSelectPost(post)}
    >
      <Flex
        direction={'column'}
        align="center"
        bg={singlePost ? 'none' : 'gray.100'}
        p={2}
        width="40px"
        borderRadius={singlePost ? '0' : '4px 0 0 4px'}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? 'green.500' : 'gray.400'}
          fontSize={22}
          cursor="pointer"
          // @ts-ignore
          onClick={(e) => handleVote(e, post, 1, post.communityId)}
        />
        <Text fontSize={'9pt'}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? 'green.500' : 'gray.400'}
          fontSize={22}
          cursor="pointer"
          // @ts-ignore
          onClick={(e) => handleVote(e, post, -1, post.communityId)}
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
              // @ts-ignore
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
