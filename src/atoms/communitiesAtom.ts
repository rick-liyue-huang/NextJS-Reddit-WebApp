
import {atom} from "recoil";
import {Timestamp} from "@firebase/firestore";

export interface Community {
	id: string;
	creatorId: string;
	createdAt?: Timestamp;
	numberOfMembers: number;
	privacyType: 'public' | 'restricted' | 'private';
	imageUrl?: string;
}

interface CommunitySnippet {
	communityId: string;
	isModerator: boolean;
	imageUrl?: string;
}

export interface CommunityState {
	mySnippets: CommunitySnippet[];
	// visitedCommunities
}

const defaultCommunityState: CommunityState = {
	mySnippets: []
}

export const communityState = atom<CommunityState>({
	key: 'communitiesState',
	default: defaultCommunityState
});
