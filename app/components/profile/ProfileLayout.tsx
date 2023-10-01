import { postTypes, usersTypes } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import EditProfileDialog from "./EditProfileDialog";
import Image from "next/image";
import TweetCard from "../TweetCard";
import toast from "react-hot-toast";

interface profileLayoutProps {
  id: string | undefined;
  userDetails?: usersTypes;
  currentUsersFollowing: string[] | undefined;
}

const handleFollowOperation = async (
  followUserId: string | undefined,
  currentUserId: string | undefined
) => {
  const response = await fetch("/api/Follow", {
    method: "PUT",
    body: JSON.stringify({
      followId: followUserId,
      currentUser: currentUserId,
      text: "follow",
    }),
  });

  if (response.status === 200) {
    toast.success("You now follow this account, redirecting you to home page");
  } else {
    toast.error(
      "something went wrong! try again, redirecting you to home page"
    );
  }
  setTimeout(() => {
    window.location.replace("/");
  }, 1000);
};

const handleUnFollowOperation = async (
  followUserId: string | undefined,
  currentUserId: string | undefined
) => {
  const response = await fetch("/api/Follow", {
    method: "PUT",
    body: JSON.stringify({
      followId: followUserId,
      currentUser: currentUserId,
      text: "unfollow",
    }),
  });

  if (response.status === 200) {
    toast.success(
      "You have unfollowed this account, redirecting you to home page"
    );
  } else {
    toast.error(
      "something went wrong! try again, redirecting you to home page"
    );
  }

  setTimeout(() => {
    window.location.replace("/");
  }, 1000);
};

const ProfileLayout: React.FC<profileLayoutProps> = ({
  id,
  userDetails,
  currentUsersFollowing,
}) => {
  // const { setUserDetails } = useUser();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col items-center">
          <Image
            src={userDetails?.profilePic || ""}
            alt="Avatar"
            className="ml-2 w-24 h-24 rounded-full"
            width={40}
            height={80}
          />
          <h3 className="text-xl font-bold mt-2 mb-2 pl-2">
            {userDetails?.name}
          </h3>
          <p className="text-gray-500">{userDetails?.username}</p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          {id !== userDetails?.id &&
            !currentUsersFollowing?.includes(userDetails?.id || "") && (
              <button
                onClick={() => handleFollowOperation(userDetails?.id, id)}
                className="btn btn-primary hover:opacity-60"
              >
                Follow
              </button>
            )}
          {currentUsersFollowing?.includes(userDetails?.id || "") && (
            <button
              onClick={() => handleUnFollowOperation(userDetails?.id, id)}
              className="btn btn-primary hover:opacity-60"
            >
              UnFollow
            </button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <EditProfileDialog userDetails={userDetails} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <hr />
      <div className="flex flex-col p-4">
        <h4 className="font-bold text-lg">Bio</h4>
        <p className="text-gray-500">{userDetails?.Bio}</p>
        <h4 className="font-bold text-lg mt-4">Location</h4>
        <p className="text-gray-500">{userDetails?.Location}</p>
        <h4 className="font-bold text-lg mt-4">Website</h4>
        <a href={userDetails?.Website} className="text-blue-500">
          {userDetails?.Website}
        </a>
        <h4 className="font-bold text-lg mt-4">Email</h4>
        <p className="text-gray-500">{userDetails?.email}</p>
      </div>

      <div className="flex flex-row p-4">
        <div className="flex flex-col pr-4">
          <h4 className="font-bold text-lg mt-4">Followers</h4>
          <p className="text-gray-500">100</p>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold text-lg mt-4">Following</h4>
          <p className="text-gray-500">200</p>
        </div>
      </div>

      <hr />

      <div className="flex flex-col p-4">
        <h4 className="font-bold text-lg mt-4">Your tweets</h4>
        <div className="mt-2">
          {userDetails?.posts.map((post: postTypes) => {
            return (
              <TweetCard
                key={post.id}
                profilePic={userDetails?.profilePic}
                name={userDetails?.name}
                username={userDetails?.username}
                userBio={userDetails.Bio}
                post={post}
                userId={id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
