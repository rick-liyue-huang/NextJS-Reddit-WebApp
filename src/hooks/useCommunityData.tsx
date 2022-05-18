import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {Community, communityState} from "../atoms/communitiesAtom";
import communityId from "../pages/r/[communityId]";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../firebase/clientApp";
import {collection, getDocs} from "@firebase/firestore";


/**
 * @define the global custom hook to communicate each the components
 */
export const useCommunityData = () => {

	const [communityStateVal, setCommunityStateVal] = useRecoilState(communityState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [user] = useAuthState(auth)

	const handleToggleJoinCommunity = (communityData: Community, isJoined: boolean) => {
	//	 is the user login?
	//	if not => open auth moal
		if (isJoined) {
			leaveCommunity(communityData.id)
			return;
		}
		joinCommunity(communityData);
	}

	const getMySnippets = async () => {

		setLoading(true)
		try {
		//	get users snippets
			const snippetDocs = await getDocs(collection(fireStore, `users/${user?.uid}/communitySnippets`));
			const snippets = snippetDocs.docs.map(doc => ({...doc.data()}));
			console.log('snippets here: ', snippets);
		} catch (err) {
			console.log('getMySnippets error: ', err)
		}
	}

	const joinCommunity = (communityData: Community) => {}

	const leaveCommunity = (communityId: string) => {}

	useEffect(() => {
		if (!user) return;
		getMySnippets();
	}, [user])

	// export the function
	return {
		communityStateVal,
		handleToggleJoinCommunity
	}
};

