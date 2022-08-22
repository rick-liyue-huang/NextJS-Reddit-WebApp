import { Flex, Icon } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { FormInput } from './PostForm/FormInput';
import { TabItemComponent } from './TabItem';

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const formTabs: TabItem[] = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Iamges & Video',
    icon: IoImageOutline,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  {
    title: 'Talk',
    icon: BsMic,
  },
];

export const NewPostForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInput, setTextInput] = useState({
    title: '',
    body: '',
  });
  const [selectFile, setSelectFile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {};

  const handleSelectImg = () => {};

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((tab) => (
          <TabItemComponent
            key={tab.title}
            item={tab}
            selected={tab.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={2}>
        {selectedTab === 'Post' && (
          <FormInput
            formInputProps={textInput}
            onChange={handleTextChange}
            loading={loading}
            handleCreatePost={handleCreatePost}
          />
        )}
      </Flex>
    </Flex>
  );
};
