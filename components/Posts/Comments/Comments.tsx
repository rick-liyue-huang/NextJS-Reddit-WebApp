import { Box, Flex } from '@chakra-ui/react';

import { User } from 'firebase/auth';
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Post, postState } from '../../../atoms/postAtom';
import { db } from '../../../firebase/clientConfig';
import { CommentInputComponent } from './CommentInput';

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
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostStateVal = useSetRecoilState(postState);

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

  const handleDeleteComment = async (comment: any) => {
    // remove comment document in collection comments
    // update post numberOfMembers status
    // update recoil state
    try {
    } catch (err) {
      console.log(`handleDeleteComment error: `, err);
    }
  };

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" borderRadius={'0 0 4px 4px'} p={2}>
      <Flex
        direction={'column'}
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {/* <CommentInput /> */}
        <CommentInputComponent
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          handleCreateComment={handleCreateComment}
        />
      </Flex>
    </Box>
  );
};
