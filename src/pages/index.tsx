import type { NextPage } from 'next'
import PageContentComponent from "../components/Layout/PageContent";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../firebase/clientApp";
import {collection, getDocs, limit, orderBy, query, where} from "@firebase/firestore";
import {usePosts} from "../hooks/usePosts";
import {Post} from "../atoms/postsAtom";
import PostLoader from "../components/Community/Posts/PostLoader";
import {Stack} from "@chakra-ui/react";
import PostItemComponent from "../components/Community/Posts/PostItem";
import CreatePostLinkComponent from "../components/Community/CreatePostLink";
import {useRecoilValue} from "recoil";
import {communityState} from "../atoms/communitiesAtom";
import {useCommunityData} from "../hooks/useCommunityData";



const Home: NextPage = () => {

  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postValue ,setPostValue, handleDeletePost, handleVote, handleSelectPost} = usePosts();
  // const communityStateValue = useRecoilValue(communityState);
  const {communityStateValue} = useCommunityData();


  const handleBuildUserHomeFeeder = async () => {

    setLoading(true)
    try {
      //  get posts from users communities
      if (communityStateValue.mySnippets.length) {

        const myCommunityIds = communityStateValue.mySnippets.map(snip => snip.communityId);
        const postQuery = query(
          collection(fireStore, 'posts'),
          where('communityId', 'in', myCommunityIds),
          limit(10));

        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));

        setPostValue(prev => ({
          ...prev,
          posts: posts as Post[]
        }));

      } else {
        await handleBuildNoUserHomeFeeder();
      }

    } catch (err: any) {
      console.log('handleBuildUserHomeFeeder error: ', err.message);
    }

    setLoading(false);

  }

  const handleBuildNoUserHomeFeeder = async () => {

    try {
    //   show the most 10 popular post
      const postQuery = query(
        collection(fireStore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10));

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));

    //   setPostState global
      setPostValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }));

    } catch (err: any) {
      console.log('handleBuildNoUserHomeFeeder error: ', err.message);
    }
  }

  const getUserPostVotes = () => {

  }

  useEffect(() => {
    if (communityStateValue.snippetsFetched) {
      handleBuildUserHomeFeeder();
    }
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      handleBuildNoUserHomeFeeder();
    }

  }, [user, loadingUser]);


  return (
    <PageContentComponent>
      <>
        <CreatePostLinkComponent />
        {
          loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {
                postValue.posts.map(post => (
                  <PostItemComponent
                    key={post.id}
                    post={post}
                    handleSelectPost={handleSelectPost}
                    handleDeletePost={handleDeletePost}
                    handleVote={handleVote}
                    userVoteValue={postValue.postVotes.find(item => item.postId === post.id)?.voteValue}
                    userIsCreator={user?.uid === post.creatorId}
                    homePage
                  />
                ))
              }
            </Stack>
          )
        }
      </>
      <>
        {/*<Recommenditions />*/}
      </>
    </PageContentComponent>
  )
}

export default Home
