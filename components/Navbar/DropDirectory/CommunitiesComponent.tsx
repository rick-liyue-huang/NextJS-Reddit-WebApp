import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { CreateCommunityModal } from '../../modal/Community/CreateCommunityModal';

export const CommunitiesComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal handleClose={() => setOpen(false)} open={open} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.100' }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
