import React, {useEffect, useState} from 'react';
import {User} from "firebase/auth";
import {Post, postState} from "../../../../atoms/postsAtom";
import {Box, Flex, SkeletonCircle, SkeletonText, Stack, Text} from "@chakra-ui/react";
import CommentInputComponent from "./CommentInput";
import {
	collection,
	doc, getDocs,
	increment,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	where,
	writeBatch
} from "@firebase/firestore";
import {fireStore} from "../../../../firebase/clientApp";
import {useSetRecoilState} from "recoil";
import {Comment} from "./CommentItem";
import CommentItemComponent from "./CommentItem";


interface CommentsProps {
	user: User;
	selectedPost: Post | null;
	communityId: string;
}


const CommentsComponent: React.FC<CommentsProps> = ({user, selectedPost, communityId}) => {

	const [commentText, setCommentText] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [fetchLoading, setFetchLoading] = useState(true);
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

			newComment.createdAt = {seconds: Date.now() / 1000} as Timestamp;

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

	const getPostComments = async () => {

		try {

			const commentsQuery = query(collection(
				fireStore, 'comments'),
				where('postId', '==', selectedPost?.id),
				orderBy('createdAt', 'desc'));

			const commentsDocs = await getDocs(commentsQuery);
			const comments = commentsDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));

			setComments(comments as Comment[])

		} catch (err: any) {
			console.log('getPostComments error: ', err.message);
		}

		setFetchLoading(false);
	}

	useEffect(() => {
		if (!selectedPost) return;
		getPostComments();
		console.log('length: ', comments.length)
	}, [selectedPost])

	return (
		<Box
			bg={'white'} borderRadius={'0 0 3px 3px'} p={2}
		>
			<Flex direction={'column'} pl={10} pr={4} fontSize={'10pt'} w={'1005'}>
				{
					!fetchLoading && <CommentInputComponent
						commentText={commentText} setCommentText={setCommentText}
						handleCreateComment={handleCreateComment} user={user} createLoading={createLoading}
					/>
				}
			</Flex>
			<Stack spacing={6} p={2}>
				{
					fetchLoading ? (
						<>
							{
								[0,1,2].map(item => (
									<Box key={item} p={6} bg={'white'}>
										<SkeletonCircle size={'10'} />
										<SkeletonText mt={'4'} noOfLines={2} spacing={'4'} />
									</Box>
								))
							}
						</>

					) : (
						<>
							{
								comments.length === 0 ? (
									<Flex
										direction={'column'} justify={'center'} align={'center'}
										border={'1px solid'} borderColor={'gray.100'} p={20}
									>
										<Text fontWeight={700} opacity={.5}>
											No comments here
										</Text>
									</Flex>
								) : (
									<>
										{comments.map(comment => (
											<CommentItemComponent
												key={comment.id}
												comment={comment} handleDeleteComment={handleDeleteComment}
												deleteLoading={false} userId={user.uid}
											/>
										))}
									</>
								)
							}
						</>
					)
				}

			</Stack>
		</Box>
	);
};

export default CommentsComponent;
