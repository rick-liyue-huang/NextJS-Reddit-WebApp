import React, {useState, MouseEvent} from 'react';
import {Flex, Icon, Text, Stack, Image, Skeleton, Spinner, Alert, AlertIcon} from "@chakra-ui/react";
import {Post} from "../../../atoms/postsAtom";
import moment from "moment";
import {NextRouter, useRouter} from "next/router";
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
import Link from 'next/link';

interface PostItemProps {
	post: Post;
	userIsCreator: boolean;
	userVoteValue?: number;
	handleVote: (event: MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void;
	handleDeletePost: (post: Post) => Promise<boolean>
	handleSelectPost?: (post: Post) => void;
	homePage?: boolean;
}

const PostItemComponent: React.FC<PostItemProps> = ({
	post,
	userIsCreator,
	userVoteValue,
	handleVote,
	handleSelectPost,
	handleDeletePost,
	homePage
}) => {

	const [loadingImage, setLoadingImage] = useState(true);
	const [error, setError] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const router = useRouter();


	// confirm it is singlepostpage or post in community page
	const singlePost = !handleSelectPost;

	// delete the post
	const handleDelete = async (event: MouseEvent<HTMLDivElement, MouseEvent>) => {

		event.stopPropagation();

		setDeleteLoading(true);
		try {
			const success = await handleDeletePost(post);

			if (!success) {
				throw new Error('Fail to delete post here');
			}
			console.log('post was successfully deleted');

			if (singlePost) {
				router.push(`/r/${post.communityId}`)
			}

		} catch (err: any) {
			setError(err.message);
		}
		setDeleteLoading(false);
	}

	// @ts-ignore
	return (
		<Flex
			border={'1px solid'} bg={'white'}
			borderColor={singlePost ? 'white' : 'green.300'}
			borderRadius={singlePost ? '5px 5px 0 0' : '3px'}
			_hover={{borderColor: singlePost ? 'none' : 'green.500'}} cursor={singlePost ? 'unset' : 'pointer'}
			onClick={() => handleSelectPost && handleSelectPost(post)}
		>
			<Flex
				direction={'column'} align={'center'} p={2} bg={singlePost ? 'none' : 'green.100'} w={'40px'}
				borderRadius={singlePost ? '0' : '3px 3px 0 0'}
			>
				<Icon
					as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleSharp}
					color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
					fontSize={22} onClick={(event) => {
					// @ts-ignore
					handleVote(event, post, 1, post.communityId)
					}
				} cursor={'pointer'}
				/>
				<Text fontSize={'9pt'} color={'gray.600'} >{post.voteStatus}</Text>
				<Icon
					as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleSharp}
					color={userVoteValue === -1 ? 'green.200' : 'gray.400'}
					fontSize={22} onClick={(e) => {
					// @ts-ignore
					handleVote(e, post, -1, post.communityId)
					}
				} cursor={'pointer'}
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

						{
							homePage && (
								<>
									{
										post.communityImageUrl ? (
											<Image src={post.communityImageUrl} mr={1} borderRadius={'full'} boxSize={'18px'} />
										) : (
											<Icon as={FaReddit} fontSize={'10pt'} color={'green.200'} mr={1} />
										)
									}
									<Link href={`/r/${post.communityId}`}>
										<Text
											fontWeight={700} _hover={{textDecoration: 'underline'}}
											onClick={e => e.stopPropagation()}
										>{`r/${post.communityId}`}</Text>
									</Link>
									<Icon as={BsDot} color={'green.300'} fontSize={8} />
								</>
							)
						}
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
								onClick={(e) => {

									// @ts-ignore
									handleDelete(e)
								}}
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
