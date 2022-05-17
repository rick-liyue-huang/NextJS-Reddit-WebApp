
import React from 'react';
import {Flex, Button, Image} from "@chakra-ui/react";

const OAuthButtonsComponent: React.FC = () => {
	return (
		<Flex direction={'column'} w={'100%'} mb={3}>
			<Button variant={'oauth'}>
				<Image
					src={'/images/googlelogo.png'} h={'20px'} mr={4}
				/>
				Using Google
			</Button>
			<Button variant={'oauth'}>Still have other providers to add...</Button>
		</Flex>
	);
};

export default OAuthButtonsComponent;
