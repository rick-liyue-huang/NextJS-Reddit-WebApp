import React from 'react';
import {Flex, Button, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";

const OAuthButtonsComponent: React.FC = () => {

	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<Flex direction={'column'} w={'100%'} mb={4}>
			<Button
				mb={2} variant={'oauth'} isLoading={loading}
				onClick={() => signInWithGoogle()}
			>
				<Image src={'/images/googlelogo.png'} h={'20px'} mr={2} />
				Using Google
			</Button>
			<Button variant={'oauth'} >Other Providers</Button>
			{
				error && <Text>{error.message}</Text>
			}
		</Flex>
	);
};

export default OAuthButtonsComponent;
