import React from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  return (
    <div>
      <div
        className="mt-6 lg:hidden
            rounded-full
            h-14 w-14
            p-4 
            flex items-center justify-center
            bg-blue-500 hover:bg-opcity-60
            transition
            cursor-pointer
        "
      >
        <FaFeather size={24} />
      </div>
      <div
        className="
        mt-6 hidden lg:block
        px-4 py-2
        rounded-full
        bg-sky-600
        hover:bg-opacity-60
        cursor-pointer
        transition
      "
      >
        <p
          className="hidden
        lg:block
        text-center
        font-semibold
       
        text-[20px]
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
