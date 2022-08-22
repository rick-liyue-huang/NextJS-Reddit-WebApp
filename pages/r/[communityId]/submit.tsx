import { Box, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { SubLayout } from '../../../components/Layout/SubLayout';
import { NewPostForm } from '../../../components/Posts/NewPostForm';

const SubmitPost: NextPage = () => {
  return (
    <SubLayout>
      <>
        <Box p="14px 0px" borderBottom={'1px solid'} borderColor="white">
          <Text>Create A Post</Text>
        </Box>
        {/* <NewPostForm /> */}
        <NewPostForm />
      </>
      <>{/* <About /> */}</>
    </SubLayout>
  );
};

export default SubmitPost;
