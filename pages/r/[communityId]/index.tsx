import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext, NextPage } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { Community } from '../../../atoms/communityAtom';
import { NotFound } from '../../../components/Community/404';
import { CommunityHeader } from '../../../components/Community/CommunityHeader';
import { CreatePostLink } from '../../../components/Community/CreatePostLink';
import { SubLayout } from '../../../components/Layout/SubLayout';
import { db } from '../../../firebase/clientConfig';

interface Props {
  communityData: Community; // it is global so setting in atom
}

const communityIdPage: NextPage<Props> = ({ communityData }) => {
  // console.log(communityData);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <SubLayout>
        <>
          <CreatePostLink />
        </>
        <>
          <div>RHS</div>
        </>
      </SubLayout>
    </>
  );
};

export default communityIdPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // get the community information and render on the page
  try {
    const communityDocRef = doc(
      db,
      'communities',
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            ) // .data() to get the real array
          : '',
      },
    };
  } catch (e: any) {
    // need addtional error page
    console.log(`getServerSideProps [communityId] error: ${e.message}`);
  }
};
