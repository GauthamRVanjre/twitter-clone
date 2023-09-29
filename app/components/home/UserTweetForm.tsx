"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "../Input";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useUser } from "@/app/UserContext";

const UserTweetForm = () => {
  const [tweetData, setTweetData] = useState("");
  const { data: session } = useSession();
  const currentUser = (session?.user as any)?.id;
  const { userDetails } = useUser();

  const handleTweetPost = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",

        body: JSON.stringify({ body: tweetData, id: currentUser }),
      });

      if (response.status === 200) {
        toast.success("tweet created successfully");
      } else {
        toast.error("could'nt post tweet, try again!");
      }

      setTweetData("");
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <>
      <div className="flex flex-row mt-4">
        <Image
          src={userDetails?.profilePic || ""}
          alt="user pic"
          width={20}
          height={20}
          className="w-12 h-12 rounded-full"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="ml-2 flex flex-col"
        >
          <Input
            placeholder="what's on your mind"
            value={tweetData}
            onChange={(e) => setTweetData(e.target.value)}
            type="text"
          />

          <div className="flex flex-row justify-end">
            <Button
              onClick={handleTweetPost}
              disabled={tweetData.length > 0 ? false : true}
              className="flex items-center justify-center w-16 px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
            >
              Tweet
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserTweetForm;
