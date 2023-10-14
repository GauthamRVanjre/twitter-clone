"use client";
import SearchBar from "@/app/components/SearchBar";
import Sidebar from "@/app/components/Sidebar";
import AddTweetComment from "@/app/components/posts/AddTweetComment";
import CommentsLayout from "@/app/components/posts/CommentsLayout";
import {
  Comments,
  postDetails,
  postTypes,
  userComment,
} from "@/app/types/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsHeartFill } from "react-icons/bs";

const page = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState<any>({});

  const fetchPostDetails = async () => {
    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();
    setPostDetails(data);
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id, postDetails]);

  const handleDate = (timestamp: Date) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${day}/${month}/${year} -  ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };

  const handleLikeTweet = async () => {
    try {
      const likeTweet = await fetch(`/api/post/${postDetails.id}`, {
        method: "PUT",
        body: JSON.stringify({ id: postDetails.user?.id }),
      });

      if (likeTweet.status === 200) {
        toast.success("tweet liked successfully");
      } else if (likeTweet.status === 401) {
        toast.error("please login to like tweet");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <>
      <div className="flex w-full m-2">
        <div className="w-1/4">
          {/* Sidebar */}
          <Sidebar />
        </div>
        <div className="w-1/2">
          <div className="flex mt-6 flex-col">
            <div className="flex flex-row">
              <Image
                src={postDetails?.user?.profilePic}
                alt="user profile pic"
                width={40}
                height={40}
                className="ml-2 rounded-full"
              />
              <div className="flex flex-col ml-4">
                <h3 className="text-xl font-bold mt-2 mb-2 pl-2">
                  {postDetails.user?.name}
                </h3>
                <p className="text-gray-500">{postDetails.user?.username}</p>
              </div>
            </div>
            <div className="mt-4 ml-2">{postDetails.body}</div>
            <div className="mt-4 ml-2">{handleDate(postDetails.createdAt)}</div>
            <div className="flex flex-row mt-4 ml-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AddTweetComment
                      name={postDetails.user?.name}
                      username={postDetails.user?.username}
                      postbody={postDetails.body}
                      postId={postDetails.id}
                      profilePic={postDetails.user?.profilePic}
                      postComments={postDetails?.comments}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a comment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="ml-4">
                {postDetails?.likedIds?.includes(`${postDetails.user?.id}`) ? (
                  <div className="flex flex-row justify-between">
                    <BsHeartFill size={20} />
                    <span className="pl-1 space-y-1">
                      {postDetails?.likedIds?.length}
                    </span>
                  </div>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger onClick={handleLikeTweet}>
                        <div className="flex flex-row">
                          <HeartIcon size={20} />
                          <span className="pl-1 space-y-1">
                            {postDetails?.likedIds?.length}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like tweet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h3 className="text-xl font-bold mt-2 mb-2 pl-2">
                  Comments - {postDetails.comments?.length}
                </h3>

                <div>
                  {postDetails.comments?.length > 0 &&
                    postDetails.comments?.map((comment: Comments) => (
                      <CommentsLayout key={comment.id} comment={comment} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 hidden lg:block">
          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default page;
