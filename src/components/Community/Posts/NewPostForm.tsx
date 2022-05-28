import React, {ChangeEvent, useState} from 'react';
import {Flex, Icon} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItemComponent from "./TabItem";
import TextInputComponent from "./PostForm/TextInput";
import ImageUploadComponent from "./PostForm/ImageUpload";


interface NewPostFormProps {

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

const NewPostFormComponent: React.FC<NewPostFormProps> = () => {

	const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
	const [textInputs, setTextInputs] = useState<InputProps>({
		title: '',
		body: ''
	});
	const [selectedFile, setSelectedFile] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const handleCreatePost = async () => {

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
		</Flex>
	);
};

export default NewPostFormComponent;
