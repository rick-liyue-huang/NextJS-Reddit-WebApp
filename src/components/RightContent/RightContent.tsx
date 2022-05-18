import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../Modal/Auth/AuthModal";
import {User} from "firebase/auth";
import IconsComponent from "./Icons";
import UserMenuComponent from "./UserMenu";


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
				<UserMenuComponent user={user} />
			</Flex>
		</>
	);
};

export default RightContentComponent;
