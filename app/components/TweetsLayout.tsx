import React from "react";
import UserTweetForm from "./home/UserTweetForm";
import HomeTweetLayout from "./Home";

const TweetsLayout = () => {
  return (
    <>
      <div className="ml-4">
        <h1 className="text-2xl">Home</h1>

        <UserTweetForm />
        {/* <HomeTweetLayout /> */}
      </div>
    </>
  );
};

export default TweetsLayout;
