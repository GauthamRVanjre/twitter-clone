"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import ProfileLayout from "../components/profile/ProfileLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  return <ProfileLayout />;
};

export default page;
