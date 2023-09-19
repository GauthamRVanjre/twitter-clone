import { usersTypes } from "@/app/types/types";
import React from "react";

interface profileLayoutProps {
  id: string | string[];
  userDetails: usersTypes;
}

const ProfileLayout: React.FC<profileLayoutProps> = ({ id, userDetails }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col items-center">
          <img
            src="https://example.com/avatar.png"
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          <h3 className="text-xl font-bold mt-2 pl-4">{userDetails.name}</h3>
          <p className="text-gray-500">@johndoe</p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button className="btn btn-primary">Follow</button>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h4 className="font-bold text-lg">Bio</h4>
        <p className="text-gray-500">
          Software engineer and designer. Passionate about building innovative
          and user-friendly products.
        </p>
        <h4 className="font-bold text-lg mt-4">Location</h4>
        <p className="text-gray-500">San Francisco, CA</p>
        <h4 className="font-bold text-lg mt-4">Website</h4>
        <a href="https://example.com" className="text-blue-500">
          https://example.com
        </a>

        <h4 className="font-bold text-lg mt-4">Email</h4>
        <p className="text-gray-500">{userDetails.email}</p>
      </div>

      <div className="flex flex-row p-4">
        <div className="flex flex-col pr-4">
          <h4 className="font-bold text-lg mt-4">Followers</h4>
          <p className="text-gray-500">100</p>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold text-lg mt-4">Following</h4>
          <p className="text-gray-500">200</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
