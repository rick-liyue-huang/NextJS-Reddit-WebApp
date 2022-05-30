import React, {useEffect, useState} from 'react';
import {User} from "firebase/auth";
import {Post, postState} from "../../../../atoms/postsAtom";
import {Box, Flex} from "@chakra-ui/react";
import CommentInputComponent from "./CommentInput";
import {collection, doc, increment, serverTimestamp, Timestamp, writeBatch} from "@firebase/firestore";
import {fireStore} from "../../../../firebase/clientApp";
import {useSetRecoilState} from "recoil";


interface CommentsProps {
	user: User;
	selectedPost: Post | null;
	communityId: string;
}

export interface Comment {
	id: string;
	creatorId: string;
	creatorDisplayName: string;
	communityId: string;
	postId: string;
	postTitle: string;
	text: string;
	createdAt: Timestamp
}

const CommentsComponent: React.FC<CommentsProps> = ({user, selectedPost, communityId}) => {

	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const setPostState = useSetRecoilState(postState);

	const handleCreateComment = async () => {

		setCreateLoading(true);
		try {
			const batch = writeBatch(fireStore);

			//	 create a comment document
			const commentDocRef = doc(collection(fireStore, 'comments'));
			const newComment: Comment = {
				id: commentDocRef.id,
				creatorId: user.uid,
				creatorDisplayName: user.email!.split('@')[0],
				communityId: selectedPost?.id!,
				postId: selectedPost?.id!,
				postTitle: selectedPost?.title!,
				text: commentText,
				createdAt: serverTimestamp() as Timestamp,
			};

			batch.set(commentDocRef, newComment);

			//	update post numberOfComments
			const postDocRef = doc(fireStore, 'posts', selectedPost?.id as string);
			batch.update(postDocRef, {
				numberOfComments: increment(1)
			});

			await batch.commit();

			//	update client recoil state
			setCommentText('');
			setComments(prev => [newComment, ...prev]);

			// it will show the comments number in comment component
			setPostState(prev => ({
				...prev,
				selectedPost: {
					...prev.selectedPost,
					numberOfComments: prev.selectedPost?.numberOfComments! + 1
				} as Post
			}))

		} catch (err: any) {
			console.log('handleCreateComment error: ', err.message);
		}

		setCreateLoading(false);

	};

	const handleDeleteComment = async (comment: any) => {
		//	 delete a comment document

		//	update post numberOfComments

		//	update client recoil state
	}

	const getPostComments = async () => {}

	useEffect(() => {
		getPostComments();
	}, [])

	return (
		<Box
			bg={'white'} borderRadius={'0 0 3px 3px'} p={2}
		>
			<Flex direction={'column'} pl={10} pr={4} fontSize={'10pt'} w={'1005'}>
				<CommentInputComponent
					commentText={commentText} setCommentText={setCommentText}
					handleCreateComment={handleCreateComment} user={user} createLoading={createLoading}
				/>
			</Flex>
		</Box>
	);
};

export default CommentsComponent;
