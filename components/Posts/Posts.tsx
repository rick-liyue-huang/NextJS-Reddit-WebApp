import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Community } from '../../atoms/communityAtom';
import { Post } from '../../atoms/postAtom';
import { auth, db } from '../../firebase/clientConfig';
import { usePosts } from '../../hooks/usePosts';
import { PostItem } from './PostItem';
import { PostLoaderComponent } from './PostLoaderComponent';

interface Props {
  communityData: Community;
  // userId?: string;
}

export const Posts: React.FC<Props> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const {
    postStateVal,
    setPostStateVal,
    handleRemovePost,
    handleSelectPost,
    handleVote,
  } = usePosts();
  const [user] = useAuthState(auth);

  const getPosts = async () => {
    setLoading(true);
    try {
      // get the posts under current community
      const getPostsQuery = query(
        collection(db, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc')
      );
      const postDocs = await getDocs(getPostsQuery);

      // get the posts in store
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateVal((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log('posts: ', posts);
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {' '}
      {loading ? (
        <PostLoaderComponent />
      ) : (
        <Stack>
          {postStateVal.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={
                postStateVal.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
              handleVote={handleVote}
              handleSelectPost={handleSelectPost}
              handleRemovePost={handleRemovePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
