import { IconType } from 'react-icons';
import { TiHome } from 'react-icons/ti';
import { atom } from 'recoil';

export interface SelectedMenuProps {
  icon: IconType;
  displayName: string;
  link: string;
  iconColor: string;
  imageUrl?: string;
}

export interface CommunityDirectoryMenuState {
  isOpen: boolean;
  selectedMenu: SelectedMenuProps;
}

export const defaultSelectedMenu: SelectedMenuProps = {
  displayName: 'Home',
  link: '/',
  icon: TiHome,
  iconColor: 'green.500',
};

export const defaultCommunityDirectoryMenuState = {
  isOpen: false,
  selectedMenu: defaultSelectedMenu,
};

export const communityDirectoryMenuState = atom({
  key: 'communityDirectoryMenu',
  default: defaultCommunityDirectoryMenuState,
});
