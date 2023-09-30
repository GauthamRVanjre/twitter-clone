"use client";
import { useUser } from "@/app/UserContext";
import ProfileLayout from "@/app/components/profile/ProfileLayout";
import { usersTypes } from "@/app/types/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const page = () => {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails } = useUser();
  const [profileUserDetails, setProfileUserDetails] = useState<usersTypes>({
    id: "",
    name: "",
    email: "",
    password: "",
    profilePic: "",
    username: "",
    Bio: "",
    Location: "",
    Website: "",
    posts: [],
    followingIds: [],
  });

  const getUserDetails = async () => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    setProfileUserDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserDetails();
    } else {
      window.location.replace("/");
    }
  }, [userDetails]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      ) : (
        <div>
          <ProfileLayout
            currentUsersFollowing={userDetails?.followingIds}
            id={session?.user.id}
            userDetails={profileUserDetails}
          />
        </div>
      )}
    </>
  );
};

export default page;
