"use client";
import React, { useState, useEffect } from "react";
import UserTweetForm from "./home/UserTweetForm";
import toast from "react-hot-toast";
import { postTypes } from "../types/types";
import TweetCard from "./TweetCard";

const TweetsLayout = () => {
  const [posts, setPosts] = useState<postTypes[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    if (response.status === 200) {
      setPosts(data);
    } else {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="ml-4">
        <h1 className="text-2xl">Home</h1>

        <UserTweetForm />
        {/* {posts.map((post:postTypes) =>{
          return (
            <TweetCard

            />
          )
        })} */}
        {/* <HomeTweetLayout /> */}
      </div>
    </>
  );
};

export default TweetsLayout;
