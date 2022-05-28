import React, {ChangeEvent, useRef} from 'react';
import {Flex, Button, Input, Image, Stack} from "@chakra-ui/react";

interface ImageUploadProps {
	selectedFile?: string;
	handleSelectImage: (e: ChangeEvent<HTMLInputElement>) => void;
	setSelectedTab: (value: string) => void;
	setSelectedFile: (value: string) => void;
}

const ImageUploadComponent: React.FC<ImageUploadProps> = ({
	selectedFile, handleSelectImage, setSelectedTab, setSelectedFile
}) => {

	const selectedFileRef = useRef<HTMLInputElement>(null);

	return (
		<Flex
			justify={'center'} align={'center'} w={'100%'} direction={'column'}
		>
			{
				selectedFile ? (
					<>
						<Image src={selectedFile} maxW={'400px'} maxH={'400px'} />
						<Stack direction={'row'} mt={3} mb={3}>
							<Button
								h={'28px'} onClick={() => setSelectedTab('Post')}
							>Back To Post</Button>
							<Button
								variant={'outline'} h={'28px'} onClick={() => setSelectedFile('')}
							>Remove</Button>
						</Stack>
					</>
				) : (
					<Flex
						justify={'center'} align={'center'} p={20}
						border={'1px solid'} borderColor={'green.200'} w={'100%'}
						borderRadius={3}
					>
						<Button
							variant={'outline'} height={'28px'}
							onClick={() => selectedFileRef.current?.click()}
						>Upload</Button>
						{/* hidden the input */}
						<Input
							ref={selectedFileRef} type={'file'} hidden
							onChange={handleSelectImage}
						/>
						<Image src={selectedFile} />
					</Flex>
				)
			}
		</Flex>
	);
};

export default ImageUploadComponent;
