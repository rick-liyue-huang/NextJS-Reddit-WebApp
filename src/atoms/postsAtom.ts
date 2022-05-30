
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
	imageUrl?: string;
	createdAt: Timestamp;
	communityImageUrl?: string;
}

export interface PostVote {
	id: string;
	postId: string;
	communityId: string;
	voteValue: number;
}

interface PostState {
	selectedPost: Post | null;
	posts: Post[];
	postVotes: PostVote[];
}

const defaultPostState: PostState = {
	selectedPost: null,
	posts: [],
	postVotes: []
};

export const postState = atom<PostState>({
	key: 'postState',
	default: defaultPostState
});

