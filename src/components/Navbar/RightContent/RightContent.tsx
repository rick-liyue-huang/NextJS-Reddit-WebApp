import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";

interface RightContentProps {
	// user
}

const RightContentComponent: React.FC<RightContentProps> = () => {
	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'}>
				<AuthButtons />
			</Flex>
		</>
	);
};

export default RightContentComponent;
