export type usersTypes = {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  profilePic: string;
  username: string;
  Bio: string;
  Location: string;
  Website: string;
  posts: postTypes[];
  followingIds: string[];
};

export type userProfileTypes = {
  imageUrl: string;
  username: string;
  bio: string;
  location: string;
  website: string;
};

export type userInPostsData = {
  name: string;
  username: string;
  profilePic: string;
};

export type postTypes = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: userInPostsData;
  likedIds: string[];
  comments: Comments[];
};

export type Comments = {
  id: string;
  body: string;
  user: userComment;
};

export type userComment = {
  id: string;
  name: string;
  username: string;
  profilePic: string;
};
