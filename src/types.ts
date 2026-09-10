export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Video {
  id: string;
  url: string;
  baseLikes: number;
  baseComments: number;
  baseShares: number;
  description: string;
  commentsList: Comment[];
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  followers: string;
  following: string;
  likes: string;
}

