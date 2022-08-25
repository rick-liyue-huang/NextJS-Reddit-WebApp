import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Post, postState } from '../../../atoms/postAtom';
import { db } from '../../../firebase/clientConfig';
import { CommentInputComponent } from './CommentInput';
import { CommentItem } from './CommentItem';

export interface Comment {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
}

interface Props {
  user: User;
  selectedPost: Post | null;
  communityId: string;
}

export const CommentsComponent: React.FC<Props> = ({
  user,
  selectedPost,
  communityId,
}) => {
  // TODO seperate the the logic in useComments in future
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostStateVal = useSetRecoilState(postState);
  const [deleteCommentIdLoading, setDeleteCommentIdLoading] = useState('');
  const bg = useColorModeValue('white', 'gray.600');

  const handleCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(db);

      // create comment document in collection comments
      const commentDocRef = doc(collection(db, 'comments'));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayName: user?.email?.split('@')[0] as string,
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      // display the correct time, by deal with serverTimestamp
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update post numberOfMembers status
      const postDocRef = doc(db, 'posts', selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update recoil state
      setCommentText('');
      setComments((prev) => [newComment, ...prev]);
      // update the comment status in post
      setPostStateVal((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (err) {
      console.log(`handleCreateComment error: `, err);
    }
    setCreateLoading(false);
  };

  // compare with 'handleRemovePost'
  const handleDeleteComment = async (comment: any) => {
    setDeleteCommentIdLoading(comment.id);
    try {
      // remove comment document in collection comments
      const batch = writeBatch(db);
      const commentDocRef = doc(db, 'comments', comment.id);
      batch.delete(commentDocRef);
      // update post numberOfMembers status
      const postDocRef = doc(db, 'posts', selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      // update recoil state
      setPostStateVal((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev?.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (err) {
      console.log(`handleDeleteComment error: `, err);
    }
    setDeleteCommentIdLoading('');
  };

  const getPostComments = async () => {
    try {
      const commentQuery = query(
        collection(db, 'comments'),
        where('postId', '==', selectedPost?.id),
        orderBy('createdAt', 'desc')
      );

      const commentDocs = await getDocs(commentQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments as Comment[]);
    } catch (err) {
      console.log(`getPostComments error: `, err);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

  return (
    <Box bg={bg} borderRadius={'0 0 4px 4px'} p={2}>
      <Flex
        direction={'column'}
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {/* <CommentInput /> */}
        {!fetchLoading && (
          <CommentInputComponent
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            handleCreateComment={handleCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding={6} bg="white">
                <SkeletonCircle size="10pt" />
                <SkeletonText mt={4} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction={'column'}
                justify="center"
                align="center"
                borderTop={'1px solid'}
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.2}>
                  No Comments
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                    deleteLoading={deleteCommentIdLoading === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
