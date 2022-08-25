import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../../atoms/communityAtom';
import { CreateCommunityModal } from '../../modal/Community/CreateCommunityModal';
import { MenuListComponent } from './MenuList';

export const CommunitiesComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal handleClose={() => setOpen(false)} open={open} />
      <Box mt={3} mb={3}>
        <Text pl={3} mb={1} fontSize="9pt" fontWeight={500} color="gray.500">
          Modrating
        </Text>

        {mySnippets
          .filter((snip) => snip.isModerator)
          .map((snip) => (
            <MenuListComponent
              key={snip.communityId}
              icon={FaReddit}
              displayName={`r/${snip.communityId}`}
              link={`/r/${snip.communityId}`}
              iconColor="green.500"
              imageUrl={snip.imageUrl}
            />
          ))}
      </Box>
      <Box mt={3} mb={3}>
        <Text pl={3} mb={1} fontSize="9pt" fontWeight={500} color="gray.500">
          My Communities
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: 'gray.100' }}
          // open the community modal creator
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snip) => (
          <MenuListComponent
            key={snip.communityId}
            icon={FaReddit}
            displayName={`r/${snip.communityId}`}
            link={`/r/${snip.communityId}`}
            iconColor="green.500"
            imageUrl={snip.imageUrl}
          />
        ))}
      </Box>
    </>
  );
};
