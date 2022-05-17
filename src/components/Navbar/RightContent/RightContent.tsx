import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModalComponent from "../../Modal/Auth/AuthModal";
import {signOut} from "@firebase/auth";
import {auth} from "../../../firebase/clientApp";

interface RightContentProps {
	user: any
}

const RightContentComponent: React.FC<RightContentProps> = ({user}) => {
	return (
		<>
			<AuthModalComponent />
			<Flex justify={'center'} align={'center'}>
				{
					user ? <Button onClick={() => signOut(auth)}>Logout</Button> : <AuthButtons />
				}

			</Flex>
		</>
	);
};

export default RightContentComponent;
