import React, {ChangeEvent, useState} from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Flex, Icon, Text} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItemComponent from "./TabItem";
import TextInputComponent from "./PostForm/TextInput";
import ImageUploadComponent from "./PostForm/ImageUpload";
import {Post} from "../../../atoms/postsAtom";
import {User} from "firebase/auth";
import {useRouter} from "next/router";
import {addDoc, collection, serverTimestamp, Timestamp, updateDoc} from "@firebase/firestore";
import {fireStore, storage} from "../../../firebase/clientApp";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";


interface NewPostFormProps {
	user: User;
}

export interface FormTabItem {
	title: string;
	icon: typeof Icon.arguments
}

const formTabs: FormTabItem[] = [
	{
		title: 'Post',
		icon: IoDocumentText
	},
	{
		title: 'Images & Video',
		icon: IoImageOutline
	},
	{
		title: 'Link',
		icon: BsLink45Deg
	},
	{
		title: 'Poll',
		icon: BiPoll
	},
	{
		title: 'Talk',
		icon: BsMic
	}
];

interface InputProps {
	title: string;
	body: string;
}

const NewPostFormComponent: React.FC<NewPostFormProps> = ({user}) => {

	const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
	const [textInputs, setTextInputs] = useState<InputProps>({
		title: '',
		body: ''
	});
	const [selectedFile, setSelectedFile] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const router = useRouter();


	const handleCreatePost = async () => {

		const {communityId} = router.query

	//	create new post object
	//	 this is global state, so need to define in recoil
		const newPost: Post = {
			communityId: communityId as string,
			creatorId: user?.uid,
			creatorDisplayName: user.email!.split('@')[0],
			title: textInputs.title,
			body: textInputs.body,
			numberOfComments: 0,
			voteStatus: 0,
			createdAt: serverTimestamp() as Timestamp,
		};

		setLoading(true);
		try {
			//	store the post in firebase store
			const postDocRef = await addDoc(collection(fireStore, `posts`), newPost);


			//	notice: ensure that a post has successfully been created and stored in our database
			//	before actually uploading that associated image into our storage.
			//	store file in firebase storage

			//	check for selected file
			if (selectedFile) {
				const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
				await uploadString(imageRef, selectedFile, 'data_url');
				const downloadUrl = await getDownloadURL(imageRef);

			//	update post doc by adding imageUrl
				await updateDoc(postDocRef, {
					imageUrl: downloadUrl
				});

			}

		} catch (err: any) {
			console.log('handlecreaetepost error: ', err.message);
			setError(true);
		}
		setLoading(false);

	//	redirect the user back to the communityPage
		router.back();
	}

	// transfer the func to ImageUpload
	const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {

		// the typical method to upload the file to server
		const reader = new FileReader();

		if (e.target.files?.[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			if (readerEvent.target?.result) {
				setSelectedFile(readerEvent.target?.result as string);
			}
		}
	}

	// transfer the func to TextInput
	const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {target: {name, value}} = e;
		setTextInputs(prev => ({
			...prev,
			[name]: value
		}));
	}

	return (
		<Flex
			direction={'column'} bg={'white'} borderRadius={4} mt={2}
		>
			<Flex w={'100%'}>
				{
					formTabs.map(item => (
						<TabItemComponent
							key={item.title} item={item} selected={item.title === selectedTab}
							setSelectedTab={setSelectedTab}
						/>
					))
				}
			</Flex>
			<Flex mt={3}>
				{
					selectedTab === 'Post' && (
						<TextInputComponent
							textInputs={textInputs}
							handleCreatePost={handleCreatePost}
							onChange={handleTextChange}
							loading={loading}
						/>
					)
				}
				{
					selectedTab === 'Images & Video' && (
						<ImageUploadComponent
							selectedFile={selectedFile}
							setSelectedTab={setSelectedTab}
							setSelectedFile={setSelectedFile}
							handleSelectImage={handleSelectImage}
						/>
					)
				}
			</Flex>
			{
				error && (
					<Alert status='error' color={'gray.500'} fontSize={'10pt'} fontWeight={300}>
						<AlertIcon />
						<Text mr={2}>Create post error</Text>
					</Alert>
				)
			}
		</Flex>
	);
};

export default NewPostFormComponent;
