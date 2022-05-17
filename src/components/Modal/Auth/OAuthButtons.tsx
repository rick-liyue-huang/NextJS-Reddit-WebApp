
import React from 'react';
import {Flex, Button, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";

/**
 * @define use google account to login or register
 * @constructor
 */
const OAuthButtonsComponent: React.FC = () => {

	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<Flex direction={'column'} w={'100%'} mb={3}>
			<Button variant={'oauth'} isLoading={loading} onClick={() => signInWithGoogle()} >
				<Image
					src={'/images/googlelogo.png'} h={'20px'} mr={4}
				/>
				Using Google
			</Button>
			<Button variant={'oauth'}>Still have other providers to add...</Button>
			{error && <Text>{error.message}</Text>}
		</Flex>
	);
};

export default OAuthButtonsComponent;
