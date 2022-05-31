import React, {useEffect, useState} from 'react';
import {Community} from "../../atoms/communitiesAtom";
import {useCommunityData} from "../../hooks/useCommunityData";
import {collection, getDocs, limit, orderBy, query} from "@firebase/firestore";
import {fireStore} from "../../firebase/clientApp";
import {Flex, Skeleton, SkeletonCircle, Stack,
	Text, Image, Icon, Box, Button} from "@chakra-ui/react";
import Link from "next/link";
import {FaReddit} from "react-icons/fa";


const RecommenditionComponent: React.FC = () => {

	const [communities, setCommunities] = useState<Community[]>([]);
	const [loading, setLoading] = useState(false);
	const {communityStateValue, handleToggleJoinCommunity} = useCommunityData();

	const handleGetCommunityRec = async () => {
		setLoading(true);
		try {

		//	 get the top communities from db
			const communitiesQuery = query(
				collection(fireStore, 'communities'),
				orderBy('numberOfMembers', 'desc'),
				limit(5));

			const communitiesDocs = await getDocs(communitiesQuery);
			const communities = communitiesDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));

			setCommunities(communities as Community[]);

		} catch (err: any) {
			console.log('handleGetCommunityRec error: ', err.message);
		}
		setLoading(false);
	}

	useEffect(() => {
		handleGetCommunityRec();
	}, [])

	return (
		<Flex
			direction={'column'}  borderRadius={3}
		>
			<Flex
				align={'flex-end'} color={'green.400'} p={'6px 6px'} borderRadius={'3px 3px 0 0 '} fontWeight={700} backgroundSize={'cover'} h={'66px'}
				bgImage={'url("https://styles.redditmedia.com/t5_2sbmn/styles/bannerBackgroundImage_iaokex99git71.png");'}
			>
				Top Recommenditions
			</Flex>
			<Flex direction={'column'}>
				{
					loading ? (
						<Stack mt={2} p={3}>
							<Flex justify="space-between" align="center">
								<SkeletonCircle size="10" />
								<Skeleton height="10px" width="70%" />
							</Flex>
							<Flex justify="space-between" align="center">
								<SkeletonCircle size="10" />
								<Skeleton height="10px" width="70%" />
							</Flex>
							<Flex justify="space-between" align="center">
								<SkeletonCircle size="10" />
								<Skeleton height="10px" width="70%" />
							</Flex>
						</Stack>
					) : (
						<>
							{
								communities.map((item, index) => {
									const isJoined = !!communityStateValue.mySnippets.find(snip => snip.communityId === item.id);
									return (
										<Link key={item.id} href={`/r/${item.id}`}>
											<Flex align={'center'} fontSize={'10pt'} borderBottom={'1px solid'} borderColor={'green.200'} p={'8px'} position={'relative'} >
												<Flex w={'80%'} align={'center'}>
													<Flex w={'15%'}>
														<Text>{index + 1}</Text>
													</Flex>
													<Flex align={'center'} w={'80%'}>
														{
															item.imageUrl ? (
																<Image src={item.imageUrl} borderRadius={'full'} boxSize={'28px'} mr={2} />
															) : (
																<Icon as={FaReddit} fontSize={30} color={'green.200'} mr={2} />
															)
														}
														<span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
														>
															{
																`r/${item.id}`
															}
														</span>
													</Flex>
												</Flex>
												<Box position={'absolute'} right={'8px'}>
													<Button
														h={'22px'} fontSize={'8pt'} variant={isJoined ? 'outline' : 'solid'}
														onClick={e => {
															e.stopPropagation();
															handleToggleJoinCommunity(item, isJoined);
														}}
													>
														{isJoined ? 'Joined' : 'Join'}
													</Button>
												</Box>
											</Flex>
										</Link>
									)
								})
							}
							<Box p={'8px 18px'}>
								<Button h={'30px'} w={'100%'}>View All</Button>
							</Box>
						</>
					)
				}
			</Flex>
		</Flex>
	);
};

export default RecommenditionComponent;
