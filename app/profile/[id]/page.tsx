"use client";
import ProfileLayout from "@/app/components/profile/ProfileLayout";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { status } = useSession();
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
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
  }, []);

  return (
    <div>
      <ProfileLayout id={id} userDetails={userDetails} />
    </div>
  );
};

export default page;
