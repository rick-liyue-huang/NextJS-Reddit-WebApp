import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import {
  Community,
  CommunitySnippet,
  communityState,
} from '../atoms/communityAtom';
import { auth, db } from '../firebase/clientConfig';

export const useCommunities = () => {
  const [communityStateVal, setCommunityStateVal] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);

  const handleToggleCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //  is the user signd in?
    // if not, open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const joinCommunity = (communityData: Community) => {};

  const leaveCommunity = (communityId: string) => {};

  const getMyCommunitySnippets = async () => {
    setLoading(true);
    try {
      const snippetsDocs = await getDocs(
        collection(db, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateVal((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));

      console.log('snippets: ', snippets);
    } catch (err) {
      console.log(`getMyCommunitySnippets error`, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyCommunitySnippets();
  }, [user]);

  return {
    communityStateVal,
    joinCommunity,
    leaveCommunity,
    handleToggleCommunity,
    loading,
  };
};
