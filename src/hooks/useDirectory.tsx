import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {DirectoryMenuItem, directoryMenuState} from "../atoms/directoryMenuAtom";
import {useRouter} from "next/router";
import {communityState} from "../atoms/communitiesAtom";
import {FaReddit} from "react-icons/fa";

export const useDirectory = () => {

	const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
	const router = useRouter();
	const communityStateValue = useRecoilValue(communityState);

	const handleToggleMenuOpen = () => {
		setDirectoryState(prev => ({
			...prev,
			isOpen: !directoryState.isOpen
		}));
	}

	const handleSelectMenuItem = (menuItem: DirectoryMenuItem) => {
		setDirectoryState(prev => ({
			...prev,
			selectedMenuItem: menuItem
		}));

		router.push(menuItem.link);

		if (directoryState.isOpen) {
			handleToggleMenuOpen();
		}
	};

	// solve the problem to refresh the current community page
	useEffect(() => {
		const {currentCommunity} = communityStateValue;
		if (currentCommunity) {
			setDirectoryState(prev => ({
				...prev,
				selectedMenuItem: {
					displayName: `/r/${currentCommunity.id}`,
					link: `/r/${currentCommunity.id}`,
					imageUrl: currentCommunity.imageUrl,
					icon: FaReddit,
					iconColor: 'green.200'
				}
			}))
		}

	}, [communityStateValue.currentCommunity])

	return {
		directoryState,
		handleToggleMenuOpen,
		handleSelectMenuItem
	}
};

