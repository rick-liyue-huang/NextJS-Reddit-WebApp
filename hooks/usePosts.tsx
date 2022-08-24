import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import { communityState } from '../atoms/communityAtom';
import { Post, postState, PostVote } from '../atoms/postAtom';
import { auth, db, storage } from '../firebase/clientConfig';

export const usePosts = () => {
  const [postStateVal, setPostStateVal] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const currenCommunity = useRecoilValue(communityState).currentCommunity;
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    // check the user, if not open the authmodal
    if (!user?.uid) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    // after login
    try {
      const { voteStatus } = post;
      const existingVote = postStateVal.postVotes.find(
        (vote) => vote.postId === post.id
      );

      // deal with the document
      const batch = writeBatch(db);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateVal.posts];
      let updatedPostVotes = [...postStateVal.postVotes];
      let voteChange = vote;

      if (!existingVote) {
        // add or sub 1 to or from post.voteStatus
        // create a new postVote document
        const postVoteRef = doc(
          collection(db, 'users', `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId: communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // here the existing vote
        const postVoteRef = doc(
          db,
          'users',
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        // voted already, remove the vote to 0
        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );

          //remove the postVote document
          batch.delete(postVoteRef);

          voteChange *= -1;
        } else {
          // flip the vote to oppposite one
          // add or sub 2 to or from post.
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateVal.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          updatedPostVotes[voteIdx] = {
            ...existingVote,
            voteValue: vote,
          };
          // update the existing postVote document
          batch.update(postVoteRef, {
            voteValue: vote,
          });

          voteChange = 2 * vote;
        }
      }

      // update state with updated values
      const postIdx = postStateVal.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIdx] = updatedPost;

      setPostStateVal((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      // deal with the single post page
      if (postStateVal.selectedPost) {
        setPostStateVal((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      // update the post document
      const postRef = doc(db, 'posts', post.id!);
      batch.update(postRef, {
        voteStatus: voteStatus + voteChange,
      });

      await batch.commit();

      // complete here
    } catch (err) {
      console.log(`handleVote error: `, err);
    }
  };

  const handleSelectPost = (post: Post) => {
    setPostStateVal((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  // * use query to delete comments when post is deleted!!!!
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

      // delete comment documents on the post
      if (post.numberOfComments > 0) {
        const commentQuery = query(
          collection(db, 'comments'),
          where('postId', '==', post.id),
          orderBy('createdAt', 'desc')
        );
        const commentDocs = await getDocs(commentQuery);

        commentDocs.docs.map(async (doc) => await deleteDoc(doc.ref));

        console.log('commentDocs----', commentDocs);
      }

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

  // after refresh the page, keep the vote status
  const handleGetCommunityPostVote = async (communityId: string) => {
    const postVoteQuery = query(
      collection(db, 'users', `${user?.uid}/postVotes`),
      where('communityId', '==', communityId)
    );

    const postVoteDocs = await getDocs(postVoteQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostStateVal((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  // deal with the refresh page to get the vote status
  useEffect(() => {
    if (!user || !currenCommunity?.id) return;

    handleGetCommunityPostVote(currenCommunity.id);
  }, [user, currenCommunity]);

  // deal with the user auth after sign out
  useEffect(() => {
    if (!user) {
      // clear the post votes
      setPostStateVal((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return {
    postStateVal,
    setPostStateVal,
    handleVote,
    handleSelectPost,
    handleRemovePost,
  };
};
