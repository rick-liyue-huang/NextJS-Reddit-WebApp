import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";

const RightPartComponent: React.FC = () => {
	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'} >
				<AuthButtonsComponent />
			</Flex>
		</>
	);
};

export default RightPartComponent;
