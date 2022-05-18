import React, {ChangeEvent, useState} from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody, Flex, Icon,
	ModalCloseButton, Button, Box, Divider, Text, Input, Stack, Checkbox, transition
} from '@chakra-ui/react'
import {BsFillEyeFill, BsFillPersonFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import {doc, getDoc, setDoc, serverTimestamp, runTransaction} from "@firebase/firestore";
import {auth, fireStore} from "../../../firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";




interface CreateCommunityProps {
	open: boolean;
	handleClose: () => void
}

const CreateCommunityComponent: React.FC<CreateCommunityProps> = ({open, handleClose}) => {

	// one tip to deal with the character number
	// deal with the input
	const [communityName, setCommunityName] = useState('');
	// deal with input characters remaining
	const [charsRemaining, setCharsRemaining] = useState(21);
	const [communityType, setCommunityType] = useState('public')
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const [user] = useAuthState(auth)

	// deal with the input community name
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (error) setError('')
		if (e.target.value.length > 21) return;

		setCommunityName(e.target.value);
		setCharsRemaining(21 - e.target.value.length)
	}

	// switch the community type
	const handleCommunityTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCommunityType(e.target.name)
	}

	// connect with firebase
	const handleCreateCommunity = async () => {
		// clear the previous error
		if (error) setError('')

	//	validate the community name in client end
		const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (format.test(communityName) || communityName.length < 3) {
			setError('Community name must be between 3-21 characters and only contain letters, numbers, underscore_');
			return;
		}

		//	 will connect with firebase
		setLoading(true);

		try {

			//	create the community document in firebase
			const communityDocRef = doc(fireStore, 'communities', communityName);

			// deal with database crud
			await runTransaction(fireStore, async (transition) => {
				const communityDoc = await transition.get(communityDocRef);  // getDoc

				if (communityDoc.exists()) {
					throw new Error(`sorry, ${communityName} already exists, change another.`) // let catch get the error
					return;
				}

				//	Create community document, match with atom
				transition.set(communityDocRef, {
					//	create id
					creatorId: user?.uid,
					//	createAt
					createdAt: serverTimestamp(),
					//	number of members
					numberOfMembers: 1,
					//	privacy type
					privacyType: communityType
				});

			//	create community snippets on user 'collection/document/collection/document'
				transition.set(doc(fireStore, `users/${user?.uid}/communitySnippets`, communityName), {
					communityId: communityName,
					isModerator: true // can be modified by current user
				})

			})




			//	Create community document
			/*await setDoc(communityDocRef, {
				//	create id
				creatorId: user?.uid,
				//	createAt
				createdAt: serverTimestamp(),
				//	number of members
				numberOfMembers: 1,
				//	privacy type
				privacyType: communityType
			});*/

		} catch (err: any) {
			console.log('handleCreateCommunity method is error: ', err)
			setError(err.message)
		}

		setLoading(false);
	}

	return (
		<>
			<Modal isOpen={open} onClose={handleClose} size={'lg'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						display={'flex'} flexDirection={'column'} fontSize={15} p={3}
					>Create One Community</ModalHeader>
					<Box pr={2} pl={2}>
						<ModalCloseButton />
						<Divider />
						<ModalBody
							display={'flex'} flexDirection={'column'} p={'6px 0'}
						>
							<Text fontWeight={600}>Name</Text>
							<Text fontSize={11} color={'gray.500'}>Community name including Capitalization cannot be changed</Text>
							<Text position={'relative'} top={'28px'} left={'8px'} w={'20px'} color={'gray.200'}>
								r/
							</Text>
							<Input
								size={'sm'} pl={'22px'} value={communityName} position={'relative'}
								onChange={handleChange}
							/>
							<Text fontSize={'9pt'} color={charsRemaining === 0 ? 'red' : 'gray.200'}
							>{charsRemaining} Characters remaining</Text>
							<Text fontSize={'9pt'} color={'red'}>{error}</Text>
							<Box mt={4} mb={3}>
								<Text fontWeight={500} fontSize={'10pt'}>
									Community Type
								</Text>
								{/*<Checkbox />*/}
								<Stack spacing={2}>
									<Checkbox
										name={'public'} onChange={handleCommunityTypeChange}
										isChecked={communityType === 'public'}
									>
										<Flex align={'center'}>
											<Icon as={BsFillPersonFill} color={'gree.300'} mr={2} />
											<Text fontSize={'10pt'} mr={1}>Public</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Anyone can view, post and comment to this community</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name={'restricted'} onChange={handleCommunityTypeChange}
										isChecked={communityType === 'restricted'}
									>
										<Flex align={'center'}>
											<Icon as={BsFillEyeFill} color={'gree.300'} mr={2} />
											<Text fontSize={'10pt'} mr={1}>Restricted</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Anyone can view this community only</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name={'private'} onChange={handleCommunityTypeChange}
										isChecked={communityType === 'private'}>
										<Flex align={'center'}>
											<Icon as={HiLockClosed} color={'gree.300'} mr={2} />
											<Text fontSize={'10pt'} mr={1}>Private</Text>
											<Text fontSize={'8pt'} color={'green.200'}>Only the approved user can see</Text>
										</Flex>
									</Checkbox>
								</Stack>
							</Box>
						</ModalBody>
					</Box>
					<ModalFooter bg={'gray.200'} borderRadius={'0 0 10px 10px'}>
						<Button variant='outline' h={'30px'} mr={3} onClick={handleClose}>
							Cancel
						</Button>
						<Button h={'30px'} onClick={handleCreateCommunity} isLoading={loading}
						>Create Community</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
};

export default CreateCommunityComponent;
