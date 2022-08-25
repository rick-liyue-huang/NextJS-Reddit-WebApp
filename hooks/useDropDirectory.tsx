import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaReddit } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { communityState } from '../atoms/communityAtom';
import {
  CommunityDirectoryMenuState,
  communityDirectoryMenuState,
  SelectedMenuProps,
} from '../atoms/communityDirectoryMenuAtom';

export const useDropDirectory = () => {
  const router = useRouter();
  const communityStateVal = useRecoilValue(communityState);

  const [directoryState, setDirectoryState] =
    useRecoilState<CommunityDirectoryMenuState>(communityDirectoryMenuState);

  const handleToggleCommunityMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  const handleSelectMenuItem = (menuItem: SelectedMenuProps) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenu: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      handleToggleCommunityMenuOpen();
    }
  };

  // prevent refresh page
  useEffect(() => {
    const { currentCommunity } = communityStateVal;
    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenu: {
          displayName: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageUrl: currentCommunity.imageUrl,
          icon: FaReddit,
          iconColor: 'green.500',
        },
      }));
    }
  }, [communityStateVal.currentCommunity]);

  return {
    directoryState,
    handleToggleCommunityMenuOpen,
    handleSelectMenuItem,
  };
};
