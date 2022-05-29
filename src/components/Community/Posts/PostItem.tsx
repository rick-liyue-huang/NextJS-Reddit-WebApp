import React, {useState} from 'react';
import {Flex, Icon, Text, Stack, Image, Skeleton, Spinner, Alert, AlertIcon} from "@chakra-ui/react";
import {Post} from "../../../atoms/postsAtom";
import moment from "moment";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
	IoArrowDownCircleOutline,
	IoArrowDownCircleSharp,
	IoArrowRedoOutline,
	IoArrowUpCircleOutline,
	IoArrowUpCircleSharp,
	IoBookmarkOutline,
} from "react-icons/io5";

interface PostItemProps {
	post: Post;
	userIsCreator: boolean;
	userVoteValue?: number;
	handleVote: () => {};
	handleDeletePost: (post: Post) => Promise<boolean>
	handleSelectPost: () => void;
}

const PostItemComponent: React.FC<PostItemProps> = ({
	post,
	userIsCreator,
	userVoteValue,
	handleVote,
	handleSelectPost,
	handleDeletePost
}) => {

	const [loadingImage, setLoadingImage] = useState(true);
	const [error, setError] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	// delete the post
	const handleDelete = async () => {
		setDeleteLoading(true);
		try {
			const success = await handleDeletePost(post);

			if (!success) {
				throw new Error('Fail to delete post here');
			}
			console.log('post was successfully deleted');
		} catch (err: any) {
			setError(err.message);
		}
		setDeleteLoading(false);
	}

	return (
		<Flex
			border={'1px solid'} bg={'white'} borderColor={'green.300'} borderRadius={3}
			_hover={{borderColor: 'green.500'}} cursor={'pointer'}
			onClick={handleSelectPost}
		>
			<Flex
				direction={'column'} align={'center'} p={2} bg={'green.100'} w={'40px'}
			>
				<Icon
					as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleSharp}
					color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
					fontSize={22} onClick={handleVote} cursor={'pointer'}
				/>
				<Text>{post.voteStatus}</Text>
				<Icon
					as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleSharp}
					color={userVoteValue === -1 ? 'green.200' : 'gray.400'}
					fontSize={22} onClick={handleVote} cursor={'pointer'}
				/>
			</Flex>
			<Flex
				direction={'column'} w={'100%'}
			>
				{
					error && (
						<Alert status='error' color={'gray.500'} fontSize={'10pt'} fontWeight={300}>
							<AlertIcon />
							<Text mr={2}>{error}</Text>
						</Alert>
					)
				}
				<Stack spacing={1} p={'10px'}>
					<Stack direction={'row'} spacing={0.6} align={'center'} fontSize={'9pt'}>
						{/*Home check*/}
						<Text>Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
						</Text>
					</Stack>
					<Text fontSize={'12pt'} fontWeight={600}>{post.title}</Text>
					<Text fontSize={'10pt'} color={'gray.500'} fontWeight={400}>{post.body}</Text>
					{
						post.imageUrl && (
							<Flex justify={'center'} align={'center'} p={2}>
								{
									loadingImage && (
										<Skeleton h={'200px'} w={'100%'} borderRadius={3} />
									)
								}
								<Image
									src={post.imageUrl} maxW={'460px'} alt={'post image'}
								  onLoad={() => setLoadingImage(false)}
								/>
							</Flex>
						)
					}
				</Stack>
				<Flex ml={1} mb={1} color={'green.200'} >
					<Flex
						align={'center'} p={'8px 10px'} borderRadius={3}
						_hover={{color: 'white', bg: 'green.200'}} cursor={'pointer'}
					>
						<Icon as={BsChat} mr={2} />
						<Text fontSize={'9pt'}>{post.numberOfComments}</Text>
					</Flex>

					<Flex
						align={'center'} p={'8px 10px'} borderRadius={3}
						_hover={{color: 'white', bg: 'green.200'}} cursor={'pointer'}
					>
						<Icon as={IoArrowRedoOutline} mr={2} />
						<Text fontSize={'9pt'}>Share</Text>
					</Flex>
					<Flex
						align={'center'} p={'8px 10px'} borderRadius={3}
						_hover={{color: 'white', bg: 'green.200'}} cursor={'pointer'}
					>
						<Icon as={IoBookmarkOutline} mr={2} />
						<Text fontSize={'9pt'}>Save</Text>
					</Flex>

					{
						userIsCreator && (
							<Flex
								align={'center'} p={'8px 10px'} borderRadius={3}
								_hover={{color: 'white', bg: 'green.200'}} cursor={'pointer'}
								onClick={handleDelete}
							>
								{
									deleteLoading ? (
										<Spinner size={'sm'} />
									) : (
										<>
											<Icon as={AiOutlineDelete} mr={2} />
											<Text fontSize={'9pt'}>Delete</Text>
										</>
									)
								}
							</Flex>
						)
					}

				</Flex>
			</Flex>
		</Flex>
	);
};

export default PostItemComponent;
