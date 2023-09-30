import React from "react";
import Image from "next/image";
import { HeartIcon, LinkedinIcon } from "lucide-react";
import { BsHeartFill } from "react-icons/bs";
import { BiCommentAdd } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { postTypes } from "../types/types";
import toast from "react-hot-toast";
import AddTweetComment from "./posts/AddTweetComment";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface TweetCardProps {
  profilePic?: string;
  name?: string;
  username?: string;
  post: postTypes;
  userId: string | undefined;
  userBio: string | undefined;
}

const TweetCard: React.FC<TweetCardProps> = ({
  profilePic,
  name,
  username,
  post,
  userId,
  userBio,
}) => {
  function formatDateToDDMonthYY(isoDateString: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Parse ISO date string into a Date object
    const date = new Date(isoDateString);

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.getMonth(); // Returns 0-based index
    const year = date.getFullYear();

    // Format the date components
    const formattedDate = `${day} ${months[month]} ${year % 100}`;

    return formattedDate;
  }

  const handleLikeTweet = async () => {
    try {
      const likeTweet = await fetch(`/api/post/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({ id: userId }),
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
      <div className="flex w-full border-l-transparent mt-4">
        <div className="w-[80px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={profilePic || ""}
                  width={30}
                  height={10}
                  alt="user pic"
                  className="w-14 h-14 rounded-full"
                />
              </TooltipTrigger>
              <TooltipContent className="w-[200px] h-[175px]">
                <ScrollArea className="h-[150px]">
                  <div className="flex flex-row justify-between ">
                    <Image
                      src={profilePic || ""}
                      width={20}
                      height={20}
                      alt="user pic"
                      className="w-16 h-16 rounded-full"
                    />
                    <button className="rounded-full bg-black text-slate-200 w-[80px] h-[30px] mt-4">
                      Follow
                    </button>
                  </div>
                  <div className="flex flex-col mt-2">
                    <Link href={`/profile/${post.userId}`}>
                      <p className="pr-2 font-bold text-xl hover:underline">
                        {name}
                      </p>
                    </Link>
                    <p className=" opacity-70">{username} - </p>
                    <p>{userBio}</p>
                  </div>
                </ScrollArea>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-3/4">
          <div className="flex flex-row">
            <p className="pr-2 font-bold">{name}</p>
            <p className=" opacity-70">{username} - </p>
            <p className="pl-2 opacity-70">
              {formatDateToDDMonthYY(post.createdAt)}
            </p>
          </div>
          <div className="mt-2">
            <p>{post.body}</p>
          </div>
          <div className="flex flex-row justify-between w-24 mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AddTweetComment
                    name={name}
                    username={username}
                    postbody={post.body}
                    postId={post.id}
                    profilePic={profilePic}
                    postComments={post?.comments}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a comment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {post?.likedIds?.includes(`${userId}`) ? (
              <div className="flex flex-row justify-between">
                <BsHeartFill size={20} />
                <span className="pl-1 space-y-1">{post?.likedIds?.length}</span>
              </div>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={handleLikeTweet}>
                    <div className="flex flex-row">
                      <HeartIcon size={20} />
                      <span className="pl-1 space-y-1">
                        {post?.likedIds?.length}
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
      </div>
    </>
  );
};

export default TweetCard;
