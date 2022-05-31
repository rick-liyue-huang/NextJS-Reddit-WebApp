
import {atom} from "recoil";
import {IconType} from "react-icons";
import {TiHome} from "react-icons/ti";

export interface DirectoryMenuItem {
	icon: IconType;
	displayName: string;
	link: string;
	iconColor: string;
	imageUrl?: string;
}

interface DirectoryMenuState {
	isOpen: boolean;
	selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem: DirectoryMenuItem = {
	displayName: 'Home',
	link: '/',
	icon: TiHome,
	iconColor: 'green.200'
}

export const defaultDirectoryMenuState: DirectoryMenuState = {
	isOpen: false,
	selectedMenuItem: defaultMenuItem
}

export const directoryMenuState = atom<DirectoryMenuState>({
	key: 'directoryMenuState',
	default: defaultDirectoryMenuState
});

