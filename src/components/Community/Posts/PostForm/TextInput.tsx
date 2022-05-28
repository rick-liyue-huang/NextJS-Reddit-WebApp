import React, {ChangeEvent, useState} from 'react';
import {Stack, Input, Textarea, Flex, Button} from "@chakra-ui/react";

interface TextInputProps {
	loading: boolean
	textInputs: {
		title: string;
		body: string;
	};
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleCreatePost: () => void;
}

const TextInputComponent: React.FC<TextInputProps> = ({textInputs, loading, handleCreatePost, onChange}) => {

	return (
		<Stack
			spacing={3} w={'100%'}
		>
			<Input
				name={'title'}
				value={textInputs.title}
				onChange={onChange}
				fontSize={'10pt'} borderRadius={3}
				placeholder={'Title'}
				_placeholder={{color: 'green.100'}}
				_focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.300'}}
			/>
			<Textarea
				name={'body'} h={'100px'}
				value={textInputs.body}
				onChange={onChange}
				fontSize={'10pt'} borderRadius={3}
				placeholder={'optional text'}
				_placeholder={{color: 'green.100'}}
				_focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.300'}}
			/>
			<Flex justify={'flex-end'}>
				<Button
					h={'34px'} p={'0 30px'} isLoading={loading}
					disabled={!textInputs.title}
					onClick={() => handleCreatePost()} >Post</Button>
			</Flex>
		</Stack>
	);
};

export default TextInputComponent;
