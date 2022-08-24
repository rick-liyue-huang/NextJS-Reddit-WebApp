import { Box, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AboutComponent } from '../../../components/Community/About';
import { SubLayout } from '../../../components/Layout/SubLayout';
import { NewPostForm } from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientConfig';
import { useCommunities } from '../../../hooks/useCommunities';

const SubmitPost: NextPage = () => {
  const [user] = useAuthState(auth);
  // const communityStateVal = useRecoilValue(communityState);
  const { communityStateVal } = useCommunities();

  console.log('current community :', communityStateVal);

  return (
    <SubLayout>
      <>
        <Box p="14px 0px" borderBottom={'1px solid'} borderColor="white">
          <Text>Create A Post</Text>
        </Box>
        {/* <NewPostForm /> */}
        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* <AboutComponent />   */}
        {communityStateVal.currentCommunity && (
          <AboutComponent communityData={communityStateVal.currentCommunity} />
        )}
      </>
    </SubLayout>
  );
};

export default SubmitPost;
