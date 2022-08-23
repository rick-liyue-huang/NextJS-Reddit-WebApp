import { ChangeEvent, useState } from 'react';

export const useSelectImage = () => {
  const [selectedImg, setSelectedImg] = useState('');

  const handleSelectImg = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // confirm the question mark
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedImg(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedImg,
    setSelectedImg,
    handleSelectImg,
  };
};
