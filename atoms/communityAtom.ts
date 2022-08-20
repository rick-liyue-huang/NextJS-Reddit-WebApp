import { Timestamp } from 'firebase/firestore';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'private' | 'restricted';
  createdAt: Timestamp;
  imageUrl: string;
}
