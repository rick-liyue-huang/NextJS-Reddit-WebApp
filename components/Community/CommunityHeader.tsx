import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../atoms/communityAtom';
import { useCommunities } from '../../hooks/useCommunities';

interface Props {
  communityData: Community;
}

export const CommunityHeader: React.FC<Props> = ({ communityData }) => {
  const { communityStateVal, handleToggleCommunity, loading } =
    useCommunities();

  const isJoined = !!communityStateVal.mySnippets.find(
    (com) => com.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="150px">
      <Box height="50%" bg="green.400" />
      <Flex justify={'center'} bg="white" flexGrow={1}>
        <Flex width={'95%'} maxWidth="860px">
          {communityStateVal.currentCommunity?.imageUrl ? (
            <Image
              src={communityStateVal.currentCommunity.imageUrl}
              borderRadius="full"
              boxSize="66px"
              alt="community img"
              position="relative"
              top={-2}
              color="green.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="green.500"
              border="4px solid white"
              borderRadius={'50%'}
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction={'column'} mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="9pt">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              height={'30px'}
              pr={6}
              pl={6}
              variant={isJoined ? 'outline' : 'solid'}
              isLoading={loading}
              onClick={() => handleToggleCommunity(communityData, isJoined)}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
