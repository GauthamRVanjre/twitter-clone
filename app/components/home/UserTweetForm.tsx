"use client";
import Image from "next/image";
import React, { useState } from "react";
import nextIcon from "../../../public/next.svg";
import { Button } from "@/components/ui/button";
import Input from "../Input";

const UserTweetForm = () => {
  const [tweetData, setTweetData] = useState("");

  const handleTweetPost = async () => {};

  return (
    <>
      <div className="flex flex-row mt-4">
        <p>This will be an image</p>

        <form className="ml-2 flex flex-col">
          <Input
            placeholder="what's on your mind"
            value={tweetData}
            onChange={(e) => setTweetData(e.target.value)}
            type="text"
          />

          <div className="flex flex-row justify-end">
            <Button
              onClick={handleTweetPost}
              disabled={false}
              className="flex items-center justify-center w-16 px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserTweetForm;
