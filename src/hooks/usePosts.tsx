import React from 'react';
import {useRecoilState} from "recoil";
import {Post, postState} from "../atoms/postsAtom";
import {fireStore, storage} from "../firebase/clientApp";
import {deleteObject, ref} from "@firebase/storage";
import {deleteDoc, doc} from "@firebase/firestore";

export const usePosts = () => {

	const [postValue, setPostValue] = useRecoilState(postState);

	const handleVote = async () => {

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

	return {
		postValue,
		setPostValue,
		handleDeletePost,
		handleSelectPost,
		handleVote
	}
};

