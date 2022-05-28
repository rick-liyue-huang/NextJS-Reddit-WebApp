import React from 'react';
import {useRecoilState} from "recoil";
import {postState} from "../atoms/postsAtom";

export const usePosts = () => {

	const [postValue, setPostValue] = useRecoilState(postState);

	const handleVote = async () => {

	}

	const handleSelectPost = () => {}

	const handleDeletePost = async () => {

	}

	return {
		postValue,
		setPostValue,
		handleDeletePost,
		handleSelectPost,
		handleVote
	}
};

