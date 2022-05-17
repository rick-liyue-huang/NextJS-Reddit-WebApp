import React from 'react';
import {Flex, Button, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";


const OAuthButtonsComponent: React.FC = () => {

	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<Flex direction={'column'} width={'100%'} mb={3} >
			<Button
				variant={'oauth'} mb={2} isLoading={loading}
				onClick={() => signInWithGoogle()}
			>
				<Image src={'/images/googlelogo.png'} height={'20px'} mr={3} />
				Using Google here
			</Button>
			<Button variant={'oauth'} mb={2}>Using other providers</Button>
			{error && <Text>{error.message}</Text>}
		</Flex>
	);
};

export default OAuthButtonsComponent;
