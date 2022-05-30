import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {Community, CommunitySnippet, communityState} from "../atoms/communitiesAtom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../firebase/clientApp";
import {collection, getDocs, writeBatch, doc, increment} from "@firebase/firestore";
import {authModalState} from "../atoms/authModalAtom";


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

	useEffect(() => {
		if (!user) {
			setCommunityStateValue(prev => ({
				...prev,
				mySnippets: []
			}));
			return
		}
		getMySnippets()
	}, [user])

	return {
		communityStateValue,
		handleToggleJoinCommunity,
		loading
	};
};


