import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {Post, postState, PostVote} from "../atoms/postsAtom";
import {auth, fireStore, storage} from "../firebase/clientApp";
import {deleteObject, ref} from "@firebase/storage";
import {collection, deleteDoc, doc, getDocs, query, where, writeBatch} from "@firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {communityState} from "../atoms/communitiesAtom";
import {authModalState} from "../atoms/authModalAtom";

export const usePosts = () => {

	const [user] = useAuthState(auth);
	const [postValue, setPostValue] = useRecoilState(postState);
	const {currentCommunity} = useRecoilValue(communityState);
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleVote = async (post: Post, vote: number, communityId: string) => {

		// check the user auth state, if not, open the auth modal
		if (!user?.uid) {
			setAuthModalState({open: true, view: 'login'});
			return
		}

		try {

			const {voteStatus} = post;
			const existingVote = postValue.postVotes.find(vote => vote.postId === post.id);

			const batch = writeBatch(fireStore);
			const updatedPost = {...post};
			const updatedPosts = [...postValue.posts];
			let updatedPostVotes = [...postValue.postVotes];
			let voteChange = vote;


			// create new vote
			if (!existingVote) {

				// here means that the post not been voted before
				const postVoteRef = doc(collection(fireStore, 'users', `${user?.uid}/postVotes`));
				const newVote: PostVote = {
					id: postVoteRef.id,
					postId: post.id!,
					communityId: communityId,
					voteValue: vote // 1 or -1
				};

				batch.set(postVoteRef, newVote);

				// add or sub 1 to post.voteStatus
				updatedPost.voteStatus = voteStatus + vote;
				updatedPostVotes = [...updatedPostVotes, newVote]

				// await batch.commit();

			} else {

				const postVoteRef = doc(fireStore, 'users', `${user?.uid}/postVotes/${existingVote.id}`);

				if (existingVote.voteValue === vote) {
					//	 removing the vote (up to neutral, or down to neutral)
					// add or sub 1 to post.voteStatus
					updatedPost.voteStatus = voteStatus - vote;
					updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id);
					//	delete the postVote document
					batch.delete(postVoteRef);

					voteChange *= -1;

				} else {
					// flipping the vote, up to down, down to up
					// add or sub 2 to post.voteStatus
					updatedPost.voteStatus = voteStatus + 2 * vote;

					const voteIndex = postValue.postVotes.findIndex(vote => vote.id === existingVote.id);

					updatedPostVotes[voteIndex] = {
						...existingVote,
						voteValue: vote
					};
					// updating the existing postVote in document
					batch.update(postVoteRef, {
						voteValue: vote
					});

					voteChange = 2 * vote;
				}
			}

			const postIndex = postValue.posts.findIndex(item => item.id === post.id);
			updatedPosts[postIndex] = updatedPost;

			//	 update the current state to global recoil
			setPostValue(prev => ({
				...prev,
				posts: updatedPosts,
				postVotes: updatedPostVotes,
			}));

			// update post document
			const postRef = doc(fireStore, 'posts', post.id!);
			batch.update(postRef, {
				voteStatus: voteStatus + voteChange
			});

			await batch.commit();


		} catch (err: any) {
			console.log(err.message);
		}
	}


	const handleSelectPost = () => {}

	// delete the post from firebase and global state
	const handleDeletePost = async (post: Post): Promise<boolean> => {

		try {
		//	delete the image if it exists
			if (post.imageUrl) {
				const imageRef = ref(storage, `posts/${post.id}/image`);
				await deleteObject(imageRef);
			}

		//	delete post document from firebase
			const postDocRef = doc(fireStore, `posts`, post.id!);
			await deleteDoc(postDocRef);

		//	update recoil state
			setPostValue(prev => ({
				...prev,
				posts: prev.posts.filter(item => item.id !== post.id)
			}))

			return true

		} catch (err) {
			return false
		}

	}

	// get all the post votes from the current community
	const getCommunityPostValue = async (communityId: string) => {
		const postVotesQuery = query(collection(fireStore, 'users', `${user?.uid}/postVotes`), where('communityId', '==', communityId));

		const postVoteDocs = await getDocs(postVotesQuery);
		// transfer to array object
		const postVotes = postVoteDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));
		setPostValue(prev => ({
			...prev,
			postVotes: postVotes as PostVote[]
		}))
	};

	useEffect(() => {
		if (!user || !currentCommunity?.id) return;
		getCommunityPostValue(currentCommunity?.id)
	}, [user, currentCommunity]);

	// deal with the log out status
	useEffect(() => {
		// clear the vote status
		if (!user) {
			setPostValue(prev => ({
				...prev,
				postVotes: []
			}))
		}
	}, [user])

	return {
		postValue,
		setPostValue,
		handleDeletePost,
		handleSelectPost,
		handleVote
	}
};

