import React, {useState} from 'react';
import {Community} from "../../atoms/communitiesAtom";
import {Flex, Box, Icon, Image, Text, Button} from "@chakra-ui/react";
import {FaReddit} from "react-icons/fa";
import {useCommunityData} from "../../hooks/useCommunityData";


interface HeaderProps {
	communityData: Community
}

const CommunityHeaderComponent: React.FC<HeaderProps> = ({communityData}) => {

	const {communityStateValue, handleToggleJoinCommunity, loading} = useCommunityData();
	// read from out communitySnippet
	const isJoined = !!communityStateValue.mySnippets.find(item => item.communityId === communityData.id);

	return (
		<Flex
			direction={'column'} w={'100%'} h={'146px'}
		>
			<Box h={'50%'} bg={'green.200'} />
			<Flex justify={'center'} bg={'white'} flexGrow={1}>
				<Flex w={'95%'} maxW={'860px'} >

					{
						communityData.imageUrl ? (
							<Image />
						) : (
							<Icon
								as={FaReddit} fontSize={64} position={'relative'}
								top={-3} color={'green.300'} border={'4px solid white'}
								borderRadius={'50%'}
							/>
						)
					}
					<Flex p={'10px 16px'}>
						<Flex direction={'column'} mr={6}>
							<Text fontSize={'14pt'} color={'gray.600'} fontWeight={600}>{communityData.id}</Text>
							<Text fontSize={'8pt'} color={'gray.600'} fontWeight={200}>r/{communityData.id}</Text>
						</Flex>
						<Button
							h={'30px'} variant={isJoined ? 'outline' : 'solid'} isLoading={loading}
							pr={6} pl={6} onClick={() => handleToggleJoinCommunity(communityData, isJoined)}
						>{isJoined ? 'Joined' : 'Join'}</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
};

export default CommunityHeaderComponent;
