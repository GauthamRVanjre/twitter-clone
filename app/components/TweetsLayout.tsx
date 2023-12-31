"use client";
import React, { useState, useEffect } from "react";
import UserTweetForm from "./home/UserTweetForm";
import toast from "react-hot-toast";
import { postTypes } from "../types/types";
import TweetCard from "./TweetCard";
import { useUser } from "../UserContext";
import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const TweetsLayout = () => {
  const [posts, setPosts] = useState<postTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails } = useUser();
  const { data: session } = useSession();
  const currentUser = session?.user?.id;

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    if (response.status === 200) {
      setPosts(data);
    } else {
      toast.error("something went wrong");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  return (
    <>
      <div className="ml-4">
        <h1 className="text-2xl">Home</h1>

        <UserTweetForm />

        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin text-2xl" />
          </div>
        )}
        {posts.map((post: postTypes) => {
          return (
            <TweetCard
              key={post.id}
              username={post.user.username}
              profilePic={post.user.profilePic}
              name={post.user.name}
              post={post}
              userId={currentUser}
              userBio={userDetails?.Bio}
            />
          );
        })}
        {/* <HomeTweetLayout /> */}
      </div>
    </>
  );
};

export default TweetsLayout;
