import { postTypes } from "@/app/types/types";
import React from "react";
import Image from "next/image";

interface CommentsLayoutProps {
  comment: postTypes;
}

const CommentsLayout: React.FC<CommentsLayoutProps> = ({ comment }) => {
  return (
    <>
      <div>
        <div className="flex flex-row">
          <Image
            src={comment.user.profilePic}
            alt="user profile pic"
            width={40}
            height={40}
            className="ml-2 rounded-full"
          />
          <div className="flex flex-col ml-4">
            <h3 className="text-xl font-bold mt-2 mb-2 pl-2">
              {comment.user?.name}
            </h3>
            <p className="text-gray-500">{comment.user?.username}</p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default CommentsLayout;
