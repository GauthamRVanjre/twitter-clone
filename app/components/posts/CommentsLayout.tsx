import { Comments } from "@/app/types/types";
import React from "react";
import Image from "next/image";

interface CommentsLayoutProps {
  comment: Comments;
}

const CommentsLayout: React.FC<CommentsLayoutProps> = ({ comment }) => {
  return (
    <div className="w-full flex flex-col p-3">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={comment?.user?.profilePic || ""}
            alt="user profile pic"
            className="object-cover w-full h-full"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-bold">{comment?.user?.name}</h3>
          <p className="text-gray-500">{comment?.user?.username}</p>
        </div>
      </div>
      <div className="mt-3">{comment?.body}</div>
    </div>
  );
};

export default CommentsLayout;
