
import {atom} from "recoil";
import {Timestamp} from "@firebase/firestore";

export interface Post {
	id?: string;  // TODO
	communityId: string;
	creatorId: string;
	creatorDisplayName: string;
	title: string;
	body: string;
	numberOfComments: number;
	voteStatus: number;
	imgUrl?: string;
	createdAt: Timestamp;
	communityImageUrl?: string;
}

interface PostState {
	selectedPost: Post | null;
	posts: Post[];
	// postVotes
}

const defaultPostState: PostState = {
	selectedPost: null,
	posts: []
};

export const postState = atom<PostState>({
	key: 'postState',
	default: defaultPostState
});

