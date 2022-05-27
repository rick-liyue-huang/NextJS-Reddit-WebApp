import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {communityState} from "../atoms/communitiesAtom";


/**
 * @define the customHook used to join and leave the community with community state from atom
 */
export const useCommunityData = () => {

	const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);

	const joinCommunity = () => {}

	const leaveCommunity = () => {}

	return {
		communityStateValue,
		joinCommunity,
		leaveCommunity
	};
};


