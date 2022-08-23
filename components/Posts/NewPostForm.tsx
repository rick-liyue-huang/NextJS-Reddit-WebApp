import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { Post } from '../../atoms/postAtom';
import { db, storage } from '../../firebase/clientConfig';
import { FormImage } from './PostForm/FormImage';
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

interface Props {
  user: User;
}

export const NewPostForm: React.FC<Props> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInput, setTextInput] = useState({
    title: '',
    body: '',
  });
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // create a new post object
    const newPost: Post = {
      creatorId: user?.uid,
      communityId: communityId as string,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    // store post in firebase
    try {
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);

      // store the image in storage
      if (selectedImg) {
        // match with the delete post image storage bucket
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedImg, 'data_url');
        const downloadUrl = await getDownloadURL(imageRef);

        // update the post doc by adding image url
        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        });
      }

      // redirect to post page
      router.back();
    } catch (err: any) {
      console.log(`handleCreatePost err `, err.message);
      setError(true);
    }
    setLoading(false);
  };

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
        {selectedTab === 'Iamges & Video' && (
          <FormImage
            handleSelectImg={handleSelectImg}
            setSelectedImg={setSelectedImg}
            setSelectedTab={setSelectedTab}
            selectedImg={selectedImg}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>errors happend in creating post </Text>
        </Alert>
      )}
    </Flex>
  );
};
