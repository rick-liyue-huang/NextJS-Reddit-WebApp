import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from '../../../../atoms/postAtom';
import { AboutComponent } from '../../../../components/Community/About';
import { SubLayout } from '../../../../components/Layout/SubLayout';
import { CommentsComponent } from '../../../../components/Posts/Comments/Comments';
import { PostItem } from '../../../../components/Posts/PostItem';
import { auth, db } from '../../../../firebase/clientConfig';
import { useCommunities } from '../../../../hooks/useCommunities';
import { usePosts } from '../../../../hooks/usePosts';

const SiglePostPage: NextPage = () => {
  const { postStateVal, setPostStateVal, handleRemovePost, handleVote } =
    usePosts();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateVal } = useCommunities();

  // deal with the refresh single post page get nothing problems
  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateVal((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (err) {
      console.log(`fetchPost error: `, err);
    }
  };

  useEffect(() => {
    const postId = router.query.postId;
    if (postId && !postStateVal.selectedPost) {
      fetchPost(postId as string);
    }
  }, [router.query, postStateVal.selectedPost]);

  return (
    <SubLayout>
      <>
        {/* <SelectedPost /> */}
        {postStateVal.selectedPost && (
          <PostItem
            post={postStateVal.selectedPost}
            handleVote={handleVote}
            handleRemovePost={handleRemovePost}
            userVoteValue={
              postStateVal.postVotes.find(
                (p) => p.postId === postStateVal.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateVal.selectedPost?.creatorId}
          />
        )}

        {/* <Comments /> */}
        <CommentsComponent
          user={user as User}
          selectedPost={postStateVal.selectedPost}
          communityId={postStateVal.selectedPost?.communityId as string}
        />
      </>
      <>
        {/* <AboutComponent />   */}
        {communityStateVal.currentCommunity && (
          <AboutComponent communityData={communityStateVal.currentCommunity} />
        )}
      </>
    </SubLayout>
  );
};

export default SiglePostPage;
