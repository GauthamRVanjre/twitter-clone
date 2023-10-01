import React from "react";
import { usersTypes } from "../types/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface UsersCardProps {
  user: usersTypes;
  id: string | undefined;
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
    toast.success("You now follow this account");
  } else {
    toast.error("something went wrong! try again");
  }
};

const UsersCard: React.FC<UsersCardProps> = ({
  user,
  id,
  currentUsersFollowing,
}) => {
  return (
    <div className="border-solid w-[300px]">
      <div className="mt-4 mb-2 flex flex-row w-[300px]">
        <div className="pl-4">
          <Image
            src={user?.profilePic || ""}
            alt="user pic"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div className="pl-12">
          <p>{user?.name || ""}</p>
          <p className="pt-2">{user?.username}</p>
        </div>
        <div className="pl-20">
          {id !== user.id && !currentUsersFollowing?.includes(user.id) && (
            <button
              onClick={() => {
                handleFollowOperation(user.id, id);
              }}
              className="rounded-full bg-slate-200 text-black w-[100px] h-[30px] hover:opacity-60"
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
