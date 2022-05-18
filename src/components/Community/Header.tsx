import React from 'react';
import {Community} from "../../atoms/communitiesAtom";
import {Flex, Box, Icon, Image, Text, Button} from "@chakra-ui/react";
import {FaReddit} from "react-icons/fa";
import {useCommunityData} from "../../hooks/useCommunityData";

interface HeaderProps {
	communityData: Community
}

const HeaderComponent: React.FC<HeaderProps> = ({communityData}) => {

	// using global hooks
	const {communityStateVal, handleToggleJoinCommunity} = useCommunityData();

	const isJoined = !!communityStateVal.mySnippets.find(item => item.communityId === communityData.id); // read from our community snippets

	return (
		<Flex
			direction={'column'} w={'100%'} h={'136px'}
		>
			<Box h={'50%'} bg={'teal.500'} />
			<Flex justify={'center'} bg={'white'} flexGrow={1}>
				<Flex w={'95%'} maxWidth={'860px'} >
					{
						communityData.imageUrl ? (
							<Image />
						) : (
							<Icon
								as={FaReddit} fontSize={64} position={'relative'} borderRadius={'50%'}
								top={-3} color={'teal.300'} border={'2px solid white'} />
						)
					}
					<Flex padding={'10px 16px'}>
						<Flex direction={'column'} mr={6}>
							<Text fontWeight={800} fontSize={'16pt'}>{communityData.id}</Text>
							<Text fontWeight={600} fontSize={'10pt'} color={'gray.500'}>r/{communityData.id}</Text>
						</Flex>
						<Button
							variant={isJoined ? 'outline' : 'solid'} h={'30px'} pr={6} pl={6}
							onClick={() => handleToggleJoinCommunity(communityData, isJoined)}
						>{isJoined ? 'Joined' : 'Join'}</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default HeaderComponent;
