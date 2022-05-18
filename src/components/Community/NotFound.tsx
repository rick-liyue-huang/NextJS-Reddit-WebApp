import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import Link from 'next/link'

const CommunityNotFoundComponent: React.FC = () => {
	return (
		<Flex
			direction={'column'} justifyContent={'center'} alignItems={'center'} minH={'60vh'}
		>
			Community not exists
			<Link href={'/'}>
				<Button mt={3}>Back Home</Button>
			</Link>
		</Flex>
	);
};

export default CommunityNotFoundComponent;
