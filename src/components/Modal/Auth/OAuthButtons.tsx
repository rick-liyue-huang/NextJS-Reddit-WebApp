import React, {useEffect} from 'react';
import {Flex, Button, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../../../firebase/clientApp";
import {User} from "firebase/auth";
import {doc, setDoc} from "@firebase/firestore";

const OAuthButtonsComponent: React.FC = () => {

	const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

	// create the user document in firestore after login by google
	const createUserDocument = async (user: User) => {
		const userDocRef = doc(fireStore, 'users', user.uid);
		await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
	}

	useEffect(() => {
		if (userCred) {
			createUserDocument(userCred.user);
		}

	}, [userCred])

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
