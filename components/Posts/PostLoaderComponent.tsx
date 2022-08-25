import {
  Box,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';

export const PostLoaderComponent: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.600');
  return (
    <Box padding="6" boxShadow="lg" bg={bg}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};
