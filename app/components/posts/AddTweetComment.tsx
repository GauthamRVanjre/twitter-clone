"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import Image from "next/image";
import { useUser } from "@/app/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Comments } from "@/app/types/types";

interface AddTweetCommentProps {
  name: string | undefined;
  username: string | undefined;
  postbody: string;
  profilePic: string | undefined;
  postId: string;
  postComments: Comments[];
}

const AddTweetComment: React.FC<AddTweetCommentProps> = ({
  name,
  username,
  postbody,
  profilePic,
  postId,
  postComments,
}) => {
  const { userDetails } = useUser();
  const [tweetComment, setTweetComment] = useState("");
  const { data: session } = useSession();

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          body: tweetComment,
          userId: session?.user.id,
          postId: postId,
        }),
      });

      if (response.status === 200) {
        toast.success("commented tweet successfully");
      } else if (response.status === 401) {
        toast.error("Login to comment on tweet");
      } else {
        toast.error("could not reply to tweet");
      }
    } catch (error) {
      toast.error("could not reply to tweet");
    }

    setTweetComment("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex flex-row justify-between">
            <BiCommentAdd size={20} classname="ml-2" />
            <span className="pl-1 space-y-1">{postComments?.length}</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you sure absolutely sure?</DialogTitle> */}
            <DialogDescription>
              <div className="flex w-full border-l-transparent mt-4">
                <div className="w-[80px]">
                  <Image
                    src={profilePic || ""}
                    width={30}
                    height={10}
                    alt="user pic"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex flex-row">
                    <p className="pr-2 font-bold">{name}</p>
                    <p>{username} - </p>
                  </div>
                  <div className="mt-2">
                    <p>{postbody}</p>
                  </div>
                  <div className="mt-2">
                    Replying to <span className="text-blue-600">{name}</span>
                  </div>
                </div>
              </div>

              <div className="flex w-full border-l-transparent mt-4">
                <div className="w-[80px]">
                  <Image
                    src={userDetails?.profilePic || ""}
                    width={30}
                    height={10}
                    alt="user pic"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
                <div className="w-3/4 mt-2">
                  <Textarea
                    className="w-[350px]"
                    placeholder="tweet your reply"
                    value={tweetComment}
                    onChange={(e) => setTweetComment(e.target.value)}
                  />
                  <div className="flex flex-row justify-end">
                    <Button
                      disabled={tweetComment.length === 0 ? true : false}
                      className="mt-2"
                      onClick={handleCommentSubmit}
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTweetComment;
