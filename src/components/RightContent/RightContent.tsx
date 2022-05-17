import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../Modal/Auth/AuthModal";
import {signOut, User} from "firebase/auth";
import {auth} from "../../firebase/clientApp";
import Icons from "./Icons";
import IconsComponent from "./Icons";


interface RightContentProps {
	user?: User | null
}

const RightContentComponent: React.FC<RightContentProps> = ({user}) => {

	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'}>

				{
					user ?
						<IconsComponent /> :
						<AuthButtonsComponent />
				}
				{/*<Menu />*/}
			</Flex>
		</>
	);
};

export default RightContentComponent;
