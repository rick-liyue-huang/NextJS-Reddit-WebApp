import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtonsComponent from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";
import {signOut} from "@firebase/auth";
import {auth} from "../../../firebase/clientApp";

interface RightPartProps {
	user: any;
}

const RightPartComponent: React.FC<RightPartProps> = ({user}) => {

	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'} >
				{
					user ? <Button onClick={() => signOut(auth)}>LOGOUT</Button> : <AuthButtonsComponent />
				}
			</Flex>
		</>
	);
};

export default RightPartComponent;
