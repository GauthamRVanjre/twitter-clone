"use client";
import ProfileLayout from "@/app/components/profile/ProfileLayout";
import { usersTypes } from "@/app/types/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<usersTypes>({
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
  });

  const getUserDetails = async () => {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    setUserDetails(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserDetails();
    } else {
      window.location.replace("/");
    }
  }, [userDetails]);

  return (
    <div>
      <ProfileLayout id={session?.user.id} userDetails={userDetails} />
    </div>
  );
};

export default page;
