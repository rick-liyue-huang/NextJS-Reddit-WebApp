import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";
import IconsComponent from "./Icons";
import UserMenuComponent from "./UserMenu";
import {User} from "firebase/auth";


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
				<UserMenuComponent user={user} />
			</Flex>
		</>
	);
};

export default RightPartComponent;
