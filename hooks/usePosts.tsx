import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { Post, postState } from '../atoms/postAtom';
import { db, storage } from '../firebase/clientConfig';

export const usePosts = () => {
  const [postStateVal, setPostStateVal] = useRecoilState(postState);

  const handleVote = async () => {};

  const handleSelectPost = () => {};

  const handleRemovePost = async (post: Post): Promise<boolean> => {
    try {
      //check if the post has image
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        console.log('imageRef: ' + imageRef);

        await deleteObject(imageRef);
      }
      // delete post document from db
      const postDocRef = doc(db, `posts`, post.id!);
      await deleteDoc(postDocRef);

      // update recoil post state
      setPostStateVal((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== post.id),
      }));
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    postStateVal,
    setPostStateVal,
    handleVote,
    handleSelectPost,
    handleRemovePost,
  };
};
