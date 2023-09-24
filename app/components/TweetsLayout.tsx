import React from "react";
import UserTweetForm from "./home/UserTweetForm";

const TweetsLayout = () => {
  return (
    <>
      <div className="ml-4">
        <h1 className="text-2xl">Home</h1>

        <UserTweetForm />
      </div>
    </>
  );
};

export default TweetsLayout;
