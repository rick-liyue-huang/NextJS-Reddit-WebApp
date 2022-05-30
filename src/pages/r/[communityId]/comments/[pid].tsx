import React, {useEffect} from 'react';
import PageContentComponent from "../../../../components/Layout/PageContent";
import AboutComponent from "../../../../components/Community/About";
import {usePosts} from "../../../../hooks/usePosts";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../../../../firebase/clientApp";
import PostItemComponent from "../../../../components/Community/Posts/PostItem";
import {useRouter} from "next/router";
import {doc, getDoc} from "@firebase/firestore";
import {Post} from "../../../../atoms/postsAtom";
import {useCommunityData} from "../../../../hooks/useCommunityData";
import CommentsComponent from "../../../../components/Community/Posts/Comments/Comments";
import {User} from "firebase/auth";

const SinglePostPage: React.FC  = () => {

	const {
		postValue, setPostValue, handleDeletePost, handleSelectPost, handleVote
	} = usePosts();
	const [user] = useAuthState(auth);
	const router = useRouter();
	const {communityStateValue} = useCommunityData();

	// we can get the same single post content when refresh the single post page
	const fetchPost = async (postId: string) => {
	//	 get the single post from database
		try {
			const postDocRef = doc(fireStore, 'posts', postId);
			const postDoc = await getDoc(postDocRef);
			setPostValue(prev => ({
				...prev,
				selectedPost: {id: postDoc.id, ...postDoc.data()} as Post
			}));

		} catch (err: any) {
			console.log('fetchPost error: ', err.message)
		}
	}

	useEffect(() => {
		const {pid} = router.query;
		if (pid && !postValue.selectedPost) {
			fetchPost(pid as string);
		}
	}, [router.query, postValue.selectedPost])

	return (
		<PageContentComponent>
			<>
				{
					postValue.selectedPost && (
						<PostItemComponent
							post={postValue.selectedPost}
							handleVote={handleVote}
							handleDeletePost={handleDeletePost}
							userVoteValue={postValue.postVotes.find(item => item.postId === postValue.selectedPost?.id)?.voteValue}
							userIsCreator={user?.uid === postValue.selectedPost?.creatorId}
						/>
					)
				}

				<CommentsComponent
					user={user as User} selectedPost={postValue.selectedPost}
					communityId={postValue.selectedPost?.communityId as string}
				/>
			</>
			<>
				{
					communityStateValue.currentCommunity &&
					<AboutComponent communityData={communityStateValue.currentCommunity} />
				}
			</>
		</PageContentComponent>
	);
};

export default SinglePostPage;
