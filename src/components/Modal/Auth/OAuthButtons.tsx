
import React, {useEffect} from 'react';
import {Flex, Button, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../../../firebase/clientApp";
import {User} from "firebase/auth";
import {doc, setDoc} from "@firebase/firestore";

/**
 * @define use google account to login or register
 * @constructor
 */
const OAuthButtonsComponent: React.FC = () => {

	const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

	// create user document without using firebase functions
	const createUserDocument = async (user: User) => {
	//	using 'setDoc', because we don not know its login or register
		const userDocRef = doc(fireStore, 'users', user.uid);
		await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
	}

	useEffect(() => {
		if (userCred) {
			createUserDocument(userCred.user)
		}
	}, [userCred])

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
