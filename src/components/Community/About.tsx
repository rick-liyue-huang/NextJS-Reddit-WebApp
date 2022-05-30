import React, {useRef, useState} from 'react';
import Link from 'next/link';
import {Community, communityState} from "../../atoms/communitiesAtom";
import {Box, Flex, Text, Icon, Stack, Divider,
	Button, Image, Spinner, Input} from "@chakra-ui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {RiCakeLine} from "react-icons/ri";
import moment from "moment";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore, storage} from "../../firebase/clientApp";
import {useSelectFile} from "../../hooks/useSelectFile";
import {FaReddit} from "react-icons/fa";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {updateDoc, doc} from "@firebase/firestore";
import {useSetRecoilState} from "recoil";




interface AboutProps {
	communityData: Community
}

const AboutComponent: React.FC<AboutProps> = ({communityData}) => {

	const router = useRouter();
	const [user] = useAuthState(auth);
	const selectedFileRef = useRef<HTMLInputElement>(null);
	const {selectedFile, setSelectedFile, handleSelectImage} = useSelectFile();
	const [uploadingImg, setUploadingImg] = useState(false);
	const setCommunityStateValue = useSetRecoilState(communityState);

	// change the community image
	const handleUpdateImg = async () => {

		if (!selectedFile) return;
		setUploadingImg(true);

		try {
			// search from storage
			const imageRef = ref(storage, `communities/${communityData.id}/image`)
			await uploadString(imageRef, selectedFile, 'data_url');
			const downloadUrl = await getDownloadURL(imageRef);

			// update the community snippets under users
			await updateDoc(doc(fireStore, 'communities', communityData.id), {
				imageUrl: downloadUrl
			});

			// update global recoil state
			setCommunityStateValue(prev => ({
				...prev,
				currentCommunity: {
					...prev.currentCommunity,
					imageUrl: downloadUrl
				} as Community
			}))

		} catch (err: any) {
			console.log('handleUpdateImg error: ', err.message);
		}

		setUploadingImg(false);
	}

	return (
		<Box position={'sticky'} top={'16px'}>
			<Flex
				justify={'space-between'} align={'center'} bg={'green.300'}
				color={'white'} p={3} borderRadius={'4px 4px 0 0'}
			>
				<Text fontSize={'10pt'} fontWeight={700}>About Community</Text>
				<Icon as={HiOutlineDotsHorizontal} />
			</Flex>
			<Flex
				direction={'column'} p={3} bg={'white'} borderRadius={'0 0 3px 3px'}
			>
				<Stack>
					<Flex w={'100%'} p={2} fontSize={'10pt'} >
						<Flex direction={'column'} flexGrow={1} fontWeight={700}>
							<Text>{communityData.numberOfMembers.toLocaleString()}</Text>
							<Text>Members</Text>
						</Flex>
						<Flex direction={'column'} flexGrow={1}>
							<Text>1</Text>
							<Text>Online</Text>
						</Flex>
					</Flex>
					<Divider />
					<Flex
						align={'center'} w={'100%'} p={1} fontWeight={500} fontSize={'10pt'}
					>
						<Icon as={RiCakeLine} fontSize={18} mr={2} />
						<Text>
							Created{" "}
							{moment(new Date(communityData.createdAt.seconds * 1000)).format('DD MMM YYYY')}
						</Text>
					</Flex>
					{/*<Link href={`/r/${router.query.communityId}/submit`} >*/}
					<Link href={`/r/${communityData.id}/submit`} >
						<Button mt={3}>Create Post</Button>
					</Link>
					{
						user?.uid === communityData.creatorId && (
							<>
								<Divider />
								<Stack spacing={1} fontSize={'10pt'}>
									<Text fontWeight={600}>Admin</Text>
									<Flex align={'center'} justify={'space-between'}>
										<Text
											color={'green.300'} cursor={'pointer'}
											_hover={{textDecoration: 'underline'}}
											onClick={() => selectedFileRef.current?.click()}
										>Change Image</Text>
										{
											communityData.imageUrl || selectedFile ? (
												<Image src={selectedFile || communityData.imageUrl}
															 borderRadius={'full'} boxSize={'40px'} alt={'community image'}
												/>
											) : (
												<Icon
													as={FaReddit} fontSize={'40px'} color={'green.200'} mr={2}
												/>
											)
										}
									</Flex>
									{
										selectedFile && (
											(
												uploadingImg ? (
													<Spinner />
												) : (
													<Text cursor={'pointer'} onClick={handleUpdateImg}>Save Changes</Text>
												)
											)
										)
									}
									<Input
										id={'file-upload'} type={'file'} accept={'image/x-png,image/gif,image/jpeg'}
										hidden ref={selectedFileRef} onChange={handleSelectImage}
									/>
								</Stack>
							</>
						)
					}
				</Stack>
			</Flex>
		</Box>
	);
};

export default AboutComponent;
