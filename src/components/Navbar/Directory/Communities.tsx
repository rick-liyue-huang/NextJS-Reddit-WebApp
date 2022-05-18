import React, {useState} from 'react';
import CreateCommunityComponent from "../../Modal/Community/CreateCommunity";
import {MenuItem, Flex, Icon} from '@chakra-ui/react';
import {GrAdd} from "react-icons/gr";

const CommunitiesComponent: React.FC = () => {

	// define the state to toggle community modal
	const [open, setOpen] = useState(false);


	return (
		<>
			<CreateCommunityComponent open={open} handleClose={() => setOpen(false)} />
			<MenuItem
				w={'100%'} fontSize={'10pt'} _hover={{bg:'gray.100'}}
				onClick={() => setOpen(true)}
			>
				<Flex align={'center'}>
					<Icon as={GrAdd} fontSize={20} mr={2} />
					Create Community
				</Flex>
			</MenuItem>
		</>
	);
};

export default CommunitiesComponent;
