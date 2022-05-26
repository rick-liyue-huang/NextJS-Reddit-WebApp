import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";
import IconsComponent from "./Icons";

interface User {

}

interface RightPartProps {
	user?: User | null;
}

const RightPartComponent: React.FC<RightPartProps> = ({user}) => {

	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'} >
				{
					user ?
						<IconsComponent /> :
						<AuthButtonsComponent />
				}
			</Flex>
		</>
	);
};

export default RightPartComponent;
