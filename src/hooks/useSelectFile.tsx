import React, {ChangeEvent, useState} from 'react';

export const useSelectFile = () => {

	const [selectedFile, setSelectedFile] = useState<string>('');

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

	return {
		selectedFile,
		setSelectedFile,
		handleSelectImage
	}
};

