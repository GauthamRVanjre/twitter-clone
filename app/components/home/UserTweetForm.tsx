import Image from "next/image";
import React from "react";
import nextIcon from "../../../public/next.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserTweetForm = () => {
  return (
    <>
      <div className="flex flex-row mt-4">
        <p>This will be an image</p>

        <form className="flex flex-col">
          <Input />
          <Button />
        </form>
      </div>
    </>
  );
};

export default UserTweetForm;
