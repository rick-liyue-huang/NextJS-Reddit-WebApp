import React from 'react';
import {Flex, Button, Image} from "@chakra-ui/react";


const OAuthButtonsComponent: React.FC = () => {
	return (
		<Flex direction={'column'} width={'100%'} mb={3} >
			<Button variant={'oauth'} mb={2}>
				<Image src={'/images/googlelogo.png'} height={'20px'} mr={3} />
				Using Google here
			</Button>
			<Button variant={'oauth'} mb={2}>Using other providers</Button>
		</Flex>
	);
};

export default OAuthButtonsComponent;
