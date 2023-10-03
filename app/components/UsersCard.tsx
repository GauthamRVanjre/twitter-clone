import React from "react";
import { usersTypes } from "../types/types";
import Image from "next/image";

interface UsersCardProps {
  user: usersTypes;
  id: string | undefined;
  currentUsersFollowing: string[] | undefined;
}

const UsersCard: React.FC<UsersCardProps> = ({ user, id }) => {
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
      </div>
    </div>
  );
};

export default UsersCard;
