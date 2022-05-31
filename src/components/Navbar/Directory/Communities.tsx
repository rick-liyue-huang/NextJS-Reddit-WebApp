import React, {useState} from 'react';
import {MenuItem, Flex, Icon, Box, Text} from "@chakra-ui/react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import {GrAdd} from "react-icons/gr";
import {useRecoilValue} from "recoil";
import {communityState} from "../../../atoms/communitiesAtom";
import MenuListItemComponent from "./MenuListItem";
import {FaReddit} from "react-icons/fa";

const CommunitiesComponent: React.FC = () => {

	// toggle the community modal
	const [open, setOpen] = useState(false);

	// list all the communities in directory
	const {mySnippets} = useRecoilValue(communityState);

	return (
		<>
			<CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
			<Box mt={3} mb={3}>
				<Text
					pl={3} mb={1} fontSize={'7pt'} fontWeight={500} color={'green.300'}
				>Moderating
				</Text>
				{
					mySnippets.filter(snip => snip.isModerator).map((snip) => (
						<MenuListItemComponent
							key={snip.communityId}
							icon={FaReddit}
							displayName={`r/${snip.communityId}`}
							link={`/r/${snip.communityId}`}
							iconColor={'green.200'}
							imageUrl={snip.imageUrl}
						/>
					))
				}
			</Box>
			<Box mt={3} mb={3}>
				<Text
					pl={3} mb={1} fontSize={'7pt'} fontWeight={500} color={'green.300'}
				>My Communities
				</Text>
				<MenuItem
					w={'100%'} fontSize={'10pt'}
					_hover={{bg: 'green.200', color: 'white'}}
					onClick={() => setOpen(true)}
				>
					<Flex align={'center'}>
						<Icon fontSize={20} mr={2} as={GrAdd} />
						Create Community
					</Flex>
				</MenuItem>
				{
					mySnippets.map((snip) => (
						<MenuListItemComponent
							key={snip.communityId}
							icon={FaReddit}
							displayName={`r/${snip.communityId}`}
							link={`/r/${snip.communityId}`}
							iconColor={'green.200'}
							imageUrl={snip.imageUrl}
						/>
					))
				}
			</Box>
		</>
	);
};

export default CommunitiesComponent;
