import React from 'react';
import {Flex, Button, Image} from "@chakra-ui/react";

const OAuthButtonsComponent: React.FC = () => {
	return (
		<Flex direction={'column'} w={'100%'} mb={4}>
			<Button mb={2} variant={'oauth'}>
				<Image src={'/images/googlelogo.png'} h={'20px'} mr={2} />
				Using Google
			</Button>
			<Button variant={'oauth'} >Other Providers</Button>
		</Flex>
	);
};

export default OAuthButtonsComponent;
