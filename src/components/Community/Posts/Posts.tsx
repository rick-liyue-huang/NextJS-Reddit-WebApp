import React, {useEffect, useState} from 'react';
import {Community} from "../../../atoms/communitiesAtom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {auth, fireStore} from "../../../firebase/clientApp";
import {usePosts} from "../../../hooks/usePosts";
import {Post} from "../../../atoms/postsAtom";
import PostItemComponent from "./PostItem";
import {useAuthState} from "react-firebase-hooks/auth";
import {Stack} from "@chakra-ui/react";
import PostLoaderComponent from "./PostLoader";

interface PostsProps {
	communityData: Community;
}

const PostsComponent: React.FC<PostsProps> = ({communityData}) => {

	const [loading, setLoading] = useState(false);
	// manage post state in global
	const {
		postValue,
		setPostValue,
		handleDeletePost,
		handleVote,
		handleSelectPost
	} = usePosts();

	// useAuthState
	const [user] = useAuthState(auth);

	const getPosts = async () => {

		setLoading(true);

		try {
		//	get posts from current community
			const postsQuery = query(
				collection(fireStore, 'posts'),
				where('communityId', '==', communityData.id),
				orderBy('createdAt', 'desc')
			);

			const postDocs = await getDocs(postsQuery);
			const posts = postDocs.docs.map(doc => ({id: doc.id, ...doc.data()}))

			console.log('posts', posts);

			// we query the posts and set in global recoil post state.
			setPostValue(prev => ({
				...prev, posts: posts as Post[]
			}));

		} catch (err: any) {
			console.log('getPosts error: ', err.message);
		}
		setLoading(false);
	}

	useEffect(() => {
		getPosts();
	}, [])

	return (
		<>
			{
				loading ? (
					<PostLoaderComponent />
				) : (
					<Stack>
						{
							postValue.posts.map(item => (
								<PostItemComponent
									key={item.id}
									post={item}
									userIsCreator={user?.uid === item.creatorId}
									userVoteValue={postValue.postVotes.find(vote => vote.postId === item.id)?.voteValue}
									handleVote={handleVote}
									handleSelectPost={handleSelectPost}
									handleDeletePost={handleDeletePost}
								/>
							))
						}
					</Stack>
				)
			}

		</>

	);
};

export default PostsComponent;
