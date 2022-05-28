import React, {useState} from 'react';
import {Flex, Icon} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItemComponent from "./TabItem";
import TextInputComponent from "./PostForm/TextInput";


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

	const handleCreatePost = async () => {

	}

	const handleSelectImage = () => {

	}

	const handleTextChange = () => {

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
							loading={false}
						/>
					)
				}
			</Flex>
		</Flex>
	);
};

export default NewPostFormComponent;
