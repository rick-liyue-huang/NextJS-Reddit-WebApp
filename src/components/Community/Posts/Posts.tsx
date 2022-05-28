import React, {useEffect, useState} from 'react';
import {Community} from "../../../atoms/communitiesAtom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {fireStore} from "../../../firebase/clientApp";

interface PostsProps {
	communityData: Community;
}

const PostsComponent: React.FC<PostsProps> = ({communityData}) => {

	const [loading, setLoading] = useState(false);

	// useAuthState

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

		} catch (err: any) {
			console.log('getPosts error: ', err.message);
		}
		setLoading(false);
	}

	useEffect(() => {
		getPosts();
	}, [])

	return (
		<div>
			Posts
		</div>
	);
};

export default PostsComponent;
