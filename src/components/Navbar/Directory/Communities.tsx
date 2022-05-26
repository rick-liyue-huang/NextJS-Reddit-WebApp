import React, {useState} from 'react';
import {MenuItem, Flex, Icon} from "@chakra-ui/react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import {GrAdd} from "react-icons/gr";

const CommunitiesComponent: React.FC = () => {

	// toggle the community modal
	const [open, setOpen] = useState(false);

	return (
		<>
			<CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
			<MenuItem
				w={'100%'} fontSize={'10pt'}
				_hover={{bg: 'green.200', color: 'white'}}
				onClick={() => setOpen(true)}
			>
				<Flex align={'center'}>
					<Icon fontSize={20} mr={2} as={GrAdd} />
					ok
				</Flex>
			</MenuItem>
		</>
	);
};

export default CommunitiesComponent;
