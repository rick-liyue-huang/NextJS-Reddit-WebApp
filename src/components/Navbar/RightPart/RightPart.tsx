import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";

const RightPartComponent: React.FC = () => {
	return (
		<>
			{/*<AuthModal />*/}
			<Flex justify={'center'} align={'center'} >
				<AuthButtonsComponent />
			</Flex>
		</>
	);
};

export default RightPartComponent;
