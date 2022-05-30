
import {atom} from "recoil";
import {Timestamp} from "@firebase/firestore";

export interface Community {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	privacyType: 'public' | 'restricted' | 'private';
	createdAt: Timestamp;
	imageUrl?: string;
}

// in order to let the whole project know the community under login user, we set in recoil
export interface CommunitySnippet {
	communityId: string;
	isModerator?: boolean;
	imageUrl?: string;
}

interface CommunityState {
	mySnippets: CommunitySnippet[];
	// the cached data that do not need fresh

	// visitedCommunity
	currentCommunity?: Community;
}

const defaultCommunityState = {
	mySnippets: []
}


// this global atom will show in the navbar dropdown menu and the header of community ContentPage
export const communityState = atom<CommunityState>({
	key: 'communityState',
	default: defaultCommunityState
});


