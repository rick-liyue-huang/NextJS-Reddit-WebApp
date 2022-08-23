import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { Community } from '../../atoms/communityAtom';

interface Props {
  communityData: Community;
}

export const AboutComponent: React.FC<Props> = ({ communityData }) => {
  const router = useRouter();

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
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button mt={3}>Create Post</Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};
