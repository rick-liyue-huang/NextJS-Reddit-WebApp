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

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  // postVote?:
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});