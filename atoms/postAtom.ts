import { Timestamp } from '@google-cloud/firestore';
import { atom } from 'recoil';

export interface Post {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageUrl?: string;
  communityImageUrl?: string;
  createdAt: Timestamp;
}

export interface PostVote {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});
