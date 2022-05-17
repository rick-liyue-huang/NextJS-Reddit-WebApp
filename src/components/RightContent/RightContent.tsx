import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../Modal/Auth/AuthModal";

interface RightContentProps {
	// user: User
}

const RightContentComponent: React.FC<RightContentProps> = () => {
	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'}>
				<AuthButtonsComponent />
			</Flex>
		</>
	);
};

export default RightContentComponent;
