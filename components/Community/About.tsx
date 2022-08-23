import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { Community, communityState } from '../../atoms/communityAtom';
import { auth, db, storage } from '../../firebase/clientConfig';
import { useSelectImage } from '../../hooks/useSelectImage';

interface Props {
  communityData: Community;
}

export const AboutComponent: React.FC<Props> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedImgRef = useRef<HTMLInputElement>(null);
  const { selectedImg, setSelectedImg, handleSelectImg } = useSelectImage();
  const [uploadingImg, setUploadingImg] = useState(false);
  const setCommunityStateVal = useSetRecoilState(communityState);

  const handleUploadImg = async () => {
    if (!selectedImg) return;
    setUploadingImg(true);
    try {
      // upload the community image to storage
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      uploadString(imageRef, selectedImg, 'data_url');
      const downloadUrl = await getDownloadURL(imageRef);
      console.log(imageRef, downloadUrl);

      // update the community data in firestore
      await updateDoc(doc(db, 'communities', communityData.id), {
        imageUrl: downloadUrl,
      });

      // update the community state globally
      setCommunityStateVal((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageUrl: downloadUrl,
        } as Community,
      }));
    } catch (err) {
      console.log(`handleUploadImg error: `, err);
    }
    setUploadingImg(false);
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify={'space-between'}
        align="center"
        bg="green.500"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction="column"
        p={3}
        bg="white"
        borderRadius={'8px 8px 4px 4px'}
      >
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction={'column'} flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction={'column'} flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex align="center" width="100%" p={1} fontWeight={500}>
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData?.createdAt && (
              <Text>
                Created at{' '}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format('DD/MM/YYYY')}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3}>Create Post</Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="green.500"
                    cursor={'pointer'}
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => selectedImgRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageUrl || selectedImg ? (
                    <Image
                      src={selectedImg || communityData.imageUrl}
                      borderRadius="full"
                      boxSize={'40px'}
                      alt="community img"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="green.500"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedImg &&
                  (uploadingImg ? (
                    <Spinner />
                  ) : (
                    <Text cursor="pointer" onClick={handleUploadImg}>
                      Save Changes
                    </Text>
                  ))}
                <Input
                  id="img-upload"
                  type="file"
                  accept="image/x-png,image/gif, image/jpeg"
                  hidden
                  ref={selectedImgRef}
                  onChange={handleSelectImg}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
