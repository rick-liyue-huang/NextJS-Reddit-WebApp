import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { auth } from '../../firebase/clientConfig';
import { useDropDirectory } from '../../hooks/useDropDirectory';
import { CreateCommunityModal } from '../modal/Community/CreateCommunityModal';

export const PersonalComponent: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { handleToggleCommunityMenuOpen } = useDropDirectory();
  const [open, setOpen] = useState(false);
  const bg = useColorModeValue('white', 'gray.600');

  const handleCreatePost = () => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }
    const { communityId } = router.query;

    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }
    handleToggleCommunityMenuOpen();
  };

  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/personal.webp)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2)), url(/images/personal.webp)"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="green.500" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit frontpage, built for you.
          </Text>
          <Button height="30px" onClick={handleCreatePost}>
            Create Post
          </Button>
          <Button
            variant="outline"
            height="30px"
            onClick={() => {
              if (!user) {
                setAuthModalState({ open: true, view: 'login' });
                return;
              }
              setOpen(true);
            }}
          >
            Create Community
          </Button>
        </Stack>
      </Flex>
      <CreateCommunityModal handleClose={() => setOpen(false)} open={open} />
    </Flex>
  );
};
