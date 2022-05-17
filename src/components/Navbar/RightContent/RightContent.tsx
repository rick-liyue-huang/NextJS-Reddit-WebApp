import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthModalComponent from "../../Modal/Auth/AuthModal";
import {signOut, User} from "@firebase/auth";
import {auth} from "../../../firebase/clientApp";
import IconsComponent from "./Icons";
import AuthButtonsComponent from "./AuthButtons";
import UserMenuComponent from "./UserMenu";

interface RightContentProps {
	user?: User | null;
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
