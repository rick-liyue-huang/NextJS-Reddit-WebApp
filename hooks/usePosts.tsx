import { useRecoilState } from 'recoil';
import { postState } from '../atoms/postAtom';

export const usePosts = () => {
  const [postStateVal, setPostStateVal] = useRecoilState(postState);

  const handleVote = async () => {};

  const handleSelectPost = () => {};

  const handleRemovePost = async () => {};

  return {
    postStateVal,
    setPostStateVal,
    handleVote,
    handleSelectPost,
    handleRemovePost,
  };
};
