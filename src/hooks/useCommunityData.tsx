import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {Community, CommunitySnippet, communityState} from "../atoms/communitiesAtom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../firebase/clientApp";
import {collection, getDocs, writeBatch, doc, increment, getDoc} from "@firebase/firestore";
import {authModalState} from "../atoms/authModalAtom";
import {useRouter} from "next/router";


/**
 * @define the customHook used to join and leave the community with community state from atom
 */
export const useCommunityData = () => {

	const [user] = useAuthState(auth);
	const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
	// must have the loading and error state with the async function
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();

	// switch between the joined and un-joined state
	const handleToggleJoinCommunity = async (communityData: Community, isJoined: boolean) => {
	//	is the user login or not
	//	if not, open the auth modal
		if (!user) {
			// open modal
			setAuthModalState({open: true, view: 'login'});
			return;
		}

		if (isJoined) {
			await leaveCommunity(communityData.id);
			return
		}
		await joinCommunity(communityData);
	}

	// get from firebase
	const getMySnippets = async () => {

		setLoading(true);

		try {
		//	get user snippets, this is array of collections
			const snippetsDocs = await getDocs(collection(fireStore, `users/${user?.uid}/communitySnippets`));
			// convert the docs to object,
			const snippets = snippetsDocs.docs.map(doc => ({...doc.data()}));
			console.log('snippets: ', snippets);
			// and store them in global recoil state
			setCommunityStateValue(prev => ({
				...prev,
				mySnippets: snippets as CommunitySnippet[]
			}))


		} catch (err: any) {
			console.log('getMySnippets error: ', err)
			setError(err.message);
		}

		setLoading(false);
	}

	const joinCommunity = async (communityData: Community) => {

		setLoading(true);

		try {

			//	here we use batch operation to write the collections together
			//	create a new community snippet
			const batch = writeBatch(fireStore);
			const newSnippet: CommunitySnippet = {
				communityId: communityData.id,
				imageUrl: communityData.imageUrl || '',
				isModerator: user?.uid === communityData.creatorId,
			};
			batch.set(doc(fireStore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);

			//	update the number of members
			batch.update(doc(fireStore, 'communities', communityData.id), {
				// TODO: can increase unlimited
				numberOfMembers: increment(1),
			});

		//	affect the firebase store
			await batch.commit();

			//	update recoil state: communityState.mySnippets
			setCommunityStateValue(prev => ({
				...prev,
				mySnippets: [...prev.mySnippets, newSnippet]
			}));

		} catch (err: any) {
			console.log('joinCommunity error: ', err);
			setError(err.message)
		}

		setLoading(false);

	}

	const leaveCommunity = async (communityId: string) => {

		setLoading(true);

		try {

			//	here we use batch operation to write the documents together
			const batch = writeBatch(fireStore);
			//	delete a new community snippet
			batch.delete(doc(fireStore, `users/${user?.uid}/communitySnippets`, communityId));

			//	update the number of members
			batch.update(doc(fireStore, 'communities', communityId), {
				numberOfMembers: increment(-1),
			});
			await batch.commit();

			//	update recoil state: communityState.mySnippets
			setCommunityStateValue(prev => ({
				...prev,
				mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId)
			}));


		} catch (err: any) {
			console.log('leaveCommunity error: ', err.message);
		}

		setLoading(false);
	}

	// same as fetchPost in pid.txt, to solve the problem of refresh the single post page and no about component
	const getCommunityData = async (communityId: string) => {
		try {

			const communityDoRef = doc(fireStore, 'communities', communityId);
			const communityDoc = await getDoc(communityDoRef);
			setCommunityStateValue(prev => ({
				...prev,
				currentCommunity: {id: communityDoc.id, ...communityDoc.data()} as Community
			}));

		} catch (err: any) {
			console.log('getCommunityData error: ', err.message)
		}
	}

	useEffect(() => {
		if (!user) {
			setCommunityStateValue(prev => ({
				...prev,
				mySnippets: []
			}));
			return
		}
		getMySnippets()
	}, [user]);

	useEffect(() => {
		const {communityId} = router.query;

		if (communityId && !communityStateValue.currentCommunity) {
			getCommunityData(communityId as string);
		}
	}, [router.query, communityStateValue.currentCommunity]);

	return {
		communityStateValue,
		handleToggleJoinCommunity,
		loading
	};
};


