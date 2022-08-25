import { Stack } from '@chakra-ui/react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post, PostVote } from '../atoms/postAtom';
import { CreatePostLink } from '../components/Community/CreatePostLink';
import { Recommendation } from '../components/Community/Recommendation';
import { SubLayout } from '../components/Layout/SubLayout';
import { PostItem } from '../components/Posts/PostItem';
import { PostLoaderComponent } from '../components/Posts/PostLoaderComponent';
import { auth, db } from '../firebase/clientConfig';
import { useCommunities } from '../hooks/useCommunities';
import { usePosts } from '../hooks/usePosts';

const Home: NextPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateVal,
    setPostStateVal,
    handleSelectPost,
    handleRemovePost,
    handleVote,
  } = usePosts();
  // const communityStateVal = useRecoilValue(communityState);
  const { communityStateVal } = useCommunities();

  const handleBuildUserHomePostFeeds = async () => {
    setLoading(true);
    try {
      // get the posts from the current community
      if (communityStateVal.mySnippets.length) {
        // the user has joined the community
        const myCommunityIds = communityStateVal.mySnippets.map(
          (snip) => snip.communityId
        );
        const postQuery = query(
          collection(db, 'posts'),
          where('communityId', 'in', myCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateVal((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        // have not yet joined the community
        handleBuildNoUserHomePostFeeds();
      }
    } catch (err) {
      console.log(`handleBuildUserHomePostFeeds error: ${err}`);
    }
    setLoading(false);
  };

  const handleBuildNoUserHomePostFeeds = async () => {
    setLoading(true);
    try {
      // if not sign in, get the 10 most popular posts
      const postQuery = query(
        collection(db, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // update globally
      setPostStateVal((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (err) {
      console.log(`handleBuildNoUserHomePostFeeds error: `, err);
    }
    setLoading(false);
  };

  const handleUserPostVoteFeeds = async () => {
    setLoading(true);
    try {
      const postIds = postStateVal.posts.map((post) => post.id);
      // get the current user votes
      const postVoteQuery = query(
        collection(db, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds)
      );
      const postVoteDocs = await getDocs(postVoteQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateVal((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (err) {
      console.log(`handleUserPostVoteFeeds error: `, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user && !userLoading) {
      handleBuildNoUserHomePostFeeds();
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (communityStateVal.snippetsFetched) {
      handleBuildUserHomePostFeeds();
    }
  }, [communityStateVal.snippetsFetched]); // don't need to add user dependencies because 'getMyCommunitySnippets' in useCommunities hooks

  useEffect(() => {
    if (user && postStateVal.postVotes.length) {
      handleUserPostVoteFeeds();
    }
    // return () => {
    //   setPostStateVal((prev) => ({
    //     ...prev,
    //     postVotes: [],
    //   }));
    // };
  }, [user, postStateVal.posts]);

  return (
    <SubLayout>
      <>
        <CreatePostLink />
        {/* PostFeed */}
        {loading ? (
          <PostLoaderComponent />
        ) : (
          <Stack>
            {postStateVal.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                handleSelectPost={handleSelectPost}
                handleRemovePost={handleRemovePost}
                handleVote={handleVote}
                userVoteValue={
                  postStateVal.postVotes.find((item) => item.postId === post.id)
                    ?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage // confirm this is home page
              />
            ))}
          </Stack>
        )}
      </>
      <>
        {/* Recommendation */}
        <Recommendation />
      </>
    </SubLayout>
  );
};

export default Home;

// https://www.redditstatic.com/desktop2x/img/leaderboard/banner-background.png
