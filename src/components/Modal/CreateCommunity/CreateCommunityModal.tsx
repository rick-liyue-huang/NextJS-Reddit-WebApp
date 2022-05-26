import React, {ChangeEvent, useState} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, Stack, ModalFooter, ModalHeader, ModalOverlay, Button, Box,
	Text, Input, Checkbox, Flex, Icon} from "@chakra-ui/react";
import {BsFillEyeFill, BsFillPersonFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import {doc, getDoc, runTransaction, serverTimestamp, setDoc} from '@firebase/firestore';
import {auth, fireStore} from '../../../firebase/clientApp';
import {useAuthState} from "react-firebase-hooks/auth";


interface CreateCommunityProps {
	open: boolean;
	handleClose: () => void;
}

// confirm the type
type CommunityType = 'public' | 'restricted' | 'private';

const CreateCommunityModal: React.FC<CreateCommunityProps> = ({open, handleClose}) => {

	const [communityName, setCommunityName] = useState('');
	const [charsRemaining, setCharsRemaining] = useState(21);
	const [communityType, setCommunityType] = useState<CommunityType>('public');
	const [error, setError] = useState('');
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

		if (e.target.value.length > 21) return;

		setCommunityName(e.target.value);
		setCharsRemaining(21 - e.target.value.length)
	}

	const handleCommunityTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCommunityType(e.target.name as CommunityType)
	}

	const handleCreateCommunity = async () => {

		if (error) setError('');
	//	validate the community
		const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (format.test(communityName) || communityName.length < 3) {
			setError("Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.");
			return;
		}

		// this is async method, so need loading status
		setLoading(true);

		try {
			//	create the community document in fireStore
			//	check the name is not taken
			const communityDocRef = doc(fireStore, 'communites', communityName);

			// transaction means read and write the document/collection
			await runTransaction(fireStore, async (transiction) => {
				const communityDoc = await transiction.get(communityDocRef);

				if (communityDoc.exists()) {
					// let try catch get the error message
					throw new Error(`sorry, the community name r/${communityName} exists, try another please.`)
					// return;
				}

				//	if valid, create one
				transiction.set(communityDocRef, {
					//	create id
					//	created at
					//	numberOfMembers
					// 	privacyType
					creatorId: user?.uid,
					createdAt: serverTimestamp(),
					numberOfMembers: 1,
					privacyType: communityType
				});

			//	create communitySnippets on user 'collection/document/collection/document' format
				transiction.set(doc(fireStore, `users/${user?.uid}/communitySnippets`, communityName), {
					communityId: communityName,
					isModerator: true
				});

			})

			/*const communityDoc = await getDoc(communityDocRef);

			if (communityDoc.exists()) {
				// let try catch get the error message
				throw new Error(`sorry, the community name r/${communityName} exists, try another please.`)
				// return;
			}*/

			/*//	if valid, create one
			await setDoc(communityDocRef, {
				//	create id
				//	created at
				//	numberOfMembers
				// 	privacyType
				creatorId: user?.uid,
				createdAt: serverTimestamp(),
				numberOfMembers: 1,
				privacyType: communityType
			});*/

		} catch (err: any) {
			console.log('handleCreateCommunity error: ', err);
			setError(err?.message);
		}


		setLoading(false);
	}

	return (
		<>
			<Modal isOpen={open} size={'lg'} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader display={'flex'} flexDirection={'column'} fontSize={15}>Create One Community</ModalHeader>
					<Box pl={2} pr={2}>
						<ModalCloseButton />
						<ModalBody
							display={'flex'} flexDirection={'column'} p={'10px 0'}
						>
							<Text fontWeight={600} fontSize={15}>
								name
							</Text>
							<Text fontSize={11} color={'green.200'}>
								Community names including cpitalization cannot be changed
							</Text>
							<Text position={'relative'} top={'28px'} left={'6px'} w={'22px'} color={'gray.300'} >r/</Text>
							<Input
								position={'relative'}
								value={communityName} size={'sm'} pl={'22px'}
								onChange={handleChange}
							/>
							<Text fontSize={'9pt'} color={charsRemaining === 0 ? 'red' : 'gray.300'}>
								{charsRemaining} Characters remaining
							</Text>
							<Text fontSize={'9pt'} color={'red'} mt={1}>{error}</Text>
							<Box mr={3} mb={3} mt={3}>
								<Text fontWeight={400} color={'green.400'} fontSize={15}>Community Type</Text>
								{/*<Checkbox />*/}
								<Stack spacing={2}>
									<Checkbox
										name={'public'} isChecked={communityType === 'public'}
										onChange={handleCommunityTypeChange}
									>
										<Flex align={'center'}>
											<Icon as={BsFillPersonFill} color={'green.300'} mr={1} />
											<Text fontSize={'10pt'} mr={1}>Public</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Anyone can view, post and comment it</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name={'restricted'} isChecked={communityType === 'restricted'}
										onChange={handleCommunityTypeChange}
									>
										<Flex align={'center'}>
											<Icon as={BsFillEyeFill} color={'green.300'} mr={1} />
											<Text fontSize={'10pt'} mr={1}>Restricted</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Anyone can view it only, but the approved user can post it.</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name={'private'} isChecked={communityType === 'private'}
										onChange={handleCommunityTypeChange}
									>
										<Flex align={'center'}>
											<Icon as={HiLockClosed} color={'green.300'} mr={1} />
											<Text fontSize={'10pt'} mr={1}>Private</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Only the approved user can view and comment it</Text>
										</Flex>
									</Checkbox>
								</Stack>
							</Box>
						</ModalBody>
					</Box>
					<ModalFooter bg={'gray.200'} borderRadius={'0 0 10px 10px'}>
						<Button
							variant={'outline'} colorScheme='blue'
							mr={3} onClick={handleClose} h={'30px'}
						>
							Cancel
						</Button>
						<Button
							h={'30px'} isLoading={loading} onClick={handleCreateCommunity}
						>Create Community</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateCommunityModal;

/*
// structure between user and community
const USER = {
	id: 'userId1',

//	subcollection
	communitySnippets: [
		{
			communityId: 'commId1'
		},
		{
			communityId: 'commId2'
		},
		{
			communityId: 'commId3'
		}
	]
}

const COMMUNITY = {
	id: 'commId',
	numberOfMembers: 'xxxxxxx'
}

*/

