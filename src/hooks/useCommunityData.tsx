import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {Community, CommunitySnippet, communityState} from "../atoms/communitiesAtom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../firebase/clientApp";
import {collection, getDocs} from "@firebase/firestore";


/**
 * @define the customHook used to join and leave the community with community state from atom
 */
export const useCommunityData = () => {

	const [user] = useAuthState(auth);
	const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
	// must have the loading and error state with the async function
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// switch between the joined and un-joined state
	const handleToggleJoinCommunity = (communityData: Community, isJoined: boolean) => {
	//	is the user login or not
	//	if not, open the auth modal
		if (isJoined) {
			leaveCommunity(communityData.id);
			return
		}
		joinCommunity(communityData);
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


		} catch (err) {
			console.log('getMySnippets error: ', err)
		}

		setLoading(false);
	}

	const joinCommunity = (communityData: Community) => {}

	const leaveCommunity = (communityId: string) => {}

	useEffect(() => {
		if (!user) return;
		getMySnippets()
	}, [user])

	return {
		communityStateValue,
		handleToggleJoinCommunity
	};
};


