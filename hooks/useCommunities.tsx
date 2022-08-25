import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
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
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleToggleCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //  is the user signd in?

    if (!user) {
      // if not, open auth modal
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    setLoading(true);

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      // create a new community snippets
      // update the number of members on the creent community
      const batch = writeBatch(db);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageUrl || '',
        isModerator: user?.uid === communityData.creatorId, // match with the 'CommunitiesComponent' part
      };
      batch.set(
        doc(db, `users/${user?.uid}/communitySnippets`, communityData.id),
        newSnippet
      );

      batch.update(doc(db, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      // update the recoil CommunityState.mySnippets
      setCommunityStateVal((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (err: any) {
      console.log(`joinCommunity`, err);
      setError(err.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    // delete the community snippet

    try {
      const batch = writeBatch(db);
      batch.delete(
        doc(db, `users/${user?.uid}/communitySnippets`, communityId)
      );

      batch.update(doc(db, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateVal((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (err: any) {
      console.log(`leaveCommunity`, err);
      setError(err.message);
    }
    setLoading(false);
  };

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

  // similar as 'handleGetCommunityPostVote'
  const handleGetCommunityInfo = async (communityId: string) => {
    try {
      const communityDocRef = doc(db, 'communities', communityId);
      const communityDoc = await getDoc(communityDocRef);

      setCommunityStateVal((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (err) {
      console.log(`handleGetCommunityInfo error: `, err);
    }
  };

  useEffect(() => {
    if (!user) {
      // return;
      setCommunityStateVal((prev) => ({
        ...prev,
        mySnippets: [],
      }));
      return;
    }
    getMyCommunitySnippets();
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId && !communityStateVal.currentCommunity) {
      handleGetCommunityInfo(communityId as string);
    }
  }, [router.query, communityStateVal.currentCommunity]);

  return {
    communityStateVal,
    joinCommunity,
    leaveCommunity,
    handleToggleCommunity,
    loading,
  };
};
