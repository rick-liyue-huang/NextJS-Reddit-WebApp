import React from 'react';
import {Timestamp} from "@firebase/firestore";
import {Flex, Box, Icon, Stack, Text, Spinner} from "@chakra-ui/react";
import {IoArrowDownCircleOutline, IoArrowUpCircleOutline} from "react-icons/io5";
import {FaReddit} from "react-icons/fa";
import moment from "moment";

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

interface CommentItemProps {
	comment: Comment;
	handleDeleteComment: (comment: Comment) => void;
	deleteLoading: boolean;
	userId: string;
}

const CommentItemComponent: React.FC<CommentItemProps> = ({
	comment, handleDeleteComment, userId, deleteLoading
}) => {


	return (
		<Flex>
			<Box>
				<Icon as={FaReddit} fontSize={30} color={'gray.300'} />
			</Box>
			<Stack spacing={1}>
				<Stack direction={'row'} align={'center'} fontSize={'8pt'}>
					<Text
						fontWeight={700} color={'gray.300'}
					>{comment.creatorDisplayName}</Text>
					<Text
						color={'gray.500'}
					>{moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}</Text>
					{ deleteLoading && <Spinner size={'sm'} /> }
				</Stack>
				<Text fontSize={'10pt'}>{comment.text}</Text>
				<Stack direction={'row'} align={'center'} cursor={'pointer'} >
					<Icon as={IoArrowUpCircleOutline} />
					<Icon as={IoArrowDownCircleOutline} />
					{userId === comment.creatorId && (
						<>
							<Text fontSize={'7pt'} _hover={{color: 'green.200'}}>Edit</Text>
							<Text
								fontSize={'7pt'} _hover={{color: 'green.200'}}
								onClick={() => handleDeleteComment(comment)}
							>Delete</Text>
						</>
					)}
				</Stack>
			</Stack>
		</Flex>
	);
};

export default CommentItemComponent;
