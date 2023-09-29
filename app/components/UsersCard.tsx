import React from "react";
import { usersTypes } from "../types/types";
import Image from "next/image";

interface UsersCardProps {
  user: usersTypes;
}

const UsersCard: React.FC<UsersCardProps> = ({ user }) => {
  return (
    <div className="border-solid w-[300px]">
      <div className="mt-4 mb-2 flex flex-row justify-between w-[300px]">
        <div>
          <Image
            src={user?.profilePic || ""}
            alt="user pic"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div>
          <p>{user?.name || ""}</p>
          <p className="pt-2">{user?.username}</p>
        </div>
        <div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
