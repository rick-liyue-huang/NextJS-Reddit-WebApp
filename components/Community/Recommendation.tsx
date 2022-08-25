import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../atoms/communityAtom';
import { db } from '../../firebase/clientConfig';
import { useCommunities } from '../../hooks/useCommunities';

export const Recommendation: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateVal, handleToggleCommunity } = useCommunities();

  const handleGetRecommendedCommunities = async () => {
    setLoading(true);
    try {
      const communitiesQuery = query(
        collection(db, 'communities'),
        orderBy('numberOfMembers', 'desc'),
        limit(6)
      );
      const communityDocs = await getDocs(communitiesQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecommendations(communities as Community[]);
    } catch (err) {
      console.log(`handleGetRecommendedCommunities error: `, err);
    }
    setLoading(false);
  };

  const handleShowAll = async () => {
    setLoading(true);
    try {
      const communitiesQuery = query(
        collection(db, 'communities'),
        orderBy('numberOfMembers', 'desc')
      );
      const communityDocs = await getDocs(communitiesQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecommendations(communities as Community[]);
    } catch (err) {
      console.log(`handleGetRecommendedCommunities error: `, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetRecommendedCommunities();
  }, []);

  return (
    <Flex
      direction={'column'}
      bg="white"
      // borderRadius={'full'}
      border="1px solid"
      borderColor={'gray.300'}
    >
      <Flex
        color="lightgreen"
        align="flex-end"
        border="white"
        p="6px 10px"
        height={'70px'}
        // borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/recbg.webp)"
        backgroundSize={'cover'}
        bgGradient="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2)), url(/images/recbg.webp)"
      >
        Top Communities
      </Flex>
      <Flex direction={'column'}>
        {loading ? (
          <Stack mr={2} p={2}>
            <Flex justify={'space-between'} align="center">
              <SkeletonCircle size="9" />
              <Skeleton height="9px" width="75%" />
            </Flex>
            <Flex justify={'space-between'} align="center">
              <SkeletonCircle size="9" />
              <Skeleton height="9px" width="75%" />
            </Flex>
            <Flex justify={'space-between'} align="center">
              <SkeletonCircle size="9" />
              <Skeleton height="9px" width="75%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {recommendations.map((rec, index) => {
              const isJoned = !!communityStateVal.mySnippets.find(
                (snip) => snip.communityId === rec.id
              );
              return (
                <Link key={rec.id} href={`/r/${rec.id}`}>
                  <Flex
                    align={'center'}
                    fontSize="10pt"
                    borderBottom={'1px solid'}
                    borderColor="gray.300"
                    p="10px 12px"
                    position="relative"
                  >
                    <Flex width={'85%'} align="center">
                      <Flex width="10%">
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align={'center'} width="85%">
                        {rec.imageUrl ? (
                          <Image
                            src={rec.imageUrl}
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            fontSize={30}
                            color="green.500"
                            mr={2}
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {`r/${rec.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box position="absolute" right="10%">
                      <Button
                        height="22px"
                        fontSize={'8pt'}
                        variant={isJoned ? 'outline' : 'solid'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCommunity(rec, isJoned);
                        }}
                      >
                        {isJoned ? 'Joined' : 'Join'}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}

            {/* one more  */}
            <Box p="10px 20px">
              {/* TODO  show all the list here */}
              <Button
                height="30px"
                width="100%"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowAll();
                }}
              >
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
